import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { student_id, date, is_present } = await req.json();

    const { error } = await supabaseAdmin
      .from('attendance')
      .upsert({ student_id, date, is_present }, { onConflict: 'student_id, date' });

    if (error) throw error;
    return NextResponse.json({ message: 'Attendance updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update attendance' }, { status: 500 });
  }
}
