'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { API_BASE_URL } from '@/lib/utils';
import { Plus, Trash2, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NutritionLog {
    _id: string;
    mealType: string;
    foodItem: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    date: string;
}

export default function NutritionPage() {
    const { user } = useAuth();
    const [logs, setLogs] = useState<NutritionLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        mealType: 'Breakfast',
        foodItem: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: ''
    });

    useEffect(() => {
        if (user) {
            fetchLogs();
        }
    }, [user]);

    const fetchLogs = async () => {
        // Mock data if API fails or for demo
        const mockLogs: NutritionLog[] = [
            { _id: '1', mealType: 'Breakfast', foodItem: 'Oatmeal & Berries', calories: 350, protein: 12, carbs: 60, fats: 6, date: new Date().toISOString() },
            { _id: '2', mealType: 'Lunch', foodItem: 'Grilled Chicken Salad', calories: 450, protein: 45, carbs: 15, fats: 20, date: new Date().toISOString() },
        ];

        if (!user) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/nutrition`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            const data = await res.json();
            if (res.ok) setLogs(data);
            else setLogs(mockLogs); // Fallback to mock if API not ready
        } catch (error) {
            console.error('Failed to fetch nutrition logs', error);
            setLogs(mockLogs); // Fallback
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/api/nutrition`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                fetchLogs();
                setFormData({
                    mealType: 'Breakfast',
                    foodItem: '',
                    calories: '',
                    protein: '',
                    carbs: '',
                    fats: ''
                });
            }
        } catch (error) {
            console.error('Failed to add log', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/nutrition/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            if (res.ok) {
                setLogs(logs.filter(log => log._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete log', error);
        }
    };

    const totalCalories = logs.reduce((acc, log) => acc + log.calories, 0);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Nutrition <span className="text-[var(--secondary)]">Tracker</span></h1>
                <p className="text-gray-400">Monitor your fuel intake for optimal performance.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-300">Daily Calories</CardTitle>
                        <Utensils className="h-4 w-4 text-[var(--secondary)]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{totalCalories}</div>
                        <p className="text-xs text-gray-500">kcal consumed today</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
                    <CardHeader>
                        <CardTitle className="text-white">Log a Meal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Meal Type</label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-[var(--glass-border)] bg-[var(--surface-highlight)] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] transition-all"
                                        value={formData.mealType}
                                        onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
                                    >
                                        <option className="bg-[var(--surface)]">Breakfast</option>
                                        <option className="bg-[var(--surface)]">Lunch</option>
                                        <option className="bg-[var(--surface)]">Dinner</option>
                                        <option className="bg-[var(--surface)]">Snack</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Food Item</label>
                                    <Input
                                        type="text"
                                        value={formData.foodItem}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, foodItem: e.target.value })}
                                        required
                                        placeholder="e.g. Chicken Breast"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Cals</label>
                                    <Input
                                        type="number"
                                        value={formData.calories}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, calories: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Prot (g)</label>
                                    <Input
                                        type="number"
                                        value={formData.protein}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, protein: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Carbs (g)</label>
                                    <Input
                                        type="number"
                                        value={formData.carbs}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, carbs: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Fats (g)</label>
                                    <Input
                                        type="number"
                                        value={formData.fats}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, fats: e.target.value })}
                                    />
                                </div>
                            </div>
                            <Button type="submit" variant="glow" className="w-full">
                                <Plus className="mr-2 h-4 w-4" /> Add Log
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Logs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {logs.map((log) => (
                                <div key={log._id} className="flex items-center justify-between p-4 border border-[var(--glass-border)] rounded-lg bg-[var(--surface-highlight)]/10 hover:bg-[var(--surface-highlight)]/30 transition-colors">
                                    <div>
                                        <p className="font-medium text-white">{log.foodItem}</p>
                                        <p className="text-sm text-gray-400">{log.mealType} • <span className="text-[var(--secondary)]">{log.calories} kcal</span></p>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(log._id)} className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            {logs.length === 0 && (
                                <p className="text-center text-gray-500">No logs yet.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
