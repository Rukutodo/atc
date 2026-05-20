'use client';

import React, { useState } from 'react';
import { UserPlus, Shield, Mail, Key, Loader2, Plus, X, Check, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminTable = ({ initialAdmins }: { initialAdmins: any[] }) => {
  const [admins, setAdmins] = useState(initialAdmins);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // New Admin Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newAdmin = await res.json();
        setAdmins([...admins, newAdmin]);
        setShowAddForm(false);
        setFormData({ name: '', email: '', password: '' });
        alert('New admin created and credentials emailed successfully!');
        router.refresh();
      } else {
        alert('Failed to create admin. Email might already exist.');
      }
    } catch (error) {
      console.error('Failed to add admin');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (adminId: string) => {
    const newPass = prompt('Enter new temporary password for this user:');
    if (!newPass || newPass.length < 6) {
        if (newPass) alert('Password must be at least 6 characters.');
        return;
    }

    if (!confirm('Confirm password reset? This will take effect immediately.')) return;

    try {
        const res = await fetch('/api/admins/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ adminId, newPassword: newPass }),
        });
        if (res.ok) alert('Password reset successfully!');
        else alert('Failed to reset password.');
    } catch (e) {
        alert('An error occurred.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">Administrative Staff</h2>
          <p className="text-sm text-[var(--foreground)]/50 mt-1">Manage users with access to this portal</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
        >
          {showAddForm ? <X className="h-4 w-4" /> : <><UserPlus className="h-4 w-4" /> <span>Invite Admin</span></>}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddAdmin} className="bg-[var(--card-bg)] p-8 rounded-3xl border border-[var(--border)] shadow-sm space-y-6 animate-in fade-in slide-in-from-top-2 duration-300 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[var(--foreground)] mb-2">Full Name</label>
              <input 
                placeholder="Staff Member Name" 
                required
                className="w-full px-4 py-2 rounded-xl border bg-[var(--input-bg)] text-[var(--input-text)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--foreground)] mb-2">Email (Username)</label>
              <input 
                type="email"
                placeholder="staff@acharyatutorials.com" 
                required
                className="w-full px-4 py-2 rounded-xl border bg-[var(--input-bg)] text-[var(--input-text)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-[var(--foreground)] mb-2">Temporary Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground)]/30" />
              <input 
                type="text"
                placeholder="Create a strong password" 
                required
                className="w-full pl-10 pr-4 py-2 rounded-xl border bg-[var(--input-bg)] text-[var(--input-text)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
          <div className="bg-amber-50/10 p-4 rounded-xl border border-amber-500/20 text-xs text-amber-700 dark:text-amber-500">
            <strong>Note:</strong> Upon saving, an email will be sent to the staff member with these credentials.
          </div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Check className="h-5 w-5" /> <span>Finalize Access</span></>}
          </button>
        </form>
      )}

      <div className="bg-[var(--card-bg)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[var(--secondary)] text-[var(--foreground)]/50 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-[var(--primary)]/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold text-xs uppercase">
                      {admin.name[0]}
                    </div>
                    <span className="font-bold text-[var(--foreground)]">{admin.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[var(--foreground)]/70">{admin.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[var(--foreground)]/60 text-[10px] font-extrabold uppercase flex items-center w-fit space-x-1 border border-[var(--border)]">
                    <Shield className="h-3 w-3" />
                    <span>{admin.role}</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <button 
                        onClick={() => handleResetPassword(admin.id)}
                        className="p-2 text-[var(--foreground)]/40 hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 rounded-lg transition-all"
                        title="Reset Password"
                    >
                        <RefreshCcw className="h-4 w-4" />
                    </button>
                </td>
              </tr>
            ))}
            {/* Fallback Display if DB is empty */}
            {admins.length === 0 && !admins.some(a => a.email === 'venucolab@gmail.com') && (
                <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-[var(--foreground)]/40 italic">
                        No additional staff members found.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
