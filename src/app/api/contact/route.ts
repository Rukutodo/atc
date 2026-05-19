import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, grade, message } = await req.json();

    // NOTE: In a real production environment, you should use environment variables
    // for SMTP credentials (e.g., Gmail App Password, SendGrid Key, etc.)
    // For this demonstration, we'll configure the transporter logic.
    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing EMAIL_USER or EMAIL_PASS environment variables');
      return NextResponse.json({ 
        error: 'Server configuration error', 
        details: 'Email credentials are not configured in Vercel settings.' 
      }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'tanumanu73@gmail.com',
      subject: `New Lead: ${name} - Acharya Tutorials`,
      text: `
        New Application Details:
        -------------------------
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Grade/Service: ${grade}
        Message: ${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0d9488;">New Enrollment Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Grade/Service:</strong> ${grade}</p>
          <div style="margin-top: 20px; padding: 15px; bg-color: #f8fafc; border-left: 4px solid #0d9488;">
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Full Error Object:', error);
    return NextResponse.json({ 
      error: 'Failed to send email', 
      details: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}
