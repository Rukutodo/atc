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
    <div className="min-h-screen bg-[var(--background)] block lg:flex transition-colors duration-300">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden pt-0">
        <header className="bg-[var(--card-bg)] border-b border-[var(--border)] sticky top-0 z-10 px-4 sm:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] ml-14 lg:ml-0">Daily Attendance</h1>
          <div className="text-[10px] sm:text-sm font-medium text-[var(--foreground)]/50 text-right">
            {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </header>

        <div className="p-4 sm:p-8">
           <AttendanceTracker students={students || []} />
        </div>
      </main>
    </div>
  );
};

export default AttendancePage;
