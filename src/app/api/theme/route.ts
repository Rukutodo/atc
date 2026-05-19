import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('value')
      .eq('key', 'active_theme')
      .single();

    if (error) throw error;
    return NextResponse.json({ theme: data.value });
  } catch (error) {
    return NextResponse.json({ theme: 'light' });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { theme } = await req.json();

    const { error } = await supabaseAdmin
      .from('site_settings')
      .upsert({ key: 'active_theme', value: theme }, { onConflict: 'key' });

    if (error) throw error;
    return NextResponse.json({ message: 'Theme updated globally' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update global theme' }, { status: 500 });
  }
}
