'use client';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Users, Target, Heart, Award } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6"
                    >
                        About FitLife Pro
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                    >
                        We are more than just a fitness app. We are a community dedicated to helping you become the best version of yourself.
                    </motion.p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                            At FitLife Pro, our mission is to democratize fitness education and management. We believe that everyone deserves access to professional-grade tools and guidance to achieve their health goals.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Founded in 2024, came from a simple idea: that technology can bridge the gap between intent and action. Today, we serve thousands of users, helping them track, analyze, and improve their fitness journey every single day.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <Card className="bg-green-50 border-none">
                            <CardContent className="p-6 text-center">
                                <Target className="h-10 w-10 text-green-600 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900">Focus</h3>
                                <p className="text-sm text-gray-500">Laser-focused on your results.</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-blue-50 border-none">
                            <CardContent className="p-6 text-center">
                                <Heart className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900">Passion</h3>
                                <p className="text-sm text-gray-500">Driven by love for health.</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-purple-50 border-none">
                            <CardContent className="p-6 text-center">
                                <Users className="h-10 w-10 text-purple-600 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900">Community</h3>
                                <p className="text-sm text-gray-500">Stronger together.</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-orange-50 border-none">
                            <CardContent className="p-6 text-center">
                                <Award className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                                <h3 className="font-bold text-gray-900">Excellence</h3>
                                <p className="text-sm text-gray-500">Top-tier quality always.</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
