'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Book, Globe, Home, Laptop, CheckCircle2 } from 'lucide-react';

const services = [
  {
    title: 'ICSE, SSC & CBSE Tuitions',
    description: 'Comprehensive academic support for all major boards up to 10th grade. We simplify complex concepts and build strong foundations.',
    icon: Book,
    features: ['Grade-specific curriculum', 'Regular mock tests', 'In-depth subject analysis'],
    color: 'bg-blue-50/50 text-blue-600',
  },
  {
    title: 'Spoken English & Hindi',
    description: 'Master the art of communication. Our language modules are designed to boost confidence and fluency in English and Hindi.',
    icon: Globe,
    features: ['Vocabulary building', 'Grammar focus', 'Daily conversation practice'],
    color: 'bg-teal-50/50 text-teal-600',
  },
  {
    title: 'Home Tutoring',
    description: 'Personalized education at your doorstep. One-on-one attention tailored to your child\'s unique learning pace and style.',
    icon: Home,
    features: ['Flexible scheduling', 'Safe & comfortable environment', 'Custom study plans'],
    color: 'bg-amber-50/50 text-amber-600',
  },
  {
    title: 'Online Classes',
    description: 'Learn from the comfort of your home with our interactive digital classroom sessions. High-quality tutoring available anywhere.',
    icon: Laptop,
    features: ['Interactive whiteboard', 'Recorded sessions', 'Digital study materials'],
    color: 'bg-purple-50/50 text-purple-600',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-[var(--background)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-[var(--foreground)] mb-4"
          >
            Our <span className="text-[var(--primary)]">Premium Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--foreground)]/60 max-w-2xl mx-auto"
          >
            We offer a range of educational programs designed to provide the best learning experience for every student.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-[var(--card-bg)] border border-[var(--border)] card-hover shadow-sm"
            >
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 ${service.color}`}>
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">{service.title}</h3>
              <p className="text-[var(--foreground)]/70 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-2 text-[var(--foreground)]/80">
                    <CheckCircle2 className="h-5 w-5 text-[var(--primary)]" />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
