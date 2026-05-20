import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ThemeSelector from './ThemeSelector';
import ChangePasswordForm from './ChangePasswordForm';

const ThemesPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-[var(--card-bg)] border-b border-[var(--border)] sticky top-0 z-10 px-8 py-4 flex items-center justify-between transition-colors duration-300">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Website Settings</h1>
        </header>

        <div className="p-8 space-y-12">
          {/* Theme Section */}
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Global Appearance</h2>
              <p className="text-[var(--foreground)]/50">Select the primary theme for the entire organization website.</p>
            </div>
            <ThemeSelector />
          </div>

          {/* Security Section */}
          <div className="pt-12 border-t border-[var(--border)]">
             <ChangePasswordForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThemesPage;
