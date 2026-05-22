'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Loader2, AlertCircle, Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('venucolab@gmail.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-[var(--card-bg)] rounded-3xl shadow-xl p-8 sm:p-10 border border-[var(--border)]">
        <div className="text-center mb-10">
          <div className="bg-teal-500/10 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-teal-600" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2 tracking-tight">Admin Portal</h2>
          <p className="text-[var(--foreground)]/50">Please sign in to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[var(--foreground)]/80 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@acharyatutorials.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--input-text)] outline-none focus:ring-2 focus:ring-teal-500 transition-all placeholder:text-[var(--foreground)]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[var(--foreground)]/80 mb-2 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--input-text)] outline-none focus:ring-2 focus:ring-teal-500 transition-all placeholder:text-[var(--foreground)]/20"
            />
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <button
            disabled={isLoading}
            className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/10 flex items-center justify-center disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span>Verifying...</span>
              </>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;
