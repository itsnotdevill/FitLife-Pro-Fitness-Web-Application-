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
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gray-900 text-white py-20 px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-4"
                >
                    Meet Our Experts
                </motion.h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    World-class guidance from certified professionals who care about your success.
                </p>
            </section>

            <section className="py-16 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trainers.map((trainer, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="text-center overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="p-8 pb-0 flex justify-center">
                                    <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-green-100 mb-4">
                                        {/* Avatar Placeholder since external images might fail without Next.js config */}
                                        <div className="h-full w-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-gray-600">
                                            {trainer.name.charAt(0)}
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">{trainer.name}</h3>
                                    <p className="text-sm font-medium text-green-600 uppercase tracking-wide mb-4">{trainer.specialty}</p>
                                    <p className="text-gray-500 text-sm mb-6">{trainer.bio}</p>

                                    <div className="flex justify-center space-x-4 mb-6">
                                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><Twitter className="h-5 w-5" /></a>
                                        <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors"><Instagram className="h-5 w-5" /></a>
                                        <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors"><Linkedin className="h-5 w-5" /></a>
                                    </div>

                                    <Button variant="outline" className="w-full">View Profile</Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
