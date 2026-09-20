import fs from 'fs';
import path from 'path';

const SUBMISSIONS_FILE = path.join(process.cwd(), 'community-wall-submissions.json');

export interface CommunityWallSubmission {
  id: string;
  timestamp: string;
  message: string;
  isAnonymous: boolean;
}

export function getCommunityWallSubmissions(): CommunityWallSubmission[] {
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    return [];
  }

  try {
    const fileContent = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    const submissions = JSON.parse(fileContent) as Array<Partial<CommunityWallSubmission>>;

    return submissions
      .filter((submission): submission is CommunityWallSubmission => (
        typeof submission.id === 'string' &&
        typeof submission.timestamp === 'string' &&
        typeof submission.message === 'string' &&
        typeof submission.isAnonymous === 'boolean'
      ))
      .reverse();
  } catch {
    return [];
  }
}