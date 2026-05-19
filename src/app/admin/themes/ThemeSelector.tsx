'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Check, Flag, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Theme = 'light' | 'dark' | 'india';

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const detectTheme = () => {
        const theme = document.documentElement.getAttribute('data-theme') as Theme;
        return theme || 'light';
    };
    setCurrentTheme(detectTheme());
  }, []);

  const updateDom = (theme: Theme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'india');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  const setTheme = async (theme: Theme) => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme }),
      });

      if (res.ok) {
        updateDom(theme);
        setCurrentTheme(theme);
        router.refresh();
        // Small delay to let DB update and then force reload for absolute sync
        setTimeout(() => {
            window.location.reload();
        }, 800);
      }
    } catch (error) {
      console.error('Failed to update global theme');
    } finally {
      setIsUpdating(false);
    }
  };

  const themes: { id: Theme; label: string; sub: string; icon: any; colors: string }[] = [
    { id: 'light', label: 'Light Theme', sub: 'Classic bright look', icon: Sun, colors: 'from-teal-500 to-teal-600' },
    { id: 'dark', label: 'Dark Theme', sub: 'Midnight aesthetics', icon: Moon, colors: 'from-slate-800 to-slate-900' },
    { id: 'india', label: 'Republic Day', sub: 'Saffron & Green', icon: Flag, colors: 'from-orange-500 via-white to-green-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl relative">
      {isUpdating && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-3xl text-center p-4">
          <Loader2 className="h-10 w-10 animate-spin text-teal-600 mb-4" />
          <p className="font-bold text-slate-900 dark:text-white">Broadcasting Global Change...</p>
          <p className="text-xs text-slate-500 mt-1">This will update the website for all users instantly.</p>
        </div>
      )}
      
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`group relative flex flex-col items-center justify-center px-6 py-10 rounded-3xl border-2 transition-all duration-500 overflow-hidden ${
            currentTheme === t.id
              ? 'border-teal-600 ring-4 ring-teal-600/10 shadow-lg'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-400'
          }`}
        >
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
              <Check className="h-4 w-4 text-white stroke-[4px]" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
