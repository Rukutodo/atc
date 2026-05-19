'use client';

import React, { useState } from 'react';
import { Plus, Phone, Mail, CheckCircle, Edit2, Save, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const StudentTable = ({ initialStudents }: { initialStudents: any[] }) => {
  const [students, setStudents] = useState(initialStudents);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: '', grade: '', type: '' });
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    type: 'ICSE',
    phone: '',
    email: ''
  });

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const newStudent = await res.json();
        setStudents([newStudent, ...students]);
        setShowAddForm(false);
        setFormData({ name: '', grade: '', type: 'ICSE', phone: '', email: '' });
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to add student');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (student: any) => {
    setEditingId(student.id);
    setEditData({ name: student.name, grade: student.grade, type: student.type });
  };

  const handleUpdate = async (id: string) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        const updated = await res.json();
        setStudents(students.map(s => s.id === id ? updated : s));
        setEditingId(null);
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to update student');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return;
    try {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStudents(students.filter(s => s.id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to delete student');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Students</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 dark:shadow-teal-900/20"
        >
          {showAddForm ? 'Cancel' : <><Plus className="h-4 w-4" /> <span>Add Student</span></>}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddStudent} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <input placeholder="Student Name" required className="px-4 py-2 rounded-lg border dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input placeholder="Grade (e.g. 10th)" required className="px-4 py-2 rounded-lg border dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})} />
          <select className="px-4 py-2 rounded-lg border dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
            <option value="ICSE">ICSE</option>
            <option value="CBSE">CBSE</option>
            <option value="SSC">SSC</option>
            <option value="Home Tutoring">Home Tutoring</option>
            <option value="Online Class">Online Class</option>
          </select>
          <input placeholder="Phone Number" className="px-4 py-2 rounded-lg border dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          <input placeholder="Email (Optional)" type="email" className="px-4 py-2 rounded-lg border dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          <button type="submit" disabled={isSubmitting} className="bg-slate-900 dark:bg-teal-600 text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 disabled:opacity-50">
            {isSubmitting ? 'Saving...' : 'Save Student'}
          </button>
        </form>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Student Identity (Name - Class - Type)</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic">No students enrolled yet.</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    {editingId === student.id ? (
                      <div className="flex flex-col space-y-2 max-w-sm">
                        <input className="px-3 py-1 text-sm border rounded bg-transparent text-white" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} placeholder="Name" />
                        <div className="flex space-x-2">
                           <input className="px-3 py-1 text-sm border rounded bg-transparent text-white w-1/2" value={editData.grade} onChange={e => setEditData({...editData, grade: e.target.value})} placeholder="Grade" />
                           <input className="px-3 py-1 text-sm border rounded bg-transparent text-white w-1/2" value={editData.type} onChange={e => setEditData({...editData, type: e.target.value})} placeholder="Type" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 font-bold">
                          {student.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {student.name} - {student.grade} - {student.type}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase mt-0.5">
                            Enrolled on {new Date(student.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1 text-sm text-slate-600 dark:text-slate-400">
                      <span className="flex items-center space-x-2"><Phone className="h-3.5 w-3.5" /> <span>{student.phone}</span></span>
                      {student.email && <span className="flex items-center space-x-2"><Mail className="h-3.5 w-3.5" /> <span>{student.email}</span></span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-[10px] font-extrabold uppercase flex items-center w-fit space-x-1">
                      <CheckCircle className="h-3 w-3" />
                      <span>{student.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      {editingId === student.id ? (
                        <>
                          <button onClick={() => handleUpdate(student.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"><Save className="h-4 w-4" /></button>
                          <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><X className="h-4 w-4" /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEditing(student)} className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => handleDelete(student.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
