'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Users, Star, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-secondary dark:bg-slate-900">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-teal-100/50 dark:bg-teal-900/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Star className="h-4 w-4 fill-current" />
              <span>Leading Tutoring Service in Visakhapatnam</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              Empowering Minds, <br />
              <span className="text-teal-600 dark:text-teal-400">Shaping Futures.</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-lg">
              Unlock your true potential with expert guidance. We provide top-quality education for ICSE, SSC, and CBSE students at prices that make sense.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-xl shadow-teal-100 dark:shadow-teal-900/20 group"
              >
                Enroll Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                View Services
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">200+</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">Students Taught</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">98%</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">Success Rate</span>
              </div>
            </div>
          </motion.div>
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="relative hidden lg:block"
>
  <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 aspect-[4/5]">
     <img 
       src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" 
       alt="Group of students studying together" 
       className="object-cover w-full h-full"
     />
  </div>
            
            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl z-20 flex items-center space-x-4 border border-teal-50 dark:border-slate-700"
            >
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl">
                <Star className="h-6 w-6 text-amber-500 fill-current" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Rated 4.9/5</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">by parents & students</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl z-20 flex items-center space-x-4 border border-teal-50 dark:border-slate-700"
            >
              <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-xl">
                <Award className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">10+ Years</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Of Teaching Excellence</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
