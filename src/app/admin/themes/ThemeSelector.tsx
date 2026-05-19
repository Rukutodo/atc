'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Check, Flag, Loader2 } from 'lucide-react';

type Theme = 'light' | 'dark' | 'india';

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Fetch initial global theme
    fetch('/api/theme')
      .then(res => res.json())
      .then(data => {
        if (data.theme) {
          setCurrentTheme(data.theme);
          updateDom(data.theme);
        }
      });
  }, []);

  const updateDom = (theme: Theme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'india');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
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
        setCurrentTheme(theme);
        updateDom(theme);
        localStorage.setItem('theme', theme);
      }
    } catch (error) {
      console.error('Failed to update global theme');
    } finally {
      setIsUpdating(false);
    }
  };

  const themes: { id: Theme; label: string; sub: string; icon: any; color: string }[] = [
    { id: 'light', label: 'Light Theme', sub: 'Classic bright appearance', icon: Sun, color: 'bg-white text-slate-500' },
    { id: 'dark', label: 'Dark Theme', sub: 'Modern sleek appearance', icon: Moon, color: 'bg-slate-900 text-white' },
    { id: 'india', label: 'Republic Day', sub: 'Saffron, White, & Green', icon: Flag, color: 'bg-gradient-to-r from-orange-500 via-white to-green-500 text-slate-800' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl relative">
      {isUpdating && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/20 backdrop-blur-[1px] rounded-2xl">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        </div>
      )}
      
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`relative flex flex-col items-center justify-center px-6 py-8 rounded-2xl border-2 transition-all duration-300 ${
            currentTheme === t.id
              ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-300'
          }`}
        >
          <div className={`p-4 rounded-2xl mb-4 ${currentTheme === t.id ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
            <t.icon className="h-8 w-8" />
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-900 dark:text-white text-lg">{t.label}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t.sub}</p>
          </div>
          {currentTheme === t.id && (
            <div className="absolute top-4 right-4 bg-teal-600 rounded-full p-1 shadow-lg">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
