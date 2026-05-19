'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Check, Flag, Loader2 } from 'lucide-react';

type Theme = 'light' | 'dark' | 'india';

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Fetch initial global theme from DB
    const fetchTheme = async () => {
      try {
        const res = await fetch('/api/theme');
        const data = await res.json();
        if (data.theme) {
          setCurrentTheme(data.theme);
          updateDom(data.theme);
        }
      } catch (err) {
        console.error('Failed to fetch initial theme');
      }
    };
    fetchTheme();
  }, []);

  const updateDom = (theme: Theme) => {
    const root = document.documentElement;
    // Remove all possible theme classes
    root.classList.remove('light', 'dark', 'india');
    // Add the new one
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    // Force a small delay then re-apply to ensure body transition triggers
    setTimeout(() => {
        root.className = theme; // Aggressive force
    }, 10);
  };

  const setTheme = async (theme: Theme) => {
    setIsUpdating(true);
    try {
      // 1. Save to DB (for other users)
      const res = await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme }),
      });

      if (res.ok) {
        // 2. Update current UI
        setCurrentTheme(theme);
        updateDom(theme);
        localStorage.setItem('theme', theme);
        
        // 3. Optional: Refresh to force server-side layout sync
        // window.location.reload(); 
      }
    } catch (error) {
      console.error('Failed to update global theme');
    } finally {
      setIsUpdating(false);
    }
  };

  const themes: { id: Theme; label: string; sub: string; icon: any; colors: string }[] = [
    { id: 'light', label: 'Light Theme', sub: 'Classic teal look', icon: Sun, colors: 'from-teal-500 to-teal-600' },
    { id: 'dark', label: 'Dark Theme', sub: 'Midnight aesthetics', icon: Moon, colors: 'from-slate-800 to-slate-900' },
    { id: 'india', label: 'Republic Day', sub: 'Saffron & Green', icon: Flag, colors: 'from-orange-500 via-white to-green-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl relative">
      {isUpdating && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-sm rounded-2xl">
          <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
        </div>
      )}
      
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`group relative flex flex-col items-center justify-center px-6 py-10 rounded-3xl border-2 transition-all duration-500 overflow-hidden ${
            currentTheme === t.id
              ? 'border-teal-600 ring-4 ring-teal-600/10'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-400'
          }`}
        >
          {/* Theme Preview Background */}
          <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${t.colors}`} />

          <div className={`relative z-10 p-5 rounded-2xl mb-4 transition-transform duration-500 group-hover:scale-110 ${
            currentTheme === t.id 
              ? 'bg-teal-600 text-white shadow-xl shadow-teal-600/20' 
              : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
          }`}>
            <t.icon className="h-10 w-10" />
          </div>

          <div className="relative z-10 text-center">
            <p className={`font-black text-xl tracking-tight ${
                currentTheme === t.id ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
            }`}>{t.label}</p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">{t.sub}</p>
          </div>

          {currentTheme === t.id && (
            <div className="absolute top-6 right-6 bg-teal-600 rounded-full p-1.5 shadow-lg animate-in zoom-in duration-300">
              <Check className="h-4 w-4 text-white stroke-[3px]" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
