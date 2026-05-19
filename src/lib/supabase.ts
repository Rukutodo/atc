import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Use service role key for backend operations to bypass RLS for admin tasks
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
