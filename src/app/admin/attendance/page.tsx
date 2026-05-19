import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AttendanceTracker from './AttendanceTracker';

export const dynamic = 'force-dynamic';

const AttendancePage = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/admin');
  }

  // Fetch students and their attendance
  const { data: students, error } = await supabaseAdmin
    .from('students')
    .select('*, attendance(date, is_present)')
    .eq('status', 'Active')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-[var(--card-bg)] border-b border-[var(--border)] sticky top-0 z-10 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Daily Attendance</h1>
          <div className="text-sm font-medium text-[var(--foreground)]/50">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>

        <div className="p-8">
           <AttendanceTracker students={students || []} />
        </div>
      </main>
    </div>
  );
};

export default AttendancePage;
