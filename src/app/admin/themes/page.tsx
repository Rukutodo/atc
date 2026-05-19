import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ThemeSelector from './ThemeSelector';

const ThemesPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      <AdminSidebar />

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
