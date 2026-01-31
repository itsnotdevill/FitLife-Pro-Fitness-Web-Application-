'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Dumbbell, Activity, Users, Calendar, ArrowRight, Star, Cpu, Zap, Trophy, Shield, Brain } from 'lucide-react';
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-[var(--background)] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540497077202-7c8a33801524?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[var(--background)]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/80"></div>
        </div>

        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pt-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-6 py-2 text-sm font-bold tracking-[0.2em] text-violet-400 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <Cpu className="w-4 h-4 mr-2" />
            SYSTEM_ONLINE // V2.0
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-none">
            ATHENA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 drop-shadow-[0_0_30px_rgba(139,92,246,0.6)]">
              CORE
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            The world's first <span className="text-white font-semibold">Autonomous Human Operating System</span>.
            AI that doesn't just track you—it <span className="text-violet-400">engineers</span> you.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto text-lg h-16 px-12 rounded-full bg-white text-black hover:bg-violet-400 hover:text-black transition-all duration-300 font-bold tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                INITIALIZE CORE <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-16 px-12 rounded-full border-white/20 text-white hover:border-violet-500 hover:text-violet-400 hover:bg-violet-500/10 transition-all duration-300">
                LIVE DEMO
              </Button>
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div variants={itemVariants} className="mt-24 pt-10 border-t border-[var(--glass-border)] grid grid-cols-2 md:grid-cols-4 gap-8 backdrop-blur-sm bg-black/20 rounded-2xl p-6">
            {[
              { label: "Active Users", value: "12,405" },
              { label: "AI Plans Generated", value: "85k+" },
              { label: "Workout Data Points", value: "1.2M" },
              { label: "Trainers Available", value: "500+" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 font-mono">{stat.value}</div>
                <div className="text-xs md:text-sm text-[var(--primary)] uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* HP-OS Pillars Grid */}
      <section className="py-24 px-4 bg-[var(--surface)] relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--secondary)]/10 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-[var(--secondary)] tracking-[0.2em] uppercase mb-4">The HP-OS <span className="text-white opacity-50">v2.0</span></h2>
            <p className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              A Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-cyan-100">Human Operating System</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Module 1: Bio-Ware */}
            <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-[var(--primary)]/50 transition-all duration-500">
              <div className="absolute inset-0 bg-[var(--surface-highlight)] rounded-2xl m-[1px] -z-10"></div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="h-12 w-12 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center mb-6 text-[var(--primary)]">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Bio-Ware Engine</h3>
                <p className="text-gray-400 mb-6 flex-1">
                  Connect your biology to the digital twin. Real-time metabolic tracking, muscle recovery analysis, and injury prevention buffers.
                </p>
                <div className="w-full h-32 rounded-lg bg-black/50 border border-white/5 relative overflow-hidden flex items-center justify-center group-hover:border-[var(--primary)]/30 transition-colors">
                  <div className="text-[var(--primary)] text-xs font-mono">SCANNING BIOMETRICS...</div>
                  <div className="absolute bottom-0 left-0 h-1 bg-[var(--primary)] w-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Module 2: Neurofitness */}
            <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-[var(--accent)]/50 transition-all duration-500">
              <div className="absolute inset-0 bg-[var(--surface-highlight)] rounded-2xl m-[1px] -z-10"></div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="h-12 w-12 rounded-lg bg-[var(--accent)]/20 flex items-center justify-center mb-6 text-[var(--accent)]">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Neurofitness Layer</h3>
                <p className="text-gray-400 mb-6 flex-1">
                  Train your nervous system like a muscle. Focus timers, reaction drills, and cognitive load management to optimize mental output.
                </p>
                <div className="w-full h-32 rounded-lg bg-black/50 border border-white/5 relative overflow-hidden flex items-center justify-center group-hover:border-[var(--accent)]/30 transition-colors">
                  <div className="flex gap-4 items-center">
                    <div className="h-8 w-8 rounded-full bg-[var(--accent)]/20 animate-ping"></div>
                    <div className="text-[var(--accent)] text-xs font-mono">NEURAL SYNC</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 3: Gamification */}
            <div className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-[var(--secondary)]/50 transition-all duration-500">
              <div className="absolute inset-0 bg-[var(--surface-highlight)] rounded-2xl m-[1px] -z-10"></div>
              <div className="p-8 h-full flex flex-col items-start">
                <div className="h-12 w-12 rounded-lg bg-[var(--secondary)]/20 flex items-center justify-center mb-6 text-[var(--secondary)]">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Life-as-a-Game</h3>
                <p className="text-gray-400 mb-6 flex-1">
                  Turn discipline into dopamine. Complete daily quests, earn XP, level up your avatar, and unlock real-world achievements.
                </p>
                <div className="w-full h-32 rounded-lg bg-black/50 border border-white/5 relative overflow-hidden flex flex-col items-center justify-center p-4 group-hover:border-[var(--secondary)]/30 transition-colors">
                  <div className="w-full flex justify-between text-xs text-gray-400 mb-2">
                    <span>LEVEL 42</span>
                    <span>2450 XP</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--secondary)] w-[70%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Monetization */}
      <section className="py-24 px-4 bg-black relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your <span className="text-[var(--primary)]">Tier</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Unlock advanced features with our premium membership plans.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <Card className="bg-[var(--surface)] border-white/5 hover:border-gray-500 transition-colors">
              <CardContent className="p-8">
                <div className="mb-4 text-gray-400 font-medium tracking-wide">ROOKIE</div>
                <div className="text-4xl font-bold text-white mb-6">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8 text-gray-300">
                  <li className="flex items-center"><Dumbbell className="w-5 h-5 mr-3 text-gray-500" /> Basic Workout Tracking</li>
                  <li className="flex items-center"><Activity className="w-5 h-5 mr-3 text-gray-500" /> Limited Analytics</li>
                  <li className="flex items-center"><Users className="w-5 h-5 mr-3 text-gray-500" /> Community Access</li>
                </ul>
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-none">Get Started</Button>
              </CardContent>
            </Card>

            {/* Pro Tier - Highlighted */}
            <div className="relative transform md:-translate-y-4">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl blur-lg opacity-40"></div>
              <Card className="relative bg-[#0F0F0F] border-[var(--primary)] shadow-2xl">
                <div className="absolute top-0 right-0 bg-[var(--primary)] text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                <CardContent className="p-8">
                  <div className="mb-4 text-[var(--primary)] font-bold tracking-wide">CYBER ATHLETE</div>
                  <div className="text-4xl font-bold text-white mb-6">$29<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                  <ul className="space-y-4 mb-8 text-white">
                    <li className="flex items-center"><Cpu className="w-5 h-5 mr-3 text-[var(--primary)]" /> AI Workout Plans</li>
                    <li className="flex items-center"><Zap className="w-5 h-5 mr-3 text-[var(--primary)]" /> Smart Scheduling</li>
                    <li className="flex items-center"><Activity className="w-5 h-5 mr-3 text-[var(--primary)]" /> Advanced Analytics</li>
                    <li className="flex items-center"><Shield className="w-5 h-5 mr-3 text-[var(--primary)]" /> Health Reports</li>
                  </ul>
                  <Button variant="glow" className="w-full">Upgrade to Pro</Button>
                </CardContent>
              </Card>
            </div>

            {/* Elite Tier */}
            <Card className="bg-[var(--surface)] border-white/5 hover:border-[var(--accent)] transition-colors">
              <CardContent className="p-8">
                <div className="mb-4 text-[var(--accent)] font-medium tracking-wide">LEGEND</div>
                <div className="text-4xl font-bold text-white mb-6">$99<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8 text-gray-300">
                  <li className="flex items-center"><Star className="w-5 h-5 mr-3 text-[var(--accent)]" /> 1-on-1 Human Coach</li>
                  <li className="flex items-center"><Trophy className="w-5 h-5 mr-3 text-[var(--accent)]" /> Priority Support</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 mr-3 text-[var(--accent)]" /> All Pro Features</li>
                  <li className="flex items-center"><Zap className="w-5 h-5 mr-3 text-[var(--accent)]" /> Early Access Features</li>
                </ul>
                <Button className="w-full bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/50">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[var(--primary)]/10 clip-path-slant"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-5xl font-black text-white mb-6">THE FUTURE IS NOW</h2>
          <p className="text-xl mb-12 text-gray-400">Join the movement. Transform your biology with technology.</p>
          <Link href="/register">
            <Button size="lg" variant="glow" className="text-lg px-12 h-16 rounded-full font-bold shadow-[0_0_40px_var(--primary-glow)]">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
