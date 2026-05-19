import React from 'react';
import { BookOpen, Mail, Phone, MapPin, Globe, Users, Award } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-white">
              <BookOpen className="h-8 w-8 text-teal-400" />
              <span className="text-2xl font-bold tracking-tight">
                Acharya <span className="text-teal-400">Tutorials</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              Empowering students through quality education at reasonable prices. Specializing in ICSE, SSC, and CBSE curricula with over 10 years of expertise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-teal-400 transition-colors"><Globe className="h-5 w-5" /></a>
              <a href="#" className="hover:text-teal-400 transition-colors"><Users className="h-5 w-5" /></a>
              <a href="#" className="hover:text-teal-400 transition-colors"><Award className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-teal-400 transition-colors">Services</a></li>
              <li><a href="#why-us" className="hover:text-teal-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm">
              <li><span className="hover:text-teal-400 transition-colors cursor-default">ICSE / SSC / CBSE Tuitions</span></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-default">Spoken English & Hindi</span></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-default">Home Tutoring</span></li>
              <li><span className="hover:text-teal-400 transition-colors cursor-default">Online Interactive Classes</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-teal-400 shrink-0 mt-1" />
                <span>Visakhapatnam, Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-teal-400 shrink-0" />
                <span>+91 93468 01502</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-teal-400 shrink-0" />
                <span>tanumanu73@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Acharya Tutorials. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
