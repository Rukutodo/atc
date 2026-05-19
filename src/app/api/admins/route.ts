import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabaseAdmin
      .from('admins')
      .select('id, created_at, name, email, role')
      .order('name', { ascending: true });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { name, email, password } = await req.json();

    // 1. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Save to Database
    const { data, error } = await supabaseAdmin
      .from('admins')
      .insert([{ name, email, password: hashedPassword }])
      .select();

    if (error) throw error;

    // 3. Send credentials to the new admin
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Admin Credentials for Acharya Tutorials`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #334155; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="https://acharyatutorials.vercel.app/icon.svg" alt="Acharya Tutorials Icon" style="width: 48px; height: 48px;" />
            <h1 style="color: #0d9488; margin-top: 12px; font-size: 24px;">Acharya Tutorials Admin</h1>
          </div>
          <h2 style="color: #0d9488;">Hello ${name},</h2>
          <p>An administrator has created your access to the **Acharya Tutorials Admin Portal**.</p>
          <p>You can now log in using the following credentials:</p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Login URL:</strong> <a href="https://acharyatutorials.vercel.app/admin">Click here to log in</a></p>
            <p><strong>Username:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>
          <p style="color: #ef4444; font-size: 14px;"><strong>Important:</strong> Please change your password after your first login for security reasons.</p>
          <br />
          <p style="font-size: 14px; color: #64748b;">Best Regards,</p>
          <p style="font-size: 14px; color: #64748b;"><strong>Acharya Tutorials Management</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Add Admin Error:', error);
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
  }
}
