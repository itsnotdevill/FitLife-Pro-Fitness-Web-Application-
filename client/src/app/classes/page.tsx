'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, Users, Zap } from 'lucide-react';

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
            image: "https://images.unsplash.com/photo-1588286840104-e5ac77b90621?q=80&w=1000&auto=format&fit=crop"
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
        <div className="min-h-screen bg-gray-50">
            <section className="bg-gray-900 text-white py-20 px-4 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-4"
                >
                    Our Classes
                </motion.h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    From high-energy cardio to restorative yoga, we have a class for every goal and every mood.
                </p>
            </section>

            <section className="py-16 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {classes.map((cls, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-gray-200 relative overflow-hiddenGroup">
                                    <img
                                        src={cls.image}
                                        alt={cls.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 uppercase shadow-sm">
                                        {cls.intensity} Intensity
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle>{cls.title}</CardTitle>
                                    <div className="text-sm text-gray-500 flex items-center gap-4 mt-2">
                                        <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {cls.time}</span>
                                        <span className="flex items-center"><Users className="h-4 w-4 mr-1" /> {cls.instructor}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-gray-600 text-sm leading-relaxed">{cls.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">Book Class</Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
