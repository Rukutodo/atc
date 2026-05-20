'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, GraduationCap } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  grade: z.string().min(1, 'Please select a grade/subject'),
  guardianQualification: z.string().min(2, 'Please enter your qualification'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[var(--background)] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-[var(--foreground)] mb-6"
            >
              Start Your Journey <br />
              <span className="text-[var(--primary)]">With Us Today</span>
            </motion.h2>
            <p className="text-lg text-[var(--foreground)]/70 mb-8 leading-relaxed">
              Fill out the form below and our team will get back to you within 24 hours to discuss your educational needs.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-[var(--primary)]/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--foreground)]">All Classes Covered</h4>
                  <p className="text-sm text-[var(--foreground)]/50">From Primary to Higher Secondary (1st - 12th).</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-[var(--primary)]/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--foreground)]">Specialized Mentoring</h4>
                  <p className="text-sm text-[var(--foreground)]/50">Personalized plans for board exams and beyond.</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[var(--card-bg)] p-8 sm:p-10 rounded-3xl shadow-2xl shadow-black/5 border border-[var(--border)]"
          >
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="bg-[var(--primary)]/10 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-[var(--primary)]" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">Message Sent!</h3>
                <p className="text-[var(--foreground)]/60 mb-8">Thank you for reaching out. We'll contact you shortly.</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="text-[var(--primary)] font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[var(--foreground)]/80 mb-2">Full Name</label>
                    <input
                      {...register('name')}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl border bg-[var(--input-bg)] text-[var(--input-text)] placeholder:text-[var(--foreground)]/30 ${
                        errors.name ? 'border-red-500' : 'border-[var(--border)]'
                      } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--foreground)]/80 mb-2">Phone Number</label>
                    <input
                      {...register('phone')}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 rounded-xl border bg-[var(--input-bg)] text-[var(--input-text)] placeholder:text-[var(--foreground)]/30 ${
                        errors.phone ? 'border-red-500' : 'border-[var(--border)]'
                      } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[var(--foreground)]/80 mb-2">Guardian Qualification</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground)]/30" />
                      <input
                        {...register('guardianQualification')}
                        placeholder="e.g. M.Tech, Parent"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-[var(--input-bg)] text-[var(--input-text)] placeholder:text-[var(--foreground)]/30 ${
                          errors.guardianQualification ? 'border-red-500' : 'border-[var(--border)]'
                        } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all`}
                      />
                    </div>
                    {errors.guardianQualification && <p className="text-red-500 text-xs mt-1">{errors.guardianQualification.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--foreground)]/80 mb-2">Grade / Service</label>
                    <select
                      {...register('grade')}
                      className={`w-full px-4 py-3 rounded-xl border bg-[var(--input-bg)] text-[var(--input-text)] ${
                        errors.grade ? 'border-red-500' : 'border-[var(--border)]'
                      } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all`}
                    >
                      <option value="">Select an option</option>
                      <optgroup label="School Boards">
                        <option value="icse">ICSE Tuitions (1st-12th)</option>
                        <option value="cbse">CBSE Tuitions (1st-12th)</option>
                        <option value="ssc">SSC Tuitions (1st-12th)</option>
                      </optgroup>
                      <optgroup label="Specialized Services">
                        <option value="languages">Spoken English/Hindi</option>
                        <option value="home">Home Tutoring</option>
                        <option value="online">Online Classes</option>
                        <option value="competitive">JEE/NEET Foundation</option>
                      </optgroup>
                    </select>
                    {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade.message}</p>}
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-bold text-[var(--foreground)]/80 mb-2">Email Address (Optional)</label>
                   <input
                     {...register('email')}
                     placeholder="john@example.com"
                     className={`w-full px-4 py-3 rounded-xl border bg-[var(--input-bg)] text-[var(--input-text)] placeholder:text-[var(--foreground)]/30 ${
                       errors.email ? 'border-red-500' : 'border-[var(--border)]'
                     } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all`}
                   />
                   {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[var(--foreground)]/80 mb-2">Your Message</label>
                  <textarea
                    {...register('message')}
                    rows={3}
                    placeholder="Tell us about the student's requirements..."
                    className={`w-full px-4 py-3 rounded-xl border bg-[var(--input-bg)] text-[var(--input-text)] placeholder:text-[var(--foreground)]/30 ${
                      errors.message ? 'border-red-500' : 'border-[var(--border)]'
                    } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all resize-none`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                {submitStatus === 'error' && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm">Something went wrong. Please try again later.</span>
                  </div>
                )}

                <button
                  disabled={isSubmitting}
                  className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-xl flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Application
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
