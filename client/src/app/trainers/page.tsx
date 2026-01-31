'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

export default function TrainersPage() {
    const trainers = [
        {
            name: "Mike Ross",
            specialty: "Bodybuilding & Strength",
            bio: "With over 10 years of experience in competitive bodybuilding, Mike knows exactly what it takes to build serious muscle and strength.",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            name: "Sarah Connors",
            specialty: "HIIT & Weight Loss",
            bio: "Sarah specializes in high-energy transformation. Her clients typically lose 10-15lbs in their first month through her specialized metabolic conditioning.",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            name: "Emily Chen",
            specialty: "Yoga & Mobility",
            bio: "Emily brings a holistic approach to fitness. She combines strength with flexibility to ensure a pain-free, functional body for life.",
            image: "https://randomuser.me/api/portraits/women/65.jpg"
        },
        {
            name: "David Miller",
            specialty: "Endurance & Cycling",
            bio: "An ex-professional cyclist, David coaches athletes to improve their stamina and cardiovascular health through science-based training.",
            image: "https://randomuser.me/api/portraits/men/85.jpg"
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <section className="relative py-24 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[var(--primary)]/5"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"></div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-5xl md:text-7xl font-bold mb-6 text-white"
                >
                    ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">MENTORS</span>
                </motion.h1>
                <p className="relative z-10 text-xl text-gray-400 max-w-2xl mx-auto">
                    Access the neural patterns of world-class professionals.
                </p>
            </section>

            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trainers.map((trainer, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="text-center overflow-hidden hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 hover:-translate-y-2 border-[var(--glass-border)] bg-[var(--surface)] group">
                                <div className="p-8 pb-0 flex justify-center relative">
                                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-[var(--primary)] mb-4 relative z-10 p-1">
                                        <div className="h-full w-full rounded-full bg-gray-600 flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
                                            {/* Using a solid color fallback if image fails, or the character */}
                                            {trainer.image ? (
                                                <img src={trainer.image} alt={trainer.name} className="h-full w-full object-cover" />
                                            ) : (
                                                trainer.name.charAt(0)
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-6 relative z-10">
                                    <h3 className="text-xl font-bold text-white mb-1">{trainer.name}</h3>
                                    <p className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider mb-4">{trainer.specialty}</p>
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed bg-[var(--surface-highlight)]/50 p-3 rounded-lg border border-white/5">{trainer.bio}</p>

                                    <div className="flex justify-center space-x-4 mb-6">
                                        <a href="#" className="text-gray-500 hover:text-[var(--primary)] transition-colors"><Twitter className="h-5 w-5" /></a>
                                        <a href="#" className="text-gray-500 hover:text-[#E1306C] transition-colors"><Instagram className="h-5 w-5" /></a>
                                        <a href="#" className="text-gray-500 hover:text-[#0077B5] transition-colors"><Linkedin className="h-5 w-5" /></a>
                                    </div>

                                    <Button variant="outline" className="w-full border-[var(--glass-border)] hover:border-[var(--primary)] hover:text-[var(--primary)]">View Protocol</Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
