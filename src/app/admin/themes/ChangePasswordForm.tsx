'use client';

import React, { useState } from 'react';
import { Key, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/admins/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (res.ok) {
        setStatus('success');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMessage(data.error || 'Failed to update password');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--card-bg)] p-8 rounded-3xl border border-[var(--border)] shadow-sm max-w-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-[var(--primary)]/10 rounded-lg text-[var(--primary)]">
          <Lock className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold text-[var(--foreground)]">Security Settings</h3>
      </div>

      <p className="text-sm text-[var(--foreground)]/50 mb-8">
        Keep your account secure by updating your password regularly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-[var(--foreground)]/80 mb-2">Current Password</label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground)]/30" />
            <input
              type="password"
              required
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--input-text)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-[var(--foreground)]/80 mb-2">New Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--input-text)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[var(--foreground)]/80 mb-2">Confirm New Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--input-text)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {status === 'error' && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50/10 p-4 rounded-xl border border-red-500/20">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm font-medium">{errorMessage}</span>
          </div>
        )}

        {status === 'success' && (
          <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50/10 p-4 rounded-xl border border-emerald-500/20">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Password updated successfully!</span>
          </div>
        )}

        <button
          disabled={isSubmitting}
          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-3 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center space-x-2"
        >
          {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <span>Update Password</span>}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
