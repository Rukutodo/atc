import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ThemeSelector from './ThemeSelector';
import ChangePasswordForm from './ChangePasswordForm';

export const dynamic = 'force-dynamic';

const SettingsPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-[var(--background)] block lg:flex transition-colors duration-300">
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden pt-0">
        <header className="bg-[var(--card-bg)] border-b border-[var(--border)] sticky top-0 z-10 px-4 sm:px-8 py-4 flex items-center justify-between transition-colors duration-300">
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] ml-14 lg:ml-0">General Settings</h1>
        </header>

        <div className="p-4 sm:p-8 space-y-8 sm:space-y-12">
          {/* Theme Section */}
          <section>
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)] mb-2">Website Appearance</h2>
              <p className="text-sm text-[var(--foreground)]/50">Select the primary theme for the entire organization website.</p>
            </div>
            <ThemeSelector />
          </section>

          {/* Security Section */}
          <section className="pt-8 sm:pt-12 border-t border-[var(--border)]">
             <ChangePasswordForm />
          </section>
        </div>
      </main>

      <AdminSidebar />
    </div>
  );
};

export default SettingsPage;
