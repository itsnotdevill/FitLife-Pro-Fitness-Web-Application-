'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { API_BASE_URL } from '@/lib/utils';

export default function ProfilePage() {
    const { user, login } = useAuth(); // login here acts as updateUser in context usually, but we might need to refactor context or just re-login to update state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        height: '',
        weight: '',
        fitnessGoals: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

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
                        weight: data.profile?.weight || '',
                        fitnessGoals: data.fitnessGoals ? data.fitnessGoals.join(', ') : ''
                    });
                })
                .catch(err => console.error(err));
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                        weight: Number(formData.weight)
                    },
                    fitnessGoals: formData.fitnessGoals.split(',').map(g => g.trim()).filter(g => g)
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
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <p className="text-sm text-gray-500">Update your personal information and fitness goals.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {message.text && (
                            <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Age</label>
                                <input
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Height (cm)</label>
                                <input
                                    name="height"
                                    type="number"
                                    value={formData.height}
                                    onChange={handleChange}
                                    className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Weight (kg)</label>
                                <input
                                    name="weight"
                                    type="number"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Fitness Goals (comma separated)</label>
                            <textarea
                                name="fitnessGoals"
                                value={formData.fitnessGoals}
                                onChange={handleChange}
                                rows={3}
                                placeholder="e.g. Weight Loss, Muscle Gain, Marathon Training"
                                className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            />
                        </div>

                        <Button type="submit" isLoading={isLoading}>
                            Save Changes
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
