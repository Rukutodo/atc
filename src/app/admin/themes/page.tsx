import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import ThemeToggle from '../dashboard/ThemeToggle';
import Link from 'next/link';
import ThemeSelector from './ThemeSelector';
import { 
  Users, 
  BookOpen, 
  LogOut, 
  LayoutDashboard, 
  Clock,
  CalendarCheck,
  Palette
} from 'lucide-react';

const ThemesPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-teal-600" />
            <span className="font-bold text-xl dark:text-white">Acharya Admin</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link href="/admin/dashboard" className="flex items-center space-x-3 w-full p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-medium transition-all text-left">
            <LayoutDashboard className="h-5 w-5" />
            <span>Leads Dashboard</span>
          </Link>
          <Link href="/admin/students" className="flex items-center space-x-3 w-full p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-medium transition-all text-left">
            <Users className="h-5 w-5" />
            <span>Students</span>
          </Link>
          <Link href="/admin/attendance" className="flex items-center space-x-3 w-full p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-medium transition-all text-left">
            <CalendarCheck className="h-5 w-5" />
            <span>Attendance</span>
          </Link>
          <Link href="/admin/themes" className="flex items-center space-x-3 w-full p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-xl font-bold transition-all text-left">
            <Palette className="h-5 w-5" />
            <span>Themes</span>
          </Link>
          <button className="flex items-center space-x-3 w-full p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-medium transition-all text-left">
            <Clock className="h-5 w-5" />
            <span>History</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700 space-y-4">
          <ThemeToggle />
          <form action={async () => {
            'use server';
            (await cookies()).delete('session');
            redirect('/admin');
          }}>
            <button 
              type="submit"
              className="flex items-center space-x-3 w-full p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-medium transition-all text-left"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Website Themes</h1>
        </header>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Global Appearance</h2>
            <p className="text-slate-500 dark:text-slate-400">Select the primary theme for the entire organization website.</p>
          </div>

          <ThemeSelector />
        </div>
      </main>
    </div>
  );
};

export default ThemesPage;
