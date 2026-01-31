'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { API_BASE_URL } from '@/lib/utils';
import { User, Mail, Activity, Weight, Ruler, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
    const { user, login } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        height: '',
        heightUnit: 'cm',
        weight: '',
        weightUnit: 'kg',
        bodyType: 'None',
        fitnessGoals: [] as string[]
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const availableGoals = [
        'Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility',
        'HIIT', 'Yoga', 'Strength Training', 'Cardiovascular Health',
        'Athletic Performance', 'Stress Relief'
    ];

    useEffect(() => {
        if (user) {
            fetch(`${API_BASE_URL}/api/users/profile`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        name: data.name || '',
                        email: data.email || '',
                        age: data.profile?.age || '',
                        height: data.profile?.height || '',
                        heightUnit: data.profile?.heightUnit || 'cm',
                        weight: data.profile?.weight || '',
                        weightUnit: data.profile?.weightUnit || 'kg',
                        bodyType: data.profile?.bodyType || 'None',
                        fitnessGoals: data.fitnessGoals || []
                    });
                })
                .catch(err => console.error(err));
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleGoal = (goal: string) => {
        setFormData(prev => {
            const goals = prev.fitnessGoals.includes(goal)
                ? prev.fitnessGoals.filter(g => g !== goal)
                : [...prev.fitnessGoals, goal];
            return { ...prev, fitnessGoals: goals };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    profile: {
                        age: Number(formData.age),
                        height: Number(formData.height),
                        heightUnit: formData.heightUnit,
                        weight: Number(formData.weight),
                        weightUnit: formData.weightUnit,
                        bodyType: formData.bodyType
                    },
                    fitnessGoals: formData.fitnessGoals
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Update failed');

            // Update local user context
            const updatedUser = { ...data, token: user?.token };
            login(updatedUser);

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">My <span className="text-[var(--primary)]">Profile</span></h2>
                <p className="text-gray-400">Manage your neural identity and physical parameters.</p>
            </div>

            <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
                <CardHeader>
                    <CardTitle className="text-white flex items-center">
                        <User className="w-5 h-5 mr-2 text-[var(--primary)]" />
                        Personal Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {message.text && (
                            <div className={`p-4 rounded-lg text-sm border ${message.type === 'success'
                                ? 'bg-green-900/20 text-green-400 border-green-500/30'
                                : 'bg-red-900/20 text-red-400 border-red-500/30'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        {/* Personal Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Full Name</label>
                                <div className="relative">
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="pl-10"
                                        required
                                    />
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Email</label>
                                <div className="relative">
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="pl-10"
                                        required
                                    />
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                </div>
                            </div>
                        </div>

                        {/* Biometrics */}
                        <div className="pt-6 border-t border-[var(--glass-border)]">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <Activity className="w-5 h-5 mr-2 text-[var(--secondary)]" />
                                Biometrics
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Age</label>
                                    <Input
                                        name="age"
                                        type="number"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="Years"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Height</label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Input
                                                name="height"
                                                type="number"
                                                value={formData.height}
                                                onChange={handleChange}
                                                className="pl-10"
                                                placeholder={formData.heightUnit}
                                            />
                                            <Ruler className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                        </div>
                                        <select
                                            name="heightUnit"
                                            value={formData.heightUnit}
                                            onChange={handleChange}
                                            className="w-20 rounded-md border border-[var(--glass-border)] bg-[var(--surface-highlight)] text-white text-sm px-2 focus:ring-[var(--primary)] focus:outline-none"
                                        >
                                            <option value="cm">cm</option>
                                            <option value="ft">ft</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Weight</label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Input
                                                name="weight"
                                                type="number"
                                                value={formData.weight}
                                                onChange={handleChange}
                                                className="pl-10"
                                                placeholder={formData.weightUnit}
                                            />
                                            <Weight className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                        </div>
                                        <select
                                            name="weightUnit"
                                            value={formData.weightUnit}
                                            onChange={handleChange}
                                            className="w-20 rounded-md border border-[var(--glass-border)] bg-[var(--surface-highlight)] text-white text-sm px-2 focus:ring-[var(--primary)] focus:outline-none"
                                        >
                                            <option value="kg">kg</option>
                                            <option value="lbs">lbs</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Body Type</label>
                                    <select
                                        name="bodyType"
                                        value={formData.bodyType}
                                        onChange={handleChange}
                                        className="w-full h-10 rounded-md border border-[var(--glass-border)] bg-[var(--surface-highlight)] text-white text-sm px-3 focus:ring-[var(--primary)] focus:outline-none"
                                    >
                                        <option value="None">Select Type...</option>
                                        <option value="Ectomorph">Ectomorph (Lean)</option>
                                        <option value="Mesomorph">Mesomorph (Muscular)</option>
                                        <option value="Endomorph">Endomorph (Soft)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Fitness Goals */}
                        <div className="pt-6 border-t border-[var(--glass-border)]">
                            <label className="text-lg font-semibold text-white mb-4 block">Fitness Goals</label>
                            <div className="flex flex-wrap gap-3">
                                {availableGoals.map(goal => {
                                    const isSelected = formData.fitnessGoals.includes(goal);
                                    return (
                                        <button
                                            key={goal}
                                            type="button"
                                            onClick={() => toggleGoal(goal)}
                                            className={cn(
                                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-2",
                                                isSelected
                                                    ? "bg-[var(--primary)]/20 text-[var(--primary)] border-[var(--primary)] shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                                                    : "bg-[var(--surface-highlight)] text-gray-400 border-[var(--glass-border)] hover:bg-[var(--surface-highlight)]/80 hover:text-white"
                                            )}
                                        >
                                            {isSelected && <Check className="w-3 h-3" />}
                                            {goal}
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="text-xs text-gray-500 mt-3">Select all that apply to personalize your AI workout plans.</p>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" variant="glow" isLoading={isLoading} className="md:w-auto w-full">
                                Update System
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
