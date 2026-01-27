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
    X,
    Dumbbell,
    ClipboardList,
    Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Overview', href: user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'trainer' ? '/trainer/dashboard' : '/dashboard', icon: LayoutDashboard },
        { name: 'Profile', href: '/dashboard/profile', icon: User },
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
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-center h-16 border-b">
                    <Link href="/" className="flex items-center">
                        <Dumbbell className="h-8 w-8 text-green-600" />
                        <span className="ml-2 text-xl font-bold text-gray-900">FitLife Pro</span>
                    </Link>
                </div>

                <div className="p-4 flex flex-col h-[calc(100vh-4rem)] justify-between">
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                                        isActive
                                            ? "bg-green-50 text-green-700"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t pt-4">
                        <div className="flex items-center px-4 mb-4">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={logout}
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white shadow-sm h-16 flex items-center px-4 justify-between">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="font-semibold text-gray-900">Dashboard</span>
                    <div className="w-6" /> {/* Spacer for centering if needed */}
                </header>

                <main className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
