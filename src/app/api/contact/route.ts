import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { name, email, phone, grade, message, guardianQualification } = await req.json();

    // 1. Save to Database
    const { error: dbError } = await supabaseAdmin
      .from('leads')
      .insert([
        { 
          name, 
          email: email || null, 
          phone, 
          grade, 
          message, 
          guardian_qualification: guardianQualification,
          status: 'New' 
        }
      ]);

    if (dbError) {
      console.error('Supabase Error:', dbError);
    }

    // 2. Validate environment variables for Email
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
        Guardian Qualification: ${guardianQualification}
        Email: ${email || 'N/A'}
        Phone: ${phone}
        Grade/Service: ${grade}
        Message: ${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0d9488;">New Enrollment Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Guardian Qualification:</strong> ${guardianQualification}</p>
          <p><strong>Email:</strong> ${email || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Grade/Service:</strong> ${grade}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #0d9488;">
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      `,
    };

    // Send the email to Admin
    await transporter.sendMail(mailOptions);

    // 3. Send "Thank You" email to Student (if email provided)
    if (email) {
      const studentMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Thank you for contacting Acharya Tutorials!`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #334155; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <img src="https://acharyatutorials.vercel.app/icon.svg" alt="Acharya Tutorials Icon" style="width: 48px; height: 48px;" />
              <h1 style="color: #0d9488; margin-top: 12px; font-size: 24px;">Acharya Tutorials</h1>
            </div>
            <h2 style="color: #0d9488;">Hello ${name},</h2>
            <p>Thank you for reaching out to <strong>Acharya Tutorials</strong>. We have received your inquiry for <strong>${grade.toUpperCase()}</strong>.</p>
            <p>Our team will review your requirements and get back to you on your mobile number (<strong>${phone}</strong>) within the next 24 hours.</p>
            <p>At Acharya Tutorials, we are committed to providing the best quality education at a reasonable price. We look forward to helping you achieve your academic goals!</p>
            <br />
            <hr style="border: none; border-top: 1px solid #f1f5f9;" />
            <p style="font-size: 14px; color: #64748b;">Best Regards,</p>
            <p style="font-size: 14px; color: #64748b;"><strong>The Acharya Tutorials Team</strong><br />Visakhapatnam, Andhra Pradesh</p>
          </div>
        `,
      };
      await transporter.sendMail(studentMailOptions);
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Full Error Object:', error);
    return NextResponse.json({ 
      error: 'Failed to send email', 
      details: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}
