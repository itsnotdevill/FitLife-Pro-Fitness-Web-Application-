import Link from 'next/link';
import { Dumbbell, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Dumbbell className="h-8 w-8 text-green-500" />
                            <span className="ml-2 text-2xl font-bold text-white">FitLife Pro</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            Empowering you to achieve your fitness goals with cutting-edge tools and expert guidance. Join the revolution today.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-green-500 transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-green-500 transition-colors">About Us</Link></li>
                            <li><Link href="/classes" className="hover:text-green-500 transition-colors">Classes</Link></li>
                            <li><Link href="/trainers" className="hover:text-green-500 transition-colors">Trainers</Link></li>
                            <li><Link href="/pricing" className="hover:text-green-500 transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><Link href="/faq" className="hover:text-green-500 transition-colors">FAQ</Link></li>
                            <li><Link href="/contact" className="hover:text-green-500 transition-colors">Contact Us</Link></li>
                            <li><Link href="/terms" className="hover:text-green-500 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-green-500 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                <span>123 Fitness Blvd, Wellness City, WC 54321</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-green-500 mr-2" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-green-500 mr-2" />
                                <span>support@fitlifepro.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} FitLife Pro. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-500 mt-2 md:mt-0">
                        Made with ❤️ for Fitness Enthusiasts
                    </p>
                </div>
            </div>
        </footer>
    );
}
