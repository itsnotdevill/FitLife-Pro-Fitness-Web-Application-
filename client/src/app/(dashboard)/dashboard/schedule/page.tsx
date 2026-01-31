'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ChevronLeft, ChevronRight, Plus, X, Trash2, Loader2 } from 'lucide-react';
import { cn, API_BASE_URL } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface Workout {
    _id: string;
    name: string;
    date: string;
    duration: number;
    calories: number;
    status: string;
}

export default function SchedulePage() {
    const { user } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        duration: '',
        calories: '',
        date: '',
        status: 'Pending'
    });

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = ['06:00 AM', '08:00 AM', '10:00 AM', '12:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'];

    const colorVariants = [
        'bg-[var(--primary)]/20 text-[var(--primary)] border-[var(--primary)]/40 shadow-[0_0_10px_rgba(0,240,255,0.15)]',
        'bg-[var(--secondary)]/20 text-[var(--secondary)] border-[var(--secondary)]/40 shadow-[0_0_10px_rgba(57,255,20,0.15)]',
        'bg-[var(--accent)]/20 text-[var(--accent)] border-[var(--accent)]/40 shadow-[0_0_10px_rgba(255,0,255,0.15)]',
        'bg-red-500/20 text-red-500 border-red-500/40 shadow-[0_0_10px_rgba(255,0,0,0.15)]'
    ];

    useEffect(() => {
        if (user) {
            fetchWorkouts();
        } else {
            setWorkouts([]);
            setIsLoading(false);
        }
    }, [user]);

    const fetchWorkouts = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/workouts`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            const data = await res.json();
            if (res.ok) {
                // Filter specifically for Pending items or visually show all? 
                // Context implies Schedule = Future/Planned. We filter for Pending.
                setWorkouts(data.filter((w: Workout) => w.status === 'Pending'));
            }
        } catch (error) {
            console.error('Error fetching workouts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateWorkout = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/workouts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const newWorkout = await res.json();
                setWorkouts([...workouts, newWorkout]);
                setIsModalOpen(false);
                setFormData({
                    name: '',
                    duration: '',
                    calories: '',
                    date: '',
                    status: 'Pending'
                });
            }
        } catch (error) {
            console.error('Error creating scheduled workout:', error);
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this scheduled workout?')) return;
        try {
            await fetch(`${API_BASE_URL}/api/workouts/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            setWorkouts(workouts.filter(w => w._id !== id));
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    // Date Helpers
    const getStartOfWeek = (date: Date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(d.setDate(diff));
        monday.setHours(0, 0, 0, 0);
        return monday;
    };

    const startOfWeek = getStartOfWeek(currentDate);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // Sunday

    // Filter workouts for current week
    const weekWorkouts = workouts.filter(w => {
        const wDate = new Date(w.date);
        // Include end of week fully
        const endOfWeeklimit = new Date(endOfWeek);
        endOfWeeklimit.setHours(23, 59, 59, 999);
        return wDate >= startOfWeek && wDate <= endOfWeeklimit;
    });

    const getEvent = (dayName: string, timeSlot: string) => {
        // dayName provided is "Monday", "Tuesday"...
        // timeSlot is "06:00 AM"

        const slotHour = parseInt(timeSlot.split(':')[0]);
        const isPM = timeSlot.includes('PM');
        const hour24 = (slotHour === 12) ? (isPM ? 12 : 0) : (isPM ? slotHour + 12 : slotHour);

        return weekWorkouts.find(w => {
            const wDate = new Date(w.date);
            // Translate JS getDay (0=Sun, 1=Mon) to our dayName
            const dayIndex = wDate.getDay();
            const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // 0=Mon, 6=Sun
            const wDayName = days[adjustedIndex];

            const wHour = wDate.getHours();

            // Match day and strict time slot (within 2 hour window)
            return wDayName === dayName && wHour >= hour24 && wHour < hour24 + 2;
        });
    };

    const handleSlotClick = (dayIndex: number, timeSlot: string) => {
        // Calculate the Date for this slot
        const slotDate = new Date(startOfWeek);
        slotDate.setDate(slotDate.getDate() + dayIndex);

        const slotHour = parseInt(timeSlot.split(':')[0]);
        const isPM = timeSlot.includes('PM');
        const hour24 = (slotHour === 12) ? (isPM ? 12 : 0) : (isPM ? slotHour + 12 : slotHour);

        slotDate.setHours(hour24, 0, 0, 0);

        // Format for datetime-local input: YYYY-MM-DDTHH:mm
        // Manual formatting to ensure local time is preserved
        const y = slotDate.getFullYear();
        const m = String(slotDate.getMonth() + 1).padStart(2, '0');
        const d = String(slotDate.getDate()).padStart(2, '0');
        const h = String(slotDate.getHours()).padStart(2, '0');
        const min = String(slotDate.getMinutes()).padStart(2, '0');

        setFormData({
            ...formData,
            date: `${y}-${m}-${d}T${h}:${min}`,
            status: 'Pending'
        });
        setIsModalOpen(true);
    };

    const changeWeek = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        setCurrentDate(newDate);
    };

    const formatDateRange = (start: Date, end: Date) => {
        const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        return `${start.toLocaleDateString('en-US', opts)} - ${end.toLocaleDateString('en-US', opts)}`;
    };

    const getCardColor = (name: string) => {
        // Simple hash logic for consistent color
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colorVariants[Math.abs(hash) % colorVariants.length];
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Weekly <span className="text-[var(--primary)]">Schedule</span></h1>
                    <p className="text-gray-400">Plan your week for maximum performance.</p>
                </div>
                <div className="flex space-x-2 items-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => changeWeek('prev')}
                        className="h-8 w-8 p-0 border-[var(--glass-border)] text-white hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="flex items-center px-4 py-1.5 font-medium text-white bg-[var(--surface-highlight)] border border-[var(--glass-border)] rounded-md">
                        {formatDateRange(startOfWeek, endOfWeek)}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => changeWeek('next')}
                        className="h-8 w-8 p-0 border-[var(--glass-border)] text-white hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Card className="overflow-x-auto bg-[var(--surface)] border-[var(--glass-border)]">
                <CardContent className="p-0 min-w-[800px]">
                    <div className="grid grid-cols-8 border-b border-[var(--glass-border)] bg-[var(--surface-highlight)]/30">
                        <div className="p-4 font-medium text-gray-400 text-sm border-r border-[var(--glass-border)]">Time</div>
                        {days.map(day => (
                            <div key={day} className="p-4 font-bold text-white text-center border-r border-[var(--glass-border)] last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20 text-gray-400">
                            <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)] mr-2" />
                            Loading schedule...
                        </div>
                    ) : (
                        timeSlots.map(time => (
                            <div key={time} className="grid grid-cols-8 border-b border-[var(--glass-border)] last:border-b-0 h-28">
                                <div className="p-3 text-xs font-medium text-gray-400 border-r border-[var(--glass-border)] bg-[var(--surface-highlight)]/10 flex items-center justify-center">
                                    {time}
                                </div>
                                {days.map((day, dayIndex) => {
                                    const event = getEvent(day, time);
                                    return (
                                        <div key={`${day}-${time}`} className="border-r border-[var(--glass-border)] last:border-r-0 p-1 relative group hover:bg-[var(--surface-highlight)]/20 transition-colors">
                                            {event ? (
                                                <div className={cn("h-full w-full rounded-md p-2 text-xs border cursor-pointer hover:shadow-md transition-all backdrop-blur-sm relative", getCardColor(event.name))}>
                                                    <div className="font-bold text-sm mb-1 truncate">{event.name}</div>
                                                    <div className="opacity-80 font-medium">{event.duration} min</div>

                                                    {/* Delete Action */}
                                                    <button
                                                        onClick={(e) => handleDelete(e, event._id)}
                                                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-black/40 rounded-full text-white hover:text-red-400"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleSlotClick(dayIndex, time)}
                                                        className="h-8 w-8 rounded-full p-0 bg-[var(--primary)]/10 hover:bg-[var(--primary)] hover:text-black text-[var(--primary)]"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md bg-[var(--surface)] border-[var(--primary)] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-[var(--glass-border)] pb-4">
                            <CardTitle className="text-xl font-bold text-white">Schedule Workout</CardTitle>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition">
                                <X className="h-6 w-6" />
                            </button>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleCreateWorkout} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Workout Name</label>
                                    <Input
                                        required
                                        value={formData.name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Morning Cardio"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Duration (mins)</label>
                                        <Input
                                            type="number"
                                            required
                                            value={formData.duration}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, duration: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Calories</label>
                                        <Input
                                            type="number"
                                            required
                                            value={formData.calories}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, calories: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Date & Time</label>
                                    <Input
                                        type="datetime-local"
                                        required
                                        value={formData.date}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <Button type="submit" variant="glow" className="w-full mt-4">Save to Schedule</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
