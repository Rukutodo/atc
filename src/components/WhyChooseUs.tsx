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
    <section id="why-us" className="py-24 bg-[var(--secondary)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-[var(--foreground)] mb-6"
            >
              Why Parents Trust <br />
              <span className="text-[var(--primary)]">Acharya Tutorials</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[var(--foreground)]/70 mb-10 leading-relaxed"
            >
              With over 10 years of experience in the field of education, we believe that every student has a unique spark. Our mission is to provide the right environment and guidance to help that spark grow into a bright future.
            </motion.p>
            
            <div className="space-y-6">
              <div className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-sm border border-[var(--border)]">
                <h4 className="font-bold text-[var(--foreground)] mb-2">Our Promise</h4>
                <p className="text-[var(--foreground)]/60">To deliver excellence in education while keeping it affordable for every family.</p>
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
                className="bg-[var(--card-bg)] p-8 rounded-3xl shadow-sm hover:shadow-md transition-all border border-[var(--border)]"
              >
                <div className="bg-[var(--primary)]/10 h-12 w-12 rounded-xl flex items-center justify-center mb-6">
                  <reason.icon className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">{reason.title}</h3>
                <p className="text-[var(--foreground)]/60 text-sm leading-relaxed">
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
