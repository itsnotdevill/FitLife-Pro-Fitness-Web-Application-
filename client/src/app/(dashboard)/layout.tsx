'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    LayoutDashboard,
    User,
    Calendar,
    LogOut,
    Menu,
    Dumbbell,
    ClipboardList,
    Users,
    Brain,
    Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { name: 'System Status', href: user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'trainer' ? '/trainer/dashboard' : '/dashboard', icon: LayoutDashboard },
        { name: 'Neural Profile', href: '/dashboard/profile', icon: User },
        { name: 'Neurofitness', href: '/dashboard/neuro', icon: Brain },
        // Role based items could be added here
        ...(user?.role === 'trainer' ? [
            { name: 'My Clients', href: '/trainer/clients', icon: Users },
            { name: 'Workout Plans', href: '/trainer/plans', icon: ClipboardList },
        ] : user?.role === 'admin' ? [
            { name: 'Manage Users', href: '/admin/users', icon: Users },
            { name: 'System Reports', href: '/admin/reports', icon: ClipboardList },
        ] : [
            { name: 'My Workouts', href: '/dashboard/workouts', icon: Dumbbell },
            { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
        ]),
    ];

    return (
        <div className="min-h-screen bg-[var(--background)] flex text-[var(--foreground)]">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-[var(--surface)]/90 backdrop-blur-xl border-r border-[var(--glass-border)] transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-center h-20 border-b border-[var(--glass-border)]">
                    <Link href="/" className="flex items-center group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-cyan-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                            <Dumbbell className="relative h-8 w-8 text-[var(--primary)]" />
                        </div>
                        <span className="ml-2 text-xl font-bold text-white tracking-wide">
                            FitLife <span className="text-[var(--primary)]">Pro</span>
                        </span>
                    </Link>
                </div>

                <div className="p-4 flex flex-col h-[calc(100vh-5rem)] justify-between">
                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                                        isActive
                                            ? "bg-[var(--primary)]/10 text-[var(--primary)] shadow-[0_0_10px_rgba(0,240,255,0.1)] border border-[var(--primary)]/20"
                                            : "text-gray-400 hover:bg-[var(--surface-highlight)] hover:text-white hover:border hover:border-white/5"
                                    )}
                                >
                                    <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-[var(--primary)]" : "text-gray-500 group-hover:text-white")} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-[var(--glass-border)] pt-4">
                        <div className="px-4 mb-4 space-y-4">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[var(--primary)] to-purple-500 flex items-center justify-center text-black font-bold text-sm ring-2 ring-[var(--primary)]/50 shadow-[0_0_15px_var(--primary)]">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <div className="ml-3 overflow-hidden">
                                    <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[10px] uppercase font-bold text-[var(--secondary)] tracking-wider border border-[var(--secondary)]/30 px-1.5 rounded bg-[var(--secondary)]/10">
                                            Lvl {user?.level || 1}
                                        </p>
                                        <p className="text-[10px] text-gray-400 capitalize">{user?.role}</p>
                                    </div>
                                </div>
                            </div>

                            {/* XP Progress */}
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                                    <span>XP</span>
                                    <span>{(user?.xp || 0) % 1000} / 1000</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className="h-full bg-gradient-to-r from-[var(--primary)] to-purple-500 shadow-[0_0_10px_var(--primary)] transition-all duration-1000 ease-out"
                                        style={{ width: `${((user?.xp || 0) % 1000) / 10}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-950/30 pl-4"
                            onClick={logout}
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[var(--background)]">
                {/* Mobile Header */}
                <header className="md:hidden bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--glass-border)] h-16 flex items-center px-4 justify-between sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-400 hover:text-white focus:outline-none"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="font-semibold text-white">Dashboard</span>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                <main className="flex-1 overflow-auto p-4 md:p-8 custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
}
