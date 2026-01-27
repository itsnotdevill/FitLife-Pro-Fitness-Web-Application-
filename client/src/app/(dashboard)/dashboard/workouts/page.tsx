'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Plus, Calendar, Clock, Trophy, Trash2, X } from 'lucide-react';
import { API_BASE_URL } from '@/lib/utils';

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
        <div className="space-y-6 relative">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Workouts</h1>
                    <p className="text-gray-500">Track and manage your fitness journey.</p>
                </div>
                <Button className="flex items-center" onClick={() => setShowModal(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Log Workout
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                            <Trophy className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Workouts</p>
                            <h3 className="text-2xl font-bold">{totalWorkouts}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-4 bg-orange-100 rounded-full text-orange-600">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Minutes</p>
                            <h3 className="text-2xl font-bold">{totalDuration}m</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6 space-x-4">
                        <div className="p-4 bg-red-100 rounded-full text-red-600">
                            <Trophy className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Calories Burned</p>
                            <h3 className="text-2xl font-bold">{totalCalories}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* List */}
            <Card className="overflow-hidden">
                <CardHeader className="bg-gray-50/50 border-b">
                    <CardTitle>Recent History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-500">Loading workouts...</div>
                    ) : workouts.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No workouts logged yet. Start training!</div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Workout Name</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium">Duration</th>
                                    <th className="px-6 py-4 font-medium">Calories</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {workouts.map((workout) => (
                                    <tr key={workout._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{workout.name}</td>
                                        <td className="px-6 py-4 text-gray-500">{new Date(workout.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-gray-500">{workout.duration} mins</td>
                                        <td className="px-6 py-4 text-gray-500">{workout.calories} kcal</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {workout.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(workout._id)}
                                                className="text-red-500 hover:text-red-700 transition"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </CardContent>
            </Card>

            {/* Simple Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Log New Workout</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Workout Name</label>
                                <input
                                    required
                                    className="w-full border rounded-md p-2"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Morning Cardio"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Duration (mins)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full border rounded-md p-2"
                                        value={formData.duration}
                                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Calories</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full border rounded-md p-2"
                                        value={formData.calories}
                                        onChange={e => setFormData({ ...formData, calories: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full border rounded-md p-2"
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <Button type="submit" className="w-full mt-4">Save Workout</Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
