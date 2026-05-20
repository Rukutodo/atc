import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { currentPassword, newPassword } = await req.json();
    const adminEmail = session.user;

    // 1. Fetch current admin from DB
    const { data: admin, error: fetchError } = await supabaseAdmin
      .from('admins')
      .select('*')
      .eq('email', adminEmail)
      .single();

    // If admin doesn't exist in DB yet (fallback user), they must be created first or we handle specific fallback logic
    // For this prototype, we'll allow the fallback user to set their first DB record if they don't exist
    
    if (admin) {
      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      if (!isMatch) {
        return NextResponse.json({ error: 'Current password incorrect' }, { status: 400 });
      }
    } else if (adminEmail === 'venucolab@gmail.com') {
        // Fallback user logic: check against hardcoded pass if not in DB
        if (currentPassword !== 'Varun@123456qwerty') {
            return NextResponse.json({ error: 'Current password incorrect' }, { status: 400 });
        }
    } else {
        return NextResponse.json({ error: 'Admin record not found' }, { status: 404 });
    }

    // 2. Hash and Update
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    const { error: updateError } = await supabaseAdmin
      .from('admins')
      .upsert({ 
        email: adminEmail, 
        password: hashedNewPassword,
        name: admin?.name || 'Primary Administrator'
      }, { onConflict: 'email' });

    if (updateError) throw updateError;

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error: any) {
    console.error('Password Update Error:', error);
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
