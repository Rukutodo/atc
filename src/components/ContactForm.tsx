'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  grade: z.string().min(1, 'Please select a grade/subject'),
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
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-slate-900 dark:text-white mb-6"
            >
              Start Your Journey <br />
              <span className="text-teal-600 dark:text-teal-400">With Us Today</span>
            </motion.h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Fill out the form below and our team will get back to you within 24 hours to discuss your child's educational needs.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-teal-50 dark:bg-teal-900/30 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Personalized Counseling</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Free first session to understand student's needs.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-teal-50 dark:bg-teal-900/30 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">No Hidden Fees</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Transparent pricing for all tutoring packages.</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-slate-100 dark:shadow-black/20 border border-slate-100 dark:border-slate-700"
          >
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="bg-teal-100 dark:bg-teal-900/30 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8">Thank you for reaching out. We'll contact you shortly.</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                    <input
                      {...register('name')}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                        errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                    <input
                      {...register('email')}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                        errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                    <input
                      {...register('phone')}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                        errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Grade / Service</label>
                    <select
                      {...register('grade')}
                      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white ${
                        errors.grade ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all bg-white dark:bg-slate-900`}
                    >
                      <option value="">Select an option</option>
                      <option value="icse">ICSE Tuitions</option>
                      <option value="ssc">SSC Tuitions</option>
                      <option value="cbse">CBSE Tuitions</option>
                      <option value="languages">Spoken English/Hindi</option>
                      <option value="home">Home Tutoring</option>
                      <option value="online">Online Classes</option>
                    </select>
                    {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your Message</label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Tell us about your child's requirements..."
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                      errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                    } focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                {submitStatus === 'error' && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm">Something went wrong. Please try again later.</span>
                  </div>
                )}

                <button
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-xl shadow-teal-100 dark:shadow-teal-900/20 flex items-center justify-center disabled:opacity-70"
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
