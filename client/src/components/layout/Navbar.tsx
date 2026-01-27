'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Dumbbell, User as UserIcon, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();

    // Hide Navbar on dashboard routes, but keep it for the public /trainers page
    // We check for /trainer/ (with slash) to target the dashboard sub-routes, 
    // or exact match /trainer if that exists as a dashboard root.
    if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin') || (pathname?.startsWith('/trainer') && pathname !== '/trainers')) {
        return null;
    }

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Dumbbell className="h-8 w-8 text-green-600" />
                            <span className="ml-2 text-2xl font-bold text-gray-900">FitLife Pro</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/" className="text-gray-700 hover:text-green-600 px-3 py-2 font-medium transition-colors">Home</Link>
                        <Link href="/about" className="text-gray-700 hover:text-green-600 px-3 py-2 font-medium transition-colors">About</Link>
                        <Link href="/classes" className="text-gray-700 hover:text-green-600 px-3 py-2 font-medium transition-colors">Classes</Link>
                        <Link href="/trainers" className="text-gray-700 hover:text-green-600 px-3 py-2 font-medium transition-colors">Trainers</Link>
                        <div className="flex items-center ml-4 space-x-2">
                            {user ? (
                                <>
                                    <span className="text-sm font-medium text-gray-700 mr-2">Hello, {user.name}</span>
                                    <Link href={user.role === 'admin' ? '/admin/dashboard' : user.role === 'trainer' ? '/trainer/dashboard' : '/dashboard'}>
                                        <Button variant="outline" size="sm">Dashboard</Button>
                                    </Link>
                                    <Button variant="ghost" size="sm" onClick={logout}>
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost" size="sm">Login</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button size="sm">Get Started</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b">
                        <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">Home</Link>
                        <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">About</Link>
                        <Link href="/classes" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50">Classes</Link>
                        <div className="pt-4 flex flex-col space-y-2">
                            {user ? (
                                <>
                                    <div className="px-3 py-2 text-base font-medium text-gray-500">Signed in as {user.name}</div>
                                    <Link href={user.role === 'admin' ? '/admin/dashboard' : user.role === 'trainer' ? '/trainer/dashboard' : '/dashboard'}>
                                        <Button variant="outline" className="w-full justify-start">Dashboard</Button>
                                    </Link>
                                    <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost" className="w-full justify-start">Login</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button className="w-full">Get Started</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
