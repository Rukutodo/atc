import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  if (process.env.NODE_ENV === 'production') {
    console.warn('Supabase credentials missing in production. Database operations will fail.');
  }
}

// Use service role key for backend operations to bypass RLS for admin tasks
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
