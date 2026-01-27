'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Dumbbell, Activity, Users, Calendar, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            New: AI-Powered Workout Plans
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Transform Your Body, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Master Your Life</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            The all-in-one fitness management system for serious athletes, gyms, and trainers.
            Track progress, schedule classes, and achieve greatness.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-900/20">
                Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div variants={itemVariants} className="mt-20 pt-10 border-t border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-white mb-1">10k+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Certified Trainers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">50k</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Workouts Logged</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">4.9/5</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">App Rating</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-green-600 tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              FitLife Pro provides the essential tools to manage every aspect of your fitness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: Dumbbell, title: 'Workout Tracking', desc: 'Log exercises, sets, and reps with our intuitive mobile-friendly interface.' },
              { icon: Activity, title: 'Advanced Analytics', desc: 'Visualize your progress with detailed charts for weight, BMI, and calorie burn.' },
              { icon: Users, title: 'Trainer Connection', desc: 'Get assigned a personal trainer who can view your stats and update your plans.' },
              { icon: Calendar, title: 'Smart Scheduling', desc: 'Book gym classes and organize your week with an integrated calendar system.' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                whileHover={{ y: -5 }}
              >
                <div className="h-14 w-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Trusted by Athletes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Marathon Runner", quote: "FitLife Pro changed how I prepare for races. The analytics are a game changer." },
              { name: "Mike Chen", role: "CrossFit Trainer", quote: "The best platform for managing my clients. I can see their progress in real-time." },
              { name: "Emily Davis", role: "Yoga Instructor", quote: "Simple, beautiful, and effective. My students love the scheduling feature." }
            ].map((t, i) => (
              <Card key={i} className="bg-gray-800 border-gray-700 text-gray-100 p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />)}
                </div>
                <p className="mb-6 italic text-gray-300">"{t.quote}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-sm text-gray-400">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Transformation?</h2>
          <p className="text-xl mb-10 text-green-100">Join thousands of others who are actively improving their lives with FitLife Pro.</p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 text-lg px-10 h-14 font-bold shadow-xl">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
