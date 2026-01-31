'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Plus, Clock, Trophy, Trash2, X, Flame } from 'lucide-react';
import { API_BASE_URL } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Workout {
    _id: string;
    name: string;
    date: string;
    duration: number;
    calories: number;
    status: string;
}

export default function WorkoutsPage() {
    const { user } = useAuth();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        duration: '',
        calories: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (user) {
            fetchWorkouts();
        }
    }, [user]);

    const fetchWorkouts = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/workouts`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                setWorkouts(data);
            }
        } catch (error) {
            console.error('Error fetching workouts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this workout?')) return;
        try {
            await fetch(`${API_BASE_URL}/api/workouts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });
            setWorkouts(workouts.filter(w => w._id !== id));
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
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
                setWorkouts([newWorkout, ...workouts]);
                setShowModal(false);
                setFormData({
                    name: '',
                    duration: '',
                    calories: '',
                    date: new Date().toISOString().split('T')[0]
                });
            }
        } catch (error) {
            console.error('Error creating workout:', error);
        }
    };

    // Calculate stats
    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((acc, curr) => acc + curr.duration, 0);
    const totalCalories = workouts.reduce((acc, curr) => acc + curr.calories, 0);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My <span className="text-[var(--primary)]">Workouts</span></h1>
                    <p className="text-gray-400">Track and manage your fitness journey.</p>
                </div>
                <Button variant="glow" className="flex items-center" onClick={() => setShowModal(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Log Workout
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-4 bg-[var(--primary)]/10 rounded-full text-[var(--primary)] border border-[var(--primary)]/20 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                            <Trophy className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">Total Workouts</p>
                            <h3 className="text-2xl font-bold text-white">{totalWorkouts}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-4 bg-[var(--secondary)]/10 rounded-full text-[var(--secondary)] border border-[var(--secondary)]/20 shadow-[0_0_10px_rgba(57,255,20,0.2)]">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">Total Minutes</p>
                            <h3 className="text-2xl font-bold text-white">{totalDuration}m</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-4 bg-[var(--accent)]/10 rounded-full text-[var(--accent)] border border-[var(--accent)]/20 shadow-[0_0_10px_rgba(255,0,255,0.2)]">
                            <Flame className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-400">Calories Burned</p>
                            <h3 className="text-2xl font-bold text-white">{totalCalories}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* List */}
            <Card className="overflow-hidden bg-[var(--surface)] border-[var(--glass-border)]">
                <CardHeader className="border-b border-[var(--glass-border)] bg-[var(--surface-highlight)]/20">
                    <CardTitle className="text-white">Recent History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-400">Loading workouts...</div>
                    ) : workouts.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">No workouts logged yet. Start training!</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-400 uppercase bg-[var(--surface-highlight)]/50 border-b border-[var(--glass-border)]">
                                    <tr>
                                        <th className="px-6 py-4 font-medium text-[var(--primary)]">Workout Name</th>
                                        <th className="px-6 py-4 font-medium">Date</th>
                                        <th className="px-6 py-4 font-medium">Duration</th>
                                        <th className="px-6 py-4 font-medium">Calories</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--glass-border)]">
                                    {workouts.map((workout) => (
                                        <tr key={workout._id} className="hover:bg-[var(--surface-highlight)]/30 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">{workout.name}</td>
                                            <td className="px-6 py-4 text-gray-400">{new Date(workout.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-gray-400">{workout.duration} mins</td>
                                            <td className="px-6 py-4 text-gray-400">{workout.calories} kcal</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--secondary)]/10 text-[var(--secondary)] border border-[var(--secondary)]/30">
                                                    {workout.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(workout._id)}
                                                    className="text-red-500 hover:text-red-400 transition hover:bg-red-500/10 p-2 rounded-full"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md bg-[var(--surface)] border-[var(--primary)] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-[var(--glass-border)] pb-4">
                            <CardTitle className="text-xl font-bold text-white">Log New Workout</CardTitle>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition">
                                <X className="h-6 w-6" />
                            </button>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleCreate} className="space-y-4">
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
                                    <label className="text-sm font-medium text-gray-300">Date</label>
                                    <Input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <Button type="submit" variant="glow" className="w-full mt-4">Save Workout</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
