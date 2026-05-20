'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Users, Star, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[var(--secondary)] transition-colors duration-300">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-[var(--primary)]/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[var(--accent)]/10 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-[var(--primary)]/10 text-[var(--primary)] px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Star className="h-4 w-4 fill-current" />
              <span>Leading Tutoring Service in Visakhapatnam</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--foreground)] leading-tight mb-6">
              Empowering Minds, <br />
              <span className="text-gradient">Shaping Futures.</span>
            </h1>
            
            <p className="text-xl text-[var(--foreground)]/70 mb-8 leading-relaxed max-w-lg">
              Unlock your true potential with expert guidance. We provide top-quality education for ICSE, SSC, and CBSE students at prices that make sense.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[var(--primary)] text-[var(--primary-foreground)] px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-black/5 group"
              >
                Enroll Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center bg-[var(--card-bg)] text-[var(--foreground)] border border-[var(--border)] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[var(--secondary)] transition-all"
              >
                View Services
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-[var(--foreground)]">2000+</span>
                <span className="text-[var(--foreground)]/50 text-sm font-medium">Students Taught</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-[var(--foreground)]">98%</span>
                <span className="text-[var(--foreground)]/50 text-sm font-medium">Success Rate</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-[var(--card-bg)] aspect-[4/5] bg-[var(--secondary)]">
               <img 
                 src="/assets/StudySessionInACozyRoom.png" 
                 alt="Acharya Tutorials Study Session" 
                 className="object-cover w-full h-full"
               />
            </div>
            
            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-[var(--card-bg)] p-6 rounded-2xl shadow-xl z-20 flex items-center space-x-4 border border-[var(--border)]"
            >
              <div className="bg-amber-100 p-3 rounded-xl">
                <Star className="h-6 w-6 text-amber-500 fill-current" />
              </div>
              <div>
                <p className="font-bold text-[var(--foreground)] text-sm">Rated 4.9/5</p>
                <p className="text-[10px] text-[var(--foreground)]/50">by parents & students</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-[var(--card-bg)] p-6 rounded-2xl shadow-xl z-20 flex items-center space-x-4 border border-[var(--border)]"
            >
              <div className="bg-[var(--primary)]/10 p-3 rounded-xl">
                <Award className="h-6 w-6 text-[var(--primary)]" />
              </div>
              <div>
                <p className="font-bold text-[var(--foreground)] text-sm">25+ Years</p>
                <p className="text-[10px] text-[var(--foreground)]/50">Of Teaching Excellence</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
