import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

interface ContactBody {
  company: string;
  name: string;
  email: string;
  contact: string;
  message: string;
  country: string;
  lang: 'EN' | 'KR';
}

function buildHtml(body: ContactBody): string {
  const isKR = body.lang === 'KR';
  const row = (label: string, value: string) =>
    `<tr><td style="padding:10px 12px;font-weight:600;background:#f8fafc;border:1px solid #e2e8f0;width:160px">${label}</td><td style="padding:10px 12px;border:1px solid #e2e8f0">${value || '-'}</td></tr>`;

  if (isKR) {
    return `
      <h2 style="font-family:sans-serif;color:#1e293b">문의 접수 확인</h2>
      <p style="font-family:sans-serif;color:#64748b">안녕하세요 ${body.name}님, 문의해 주셔서 감사합니다. 담당자가 검토 후 빠르게 연락드리겠습니다.</p>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;margin-top:16px">
        ${row('기업 또는 단체명', body.company)}
        ${row('담당자명', body.name)}
        ${row('이메일', body.email)}
        ${row('연락처', body.contact)}
        ${row('문의내용', body.message)}
        ${row('국가', body.country)}
      </table>
      <p style="font-family:sans-serif;color:#64748b;margin-top:24px">Factorix 드림</p>
    `;
  }

  return `
    <h2 style="font-family:sans-serif;color:#1e293b">Inquiry Received</h2>
    <p style="font-family:sans-serif;color:#64748b">Dear ${body.name}, thank you for contacting Factorix. Our team will review your inquiry and get back to you shortly.</p>
    <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;margin-top:16px">
      ${row('Company / Organization', body.company)}
      ${row('Contact Person', body.name)}
      ${row('Email', body.email)}
      ${row('Contact', body.contact)}
      ${row('Inquiry', body.message)}
      ${row('Country', body.country)}
    </table>
    <p style="font-family:sans-serif;color:#64748b;margin-top:24px">Best regards,<br/>Factorix Team</p>
  `;
}

export async function POST(req: NextRequest) {
  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  const { company, name, email, contact, message, country, lang } = body;

  if (!company || !name || !email || !message) {
    return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
  }

  let emailStatus = '실패';

  // 1. Send email (To: customer, CC: internal)
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = lang === 'KR'
      ? '[Factorix] 문의가 접수되었습니다'
      : '[Factorix] Your inquiry has been received';

    await transporter.sendMail({
      from: `Factorix <${process.env.SMTP_USER}>`,
      to: email,
      cc: process.env.CONTACT_RECIPIENT_EMAIL,
      subject,
      html: buildHtml(body),
    });

    emailStatus = '발송성공';
  } catch (err) {
    console.error('[Contact] Email error:', err);
  }

  // 2. Append to Google Sheets (includes email send result)
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Sheet1!A:H',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          new Date().toISOString(),
          company,
          name,
          email,
          contact || '',
          message,
          country || '',
          emailStatus,
        ]],
      },
    });
  } catch (err) {
    console.error('[Contact] Google Sheets error:', err);
  }

  return NextResponse.json({ success: true });
}
