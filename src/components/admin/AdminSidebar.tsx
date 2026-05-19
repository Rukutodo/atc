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
    <aside className="w-64 bg-[var(--card-bg)] border-r border-[var(--border)] hidden lg:flex flex-col h-screen sticky top-0 transition-colors duration-300">
      <div className="p-6 border-b border-[var(--border)]">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-[var(--primary)]" />
          <span className="font-bold text-xl text-[var(--foreground)]">Acharya Admin</span>
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
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-bold shadow-sm' 
                  : 'text-[var(--foreground)]/60 hover:bg-[var(--primary)]/5 hover:text-[var(--primary)] font-medium'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--border)] space-y-4">
        <form action="/api/logout" method="POST">
          <button 
            type="submit"
            className="flex items-center space-x-3 w-full p-3 text-red-500 hover:bg-red-50/10 rounded-xl font-medium transition-all text-left"
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
