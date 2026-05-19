'use client';

import React, { useState } from 'react';
import { Check, X, Loader2, Award, Percent } from 'lucide-react';
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

  const calculateAttendance = (attendanceRecords: any[]) => {
    if (!attendanceRecords || attendanceRecords.length === 0) return 0;
    const present = attendanceRecords.filter(r => r.is_present).length;
    return Math.round((present / attendanceRecords.length) * 100);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">
          <tr>
            <th className="px-6 py-4">Student</th>
            <th className="px-6 py-4 text-center">Attendance %</th>
            <th className="px-6 py-4 text-right">Mark Presence (Today)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {students.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-12 text-center text-slate-500 italic">No active students to track.</td>
            </tr>
          ) : (
            students.map((student) => {
              const todayRecord = student.attendance?.find((r: any) => r.date === new Date().toISOString().split('T')[0]);
              const isPresent = todayRecord?.is_present ?? false;
              const percentage = calculateAttendance(student.attendance);

              return (
                <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {student.name} - {student.grade} - {student.type}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-24 bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${percentage > 75 ? 'bg-emerald-500' : percentage > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{percentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      disabled={isUpdating === student.id}
                      onClick={() => handleToggle(student.id, isPresent)}
                      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl font-bold transition-all ${
                        isPresent 
                          ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-slate-50 dark:bg-slate-900/50 text-slate-400 dark:text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {isUpdating === student.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : isPresent ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
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
