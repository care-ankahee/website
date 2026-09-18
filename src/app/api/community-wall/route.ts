import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const SUBMISSIONS_FILE = path.join(process.cwd(), 'community-wall-submissions.json');

interface CommunityWallRequest {
  message?: string;
  name?: string;
  email?: string;
  isAnonymous?: boolean;
}

interface CommunityWallSubmission {
  id: string;
  timestamp: string;
  message: string;
  name: string;
  email: string;
  isAnonymous: boolean;
  status: 'pending';
}

function isSubmissionPayload(value: unknown): value is CommunityWallRequest {
  return typeof value === 'object' && value !== null;
}

async function forwardToSanity(submission: CommunityWallSubmission) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const token = process.env.SANITY_WRITE_TOKEN;

  if (!projectId || !token) {
    return;
  }

  const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2026-08-17',
    useCdn: false,
  });

  await client.create({
    _type: 'communityWallSubmission',
    submittedAt: submission.timestamp,
    message: submission.message,
    isAnonymous: submission.isAnonymous,
    name: submission.isAnonymous ? undefined : submission.name,
    email: submission.isAnonymous ? undefined : submission.email,
    status: submission.status,
  });
}

async function forwardToGoogleSheet(submission: CommunityWallSubmission) {
  const sheetWebhookUrl = process.env.GOOGLE_SHEETS_COMMUNITY_WALL_URL;

  if (!sheetWebhookUrl) {
    return;
  }

  await fetch(sheetWebhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  });
}

export async function POST(request: Request) {
  try {
    const payload: unknown = await request.json();

    if (!isSubmissionPayload(payload)) {
      return NextResponse.json({ success: false, error: 'Invalid submission' }, { status: 400 });
    }

    const message = payload.message?.trim();
    const isAnonymous = payload.isAnonymous !== false;
    const name = isAnonymous ? '' : payload.name?.trim() || '';
    const email = isAnonymous ? '' : payload.email?.trim() || '';

    if (!message || message.length < 5) {
      return NextResponse.json({ success: false, error: 'Please write a little more before submitting.' }, { status: 400 });
    }

    if (!isAnonymous && (!name || !email)) {
      return NextResponse.json({ success: false, error: 'Please add your name and email, or submit anonymously.' }, { status: 400 });
    }

    const submission: CommunityWallSubmission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      message,
      name,
      email,
      isAnonymous,
      status: 'pending',
    };

    let submissions: CommunityWallSubmission[] = [];
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const fileContent = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
      submissions = JSON.parse(fileContent) as CommunityWallSubmission[];
    }

    submissions.push(submission);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');

    const forwardingResults = await Promise.allSettled([
      forwardToSanity(submission),
      forwardToGoogleSheet(submission),
    ]);

    forwardingResults.forEach((result) => {
      if (result.status === 'rejected') {
        console.error('Community Wall forwarding failed:', result.reason);
      }
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to save submission';
    console.error('Community Wall submission error:', error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
