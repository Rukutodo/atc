'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const StatusDropdown = ({ id, currentStatus }: { id: string; currentStatus: string }) => {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setStatus(newStatus);
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'New': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
      case 'Contacted': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
      case 'Enrolled': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
      case 'Closed': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="relative inline-block">
      {isUpdating ? (
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-[10px] font-extrabold uppercase">
          <Loader2 className="h-3 w-3 animate-spin" />
          <span>Updating...</span>
        </div>
      ) : (
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className={`appearance-none px-3 py-1 rounded-full text-[10px] font-extrabold uppercase outline-none cursor-pointer border-none ${getStatusColor(status)}`}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Enrolled">Enrolled</option>
          <option value="Closed">Closed</option>
        </select>
      )}
    </div>
  );
};

export default StatusDropdown;
