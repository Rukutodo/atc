import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import AdminSidebar from '@/components/admin/AdminSidebar';
import StudentTable from './StudentTable';
import { Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

const StudentsPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/admin');
  }

  // Fetch real students from Supabase
  const { data: students, error } = await supabaseAdmin
    .from('students')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching students:', error);
  }

  const studentList = students || [];

  return (
    <div className="min-h-screen bg-[var(--background)] block lg:flex transition-colors duration-300">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden pt-0">
        <header className="bg-[var(--card-bg)] border-b border-[var(--border)] sticky top-0 z-10 px-4 sm:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] ml-14 lg:ml-0">Student Management</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground)]/40" />
              <input 
                placeholder="Search students..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--input-text)] outline-none focus:ring-2 focus:ring-teal-500 text-sm w-64"
              />
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8">
           <StudentTable initialStudents={studentList} />
        </div>
      </main>
    </div>
  );
};

export default StudentsPage;
