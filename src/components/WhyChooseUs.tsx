'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, DollarSign, Award } from 'lucide-react';

const reasons = [
  {
    title: 'Quality Education',
    description: 'We never compromise on quality. Our curriculum is constantly updated to meet modern standards.',
    icon: Award,
  },
  {
    title: 'Reasonable Pricing',
    description: 'Top-tier education should be accessible. We offer the best value for your investment in your child\'s future.',
    icon: DollarSign,
  },
  {
    title: 'Expert Mentorship',
    description: 'Our teachers aren\'t just instructors; they are mentors who guide students through every challenge.',
    icon: ShieldCheck,
  },
  {
    title: 'Rapid Growth',
    description: 'Our personalized approach ensures visible improvement in academic performance within months.',
    icon: Zap,
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-24 bg-secondary dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-slate-900 dark:text-white mb-6"
            >
              Why Parents Trust <br />
              <span className="text-teal-600 dark:text-teal-400">Acharya Tutorials</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed"
            >
              We believe that every student has a unique spark. Our mission is to provide the right environment and guidance to help that spark grow into a bright future.
            </motion.p>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-teal-50 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Our Promise</h4>
                <p className="text-slate-600 dark:text-slate-400">To deliver excellence in education while keeping it affordable for every family.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-transparent dark:border-slate-700"
              >
                <div className="bg-teal-100 dark:bg-teal-900/30 h-12 w-12 rounded-xl flex items-center justify-center mb-6">
                  <reason.icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{reason.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
