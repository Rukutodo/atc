import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await req.json();
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from('leads')
      .update({ status })
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'Status updated successfully' });
  } catch (error: any) {
    console.error('Update Status Error:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
