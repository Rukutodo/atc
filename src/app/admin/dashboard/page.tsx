import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import StatusDropdown from './StatusDropdown';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Search,
  Filter,
  Mail,
  Phone,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const AdminDashboard = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/admin');
  }

  // Fetch real leads from Supabase
  const { data: leads, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching leads:', error);
  }

  const leadsList = leads || [];
  const newLeadsCount = leadsList.filter(l => l.status === 'New').length;
  const totalLeads = leadsList.length;

  return (
    <div className="min-h-screen bg-[var(--background)] block lg:flex transition-colors duration-300">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden pt-0">
        <header className="bg-[var(--card-bg)] border-b border-[var(--border)] sticky top-0 z-10 px-4 sm:px-8 py-4 flex items-center justify-between transition-colors duration-300">
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] ml-14 lg:ml-0">Recent Inquiries</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground)]/40" />
              <input 
                placeholder="Search leads..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--input-text)] outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm w-64"
              />
            </div>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] font-bold text-sm sm:text-base">
              VC
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
            <div className="bg-[var(--card-bg)] p-4 sm:p-6 rounded-2xl shadow-sm border border-[var(--border)] transition-colors duration-300">
              <p className="text-[var(--foreground)]/50 text-xs sm:text-sm font-medium mb-1">Total Leads</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">{totalLeads}</h3>
              <p className="text-[var(--primary)] text-[10px] sm:text-xs mt-2 font-bold uppercase">All time inquiries</p>
            </div>
            <div className="bg-[var(--card-bg)] p-4 sm:p-6 rounded-2xl shadow-sm border border-[var(--border)] transition-colors duration-300">
              <p className="text-[var(--foreground)]/50 text-xs sm:text-sm font-medium mb-1">New Inquiries</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">{newLeadsCount}</h3>
              <p className="text-[var(--accent)] text-[10px] sm:text-xs mt-2 font-bold uppercase">Requires attention</p>
            </div>
            <div className="bg-[var(--card-bg)] p-4 sm:p-6 rounded-2xl shadow-sm border border-[var(--border)] transition-colors duration-300">
              <p className="text-[var(--foreground)]/50 text-xs sm:text-sm font-medium mb-1">Status</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-emerald-600">Active</h3>
              <p className="text-emerald-600 text-[10px] sm:text-xs mt-2 font-bold uppercase">System online</p>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--border)] overflow-hidden transition-colors duration-300">
            <div className="p-4 sm:p-6 border-b border-[var(--border)] flex items-center justify-between">
              <h4 className="font-bold text-[var(--foreground)] text-sm sm:text-base">All Leads</h4>
              <button className="text-[var(--foreground)]/50 flex items-center space-x-2 text-xs sm:text-sm font-medium hover:text-[var(--primary)] transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
            
            <div className="overflow-x-auto overflow-y-hidden">
              <div className="min-w-[800px]">
                <table className="w-full text-left">
                  <thead className="bg-[var(--secondary)] text-[var(--foreground)]/50 text-[10px] sm:text-xs uppercase font-bold">
                    <tr>
                      <th className="px-4 sm:px-6 py-4">Student Name</th>
                      <th className="px-4 sm:px-6 py-4">Course/Grade</th>
                      <th className="px-4 sm:px-6 py-4">Contact Details</th>
                      <th className="px-4 sm:px-6 py-4">Message</th>
                      <th className="px-4 sm:px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {leadsList.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-[var(--foreground)]/40 italic">
                          No inquiries found yet.
                        </td>
                      </tr>
                    ) : (
                      leadsList.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[var(--primary)]/5 transition-colors">
                          <td className="px-4 sm:px-6 py-4">
                            <div className="font-bold text-[var(--foreground)] text-sm">{lead.name}</div>
                            <div className="text-[10px] text-[var(--foreground)]/40 mt-1 uppercase">
                              {new Date(lead.created_at).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-[10px] font-bold uppercase">
                              {lead.grade}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex flex-col space-y-1 text-xs text-[var(--foreground)]/70">
                              <span className="flex items-center space-x-2">
                                <Mail className="h-3 w-3" />
                                <span className="truncate max-w-[120px] sm:max-w-[150px]">{lead.email || 'N/A'}</span>
                              </span>
                              <span className="flex items-center space-x-2 font-medium text-[var(--foreground)]">
                                <Phone className="h-3 w-3" />
                                <span>{lead.phone}</span>
                              </span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-start space-x-2 text-xs text-[var(--foreground)]/60 max-w-[150px] sm:max-w-[200px]">
                              <Search className="h-3 w-3 shrink-0 mt-1 opacity-50" />
                              <span className="line-clamp-2">{lead.message}</span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <StatusDropdown id={lead.id} currentStatus={lead.status} />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
