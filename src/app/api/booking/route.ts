import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Local file path to log leads
const LEADS_FILE = path.join(process.cwd(), 'leads.json');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate inputs
    const { name, email, phone, contactMethod, enquiryType, message, therapist, consent } = data;
    if (!name || !email || !consent) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Lead object
    const newLead = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name,
      email,
      phone: phone || '',
      contactMethod: contactMethod || 'Email',
      enquiryType: enquiryType || 'Individual Therapy',
      message: message || '',
      therapist: therapist || 'Any',
    };

    // 1. Log to local file leads.json
    let leadsList = [];
    if (fs.existsSync(LEADS_FILE)) {
      try {
        const fileContent = fs.readFileSync(LEADS_FILE, 'utf-8');
        leadsList = JSON.parse(fileContent);
      } catch (e) {
        console.error('Error reading leads file, starting fresh:', e);
      }
    }
    
    leadsList.push(newLead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leadsList, null, 2), 'utf-8');

    // 2. Google Sheets Integration Placeholder:
    // In production, the user can configure a Google Apps Script Web App URL and uncomment the lines below:
    /*
    const GOOGLE_SHEETS_SCRIPT_URL = process.env.GOOGLE_SHEETS_SCRIPT_URL;
    if (GOOGLE_SHEETS_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead)
        });
      } catch (error) {
        console.error('Google Sheets forwarding error:', error);
      }
    }
    */

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error: any) {
    console.error('Booking submission error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
