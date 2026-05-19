'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BookOpen, 
  LogOut, 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Palette, 
  Clock 
} from 'lucide-react';
import ThemeToggle from '@/app/admin/dashboard/ThemeToggle';

const AdminSidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Leads Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', href: '/admin/students', icon: Users },
    { name: 'Attendance', href: '/admin/attendance', icon: CalendarCheck },
    { name: 'Themes', href: '/admin/themes', icon: Palette },
    { name: 'History', href: '#', icon: Clock, placeholder: true },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-teal-600" />
          <span className="font-bold text-xl dark:text-white">Acharya Admin</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`flex items-center space-x-3 w-full p-3 rounded-xl transition-all text-left ${
                isActive 
                  ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 font-bold' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-700 space-y-4">
        <ThemeToggle />
        <form action="/api/logout" method="POST">
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
  );
};

export default AdminSidebar;
