import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

const ADMIN_EMAIL = 'venucolab@gmail.com';
const ADMIN_PASSWORD = 'Varun@123456qwerty';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create the session
      const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
      const session = await encrypt({ user: email, expires });

      // Save the session in a cookie
      (await cookies()).set('session', session, { 
        expires, 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });

      return NextResponse.json({ message: 'Logged in successfully' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
