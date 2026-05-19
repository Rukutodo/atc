import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

const FALLBACK_ADMIN_EMAIL = 'venucolab@gmail.com';
const FALLBACK_ADMIN_PASS = 'Varun@123456qwerty';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Check database for existing admin
    const { data: admin, error } = await supabaseAdmin
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (admin) {
      const isPasswordCorrect = await bcrypt.compare(password, admin.password);
      if (isPasswordCorrect) {
        return createSession(email);
      }
    }

    // 2. Fallback for the first admin (if not in DB yet)
    if (email === FALLBACK_ADMIN_EMAIL && password === FALLBACK_ADMIN_PASS) {
      return createSession(email);
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function createSession(email: string) {
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  const session = await encrypt({ user: email, expires });

  (await cookies()).set('session', session, { 
    expires, 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return NextResponse.json({ message: 'Logged in successfully' }, { status: 200 });
}
