'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Dumbbell, User as UserIcon, LogOut, Activity } from 'lucide-react';
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
        <nav className="fixed w-full top-0 z-50 border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center group">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-violet-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                                <Activity className="relative h-8 w-8 text-white" />
                            </div>
                            <span className="ml-3 text-2xl font-black text-white tracking-widest font-mono">
                                ATHENA <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">CORE</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {['Home', 'About', 'Classes', 'Trainers'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full
                                    ${(pathname === '/' && item === 'Home') || pathname === `/${item.toLowerCase()}`
                                        ? 'bg-[var(--primary)] text-black shadow-[0_0_15px_var(--primary-glow)]'
                                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {item}
                            </Link>
                        ))}

                        <div className="flex items-center ml-4 space-x-3">
                            {user ? (
                                <>
                                    <span className="text-sm font-medium text-gray-300 mr-2">
                                        Hi, <span className="text-[var(--primary)]">{user.name}</span>
                                    </span>
                                    <Link href={user.role === 'admin' ? '/admin/dashboard' : user.role === 'trainer' ? '/trainer/dashboard' : '/dashboard'}>
                                        <Button variant="outline" size="sm" className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-black">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" size="sm" onClick={logout} className="text-gray-400 hover:text-red-500">
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">Login</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button variant="glow" size="sm" className="font-bold">Get Started</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[var(--surface-highlight)] focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-[var(--surface)] border-b border-[var(--glass-border)]">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {['Home', 'About', 'Classes', 'Trainers'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-[var(--primary)] hover:bg-[var(--surface-highlight)]"
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="pt-4 flex flex-col space-y-3 px-3">
                            {user ? (
                                <>
                                    <div className="text-sm text-gray-400">Signed in as <span className="text-white">{user.name}</span></div>
                                    <Link href={user.role === 'admin' ? '/admin/dashboard' : user.role === 'trainer' ? '/trainer/dashboard' : '/dashboard'}>
                                        <Button variant="outline" className="w-full justify-center">Dashboard</Button>
                                    </Link>
                                    <Button variant="ghost" className="w-full justify-start text-red-400" onClick={logout}>
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost" className="w-full justify-center text-gray-300">Login</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button variant="glow" className="w-full justify-center">Get Started</Button>
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
