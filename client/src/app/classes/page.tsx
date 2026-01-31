'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, Users, Zap, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export default function ClassesPage() {
    const classes = [
        {
            title: "High Intensity Interval Training",
            instructor: "Sarah Connors",
            time: "45 mins",
            intensity: "High",
            description: "Burn calories fast with our signature HIIT class. A mix of cardio and strength exercises designed to push your limits.",
            image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Power Yoga Flow",
            instructor: "Emily Chen",
            time: "60 mins",
            intensity: "Medium",
            description: "Find your balance and build core strength. This dynamic vinyasa flow moves with breath to energize your body and mind.",
            image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Strength & Conditioning",
            instructor: "Mike Ross",
            time: "50 mins",
            intensity: "High",
            description: "Build muscle and improve functional strength. We use barbells, dumbbells, and bodyweight movements for a full-body pump.",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Spin & Cycle",
            instructor: "David Miller",
            time: "45 mins",
            intensity: "High",
            description: "Ride to the rhythm in our immersive cycle studio. Climb hills and sprint flats for an incredible cardiovascular workout.",
            image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Pilates Core",
            instructor: "Jessica Suits",
            time: "40 mins",
            intensity: "Low",
            description: "Strengthen your core and improve posture with controlled movements. suitable for all fitness levels.",
            image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Box & Kick",
            instructor: "Alex T.",
            time: "55 mins",
            intensity: "High",
            description: "Unleash your inner fighter. Learn boxing techniques while getting a full-body conditioning workout.",
            image: "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1000&auto=format&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--background)] text-white">
            {/* Hero Section */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-[var(--background)] -z-10"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold tracking-wider uppercase backdrop-blur-md"
                    >
                        Neural Upgrade Protocols
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
                    >
                        MASTER YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">PHYSIOLOGY</span>
                    </motion.h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Data-driven group sessions designed to optimize metabolic output and neural adaptation.
                    </p>

                    {/* Search/Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-3xl mx-auto bg-[var(--surface)] border border-[var(--glass-border)] rounded-full p-2 flex items-center shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                    >
                        <Search className="ml-4 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Find a protocol..."
                            className="bg-transparent border-none focus:ring-0 text-white flex-1 px-4 placeholder:text-gray-600 outline-none"
                        />
                        <Button variant="glow" size="sm" className="rounded-full px-6">
                            Search
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Classes Grid */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {classes.map((cls, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col overflow-hidden bg-[var(--surface)] border-[var(--glass-border)] hover:border-[var(--primary)] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 group">
                                <div className="h-56 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                    <img
                                        src={cls.image}
                                        alt={cls.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 ${cls.intensity === 'High' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                                cls.intensity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                                    'bg-green-500/20 text-green-400 border-green-500/30'
                                            }`}>
                                            {cls.intensity} Intensity
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary)] transition-colors">{cls.title}</h3>
                                    </div>
                                </div>
                                <CardContent className="flex-1 pt-6">
                                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1.5 text-[var(--secondary)]" />
                                            {cls.time}
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-1.5 text-[var(--secondary)]" />
                                            {cls.instructor}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed border-t border-[var(--glass-border)] pt-4">
                                        {cls.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="pb-6">
                                    <Button variant="outline" className="w-full border-[var(--primary)]/30 hover:bg-[var(--primary)] hover:text-black hover:border-[var(--primary)] transition-all text-[var(--primary)]">
                                        Reserve Spot
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
