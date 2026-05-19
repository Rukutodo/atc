'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Check } from 'lucide-react';

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setCurrentTheme(theme);
  }, []);

  const setTheme = (theme: 'light' | 'dark') => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
      {/* Light Theme Pill */}
      <button
        onClick={() => setTheme('light')}
        className={`relative flex items-center justify-between px-8 py-6 rounded-2xl border-2 transition-all duration-300 ${
          currentTheme === 'light'
            ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-300'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-xl ${currentTheme === 'light' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
            <Sun className="h-6 w-6" />
          </div>
          <div className="text-left">
            <p className="font-bold text-slate-900 dark:text-white text-lg">Light Theme</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Classic bright appearance</p>
          </div>
        </div>
        {currentTheme === 'light' && (
          <div className="bg-teal-600 rounded-full p-1">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </button>

      {/* Dark Theme Pill */}
      <button
        onClick={() => setTheme('dark')}
        className={`relative flex items-center justify-between px-8 py-6 rounded-2xl border-2 transition-all duration-300 ${
          currentTheme === 'dark'
            ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-300'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-xl ${currentTheme === 'dark' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
            <Moon className="h-6 w-6" />
          </div>
          <div className="text-left">
            <p className="font-bold text-slate-900 dark:text-white text-lg">Dark Theme</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Modern sleek appearance</p>
          </div>
        </div>
        {currentTheme === 'dark' && (
          <div className="bg-teal-600 rounded-full p-1">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </button>
    </div>
  );
};

export default ThemeSelector;
