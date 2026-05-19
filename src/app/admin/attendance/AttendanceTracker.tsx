'use client';

import React, { useState } from 'react';
import { Check, X, Loader2, Calendar, BarChart3 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AttendanceTracker = ({ students }: { students: any[] }) => {
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const router = useRouter();

  const handleToggle = async (studentId: string, currentStatus: boolean | undefined) => {
    setIsUpdating(studentId);
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          date: new Date().toISOString().split('T')[0],
          is_present: !currentStatus
        }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to update attendance');
    } finally {
      setIsUpdating(null);
    }
  };

  const calculateStats = (records: any[]) => {
    if (!records || records.length === 0) return { monthly: 0, yearly: 0 };

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyRecords = records.filter(r => {
      const d = new Date(r.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const yearlyRecords = records.filter(r => {
      const d = new Date(r.date);
      return d.getFullYear() === currentYear;
    });

    const calcPerc = (recs: any[]) => 
      recs.length === 0 ? 0 : Math.round((recs.filter(r => r.is_present).length / recs.length) * 100);

    return {
      monthly: calcPerc(monthlyRecords),
      yearly: calcPerc(yearlyRecords)
    };
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">
          <tr>
            <th className="px-6 py-4">Student Identity</th>
            <th className="px-6 py-4 text-center">Monthly %</th>
            <th className="px-6 py-4 text-center">Yearly %</th>
            <th className="px-6 py-4 text-right">Mark Today</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {students.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic">No active students to track.</td>
            </tr>
          ) : (
            students.map((student) => {
              const todayRecord = student.attendance?.find((r: any) => r.date === new Date().toISOString().split('T')[0]);
              const isPresent = todayRecord?.is_present ?? false;
              const stats = calculateStats(student.attendance);

              return (
                <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {student.name} - {student.grade} - {student.type}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center space-y-1">
                      <div className="w-20 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${stats.monthly > 75 ? 'bg-emerald-500' : stats.monthly > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${stats.monthly}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{stats.monthly}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center space-y-1">
                      <div className="w-20 bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${stats.yearly > 75 ? 'bg-emerald-500' : stats.yearly > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${stats.yearly}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{stats.yearly}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      disabled={isUpdating === student.id}
                      onClick={() => handleToggle(student.id, isPresent)}
                      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl font-bold transition-all text-xs ${
                        isPresent 
                          ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-slate-50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {isUpdating === student.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : isPresent ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      <span>{isPresent ? 'Present' : 'Absent'}</span>
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTracker;
