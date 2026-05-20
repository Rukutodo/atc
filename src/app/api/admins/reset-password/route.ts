import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { adminId, newPassword } = await req.json();

    // 1. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 2. Update DB
    const { error } = await supabaseAdmin
      .from('admins')
      .update({ password: hashedPassword })
      .eq('id', adminId);

    if (error) throw error;

    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}
