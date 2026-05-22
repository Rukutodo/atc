import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTable from './AdminTable';

export const dynamic = 'force-dynamic';

const StaffPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/admin');
  }

  // Fetch all admins
  const { data: admins, error } = await supabaseAdmin
    .from('admins')
    .select('id, created_at, name, email, role')
    .order('name', { ascending: true });

  return (
    <div className="min-h-screen bg-[var(--background)] block lg:flex transition-colors duration-300">
      <main className="flex-1 overflow-x-hidden pt-0">
        <header className="bg-[var(--card-bg)] border-b border-[var(--border)] sticky top-0 z-10 px-4 sm:px-8 py-4 flex items-center justify-between transition-colors duration-300">
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] ml-14 lg:ml-0">Staff Management</h1>
        </header>

        <div className="p-4 sm:p-8">
          <AdminTable initialAdmins={admins || []} />
        </div>
      </main>

      <AdminSidebar />
    </div>
  );
};

export default StaffPage;
