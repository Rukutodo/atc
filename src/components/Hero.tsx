'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Users, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-secondary">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-teal-100/50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-emerald-100/50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Star className="h-4 w-4 fill-current" />
              <span>Leading Tutoring Service in Mumbai</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Empowering Minds, <br />
              <span className="text-teal-600">Shaping Futures.</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
              Unlock your true potential with expert guidance. We provide top-quality education for ICSE, SSC, and CBSE students at prices that make sense.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-xl shadow-teal-100 group"
              >
                Enroll Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
              >
                View Services
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900">500+</span>
                <span className="text-slate-500 text-sm">Students Taught</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900">10+</span>
                <span className="text-slate-500 text-sm">Expert Teachers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900">98%</span>
                <span className="text-slate-500 text-sm">Success Rate</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
               {/* Using a placeholder SVG pattern as "Modern" visual instead of a stock photo */}
               <div className="aspect-[4/5] bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                  <div className="text-white p-12 text-center">
                    <GraduationCap className="h-24 w-24 mx-auto mb-6 opacity-80" />
                    <h3 className="text-3xl font-bold mb-4">Excellence in Every Lesson</h3>
                    <p className="text-teal-50 opacity-90 text-lg">Personalized attention for every child's growth.</p>
                  </div>
               </div>
            </div>
            
            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center space-x-4 border border-teal-50"
            >
              <div className="bg-amber-100 p-3 rounded-xl">
                <Star className="h-6 w-6 text-amber-500 fill-current" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Rated 4.9/5</p>
                <p className="text-xs text-slate-500">by parents & students</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center space-x-4 border border-teal-50"
            >
              <div className="bg-teal-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Expert Faculty</p>
                <p className="text-xs text-slate-500">Highly qualified mentors</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
