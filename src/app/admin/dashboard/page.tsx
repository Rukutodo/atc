import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { 
  Users, 
  Mail, 
  Phone, 
  BookOpen, 
  LogOut, 
  LayoutDashboard, 
  Search,
  ChevronRight,
  Clock,
  Filter,
  MessageSquare
} from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-teal-600" />
            <span className="font-bold text-xl dark:text-white">Acharya Admin</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button className="flex items-center space-x-3 w-full p-3 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-xl font-bold transition-all text-left">
            <LayoutDashboard className="h-5 w-5" />
            <span>Leads Dashboard</span>
          </button>
          <button className="flex items-center space-x-3 w-full p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-medium transition-all text-left">
            <Users className="h-5 w-5" />
            <span>Students</span>
          </button>
          <button className="flex items-center space-x-3 w-full p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-medium transition-all text-left">
            <Clock className="h-5 w-5" />
            <span>History</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Inquiries</h1>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                placeholder="Search leads..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500 text-sm w-64"
              />
            </div>
            <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
              VC
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Leads</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{totalLeads}</h3>
              <p className="text-teal-600 text-xs mt-2 font-bold">All time inquiries</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">New Inquiries</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{newLeadsCount}</h3>
              <p className="text-amber-500 text-xs mt-2 font-bold">Requires attention</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Status</p>
              <h3 className="text-3xl font-bold text-emerald-600">Active</h3>
              <p className="text-emerald-600 text-xs mt-2 font-bold">System online</p>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h4 className="font-bold text-slate-900 dark:text-white">All Leads</h4>
              <button className="text-slate-500 dark:text-slate-400 flex items-center space-x-2 text-sm font-medium hover:text-teal-600">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">Course/Grade</th>
                    <th className="px-6 py-4">Contact Details</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {leadsList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 italic">
                        No inquiries found yet.
                      </td>
                    </tr>
                  ) : (
                    leadsList.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900 dark:text-white">{lead.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase">
                            {lead.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col space-y-1 text-sm text-slate-600 dark:text-slate-300">
                            <span className="flex items-center space-x-2">
                              <Mail className="h-3 w-3" />
                              <span className="truncate max-w-[150px]">{lead.email || 'N/A'}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                              <Phone className="h-3 w-3" />
                              <span>{lead.phone}</span>
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-2 text-sm text-slate-600 dark:text-slate-400 max-w-[200px]">
                            <MessageSquare className="h-4 w-4 shrink-0 mt-1 opacity-50" />
                            <span className="line-clamp-2">{lead.message}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            lead.status === 'New' ? 'bg-blue-100 text-blue-700' :
                            lead.status === 'Contacted' ? 'bg-amber-100 text-amber-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-teal-600">
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
