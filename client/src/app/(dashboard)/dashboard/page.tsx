'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Dumbbell, Flame, TrendingUp, Calendar, Zap, Activity, Brain, User as UserIcon, Battery, CheckCircle, Shield } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const { user } = useAuth();

    // Mock Data for "Futuristic" graphs
    const data = [
        { name: 'Mon', calories: 2400, intensity: 65, recovery: 80 },
        { name: 'Tue', calories: 1398, intensity: 40, recovery: 90 },
        { name: 'Wed', calories: 9800, intensity: 90, recovery: 60 },
        { name: 'Thu', calories: 3908, intensity: 55, recovery: 85 },
        { name: 'Fri', calories: 4800, intensity: 70, recovery: 75 },
        { name: 'Sat', calories: 3800, intensity: 45, recovery: 95 },
        { name: 'Sun', calories: 4300, intensity: 60, recovery: 82 },
    ];

    const recoveryScore = user?.profile?.recoveryScore || 92;
    const bodyType = user?.profile?.bodyType || 'Not Scanned';

    // Default quests if none (Mock for display if empty context)
    const quests = user?.dailyQuests && user.dailyQuests.length > 0 ? user.dailyQuests : [
        { title: 'Morning Protocol: 10m Meditation', xp: 50, type: 'Mind', completed: false },
        { title: 'Hydration: 2L Water Intake', xp: 30, type: 'Recovery', completed: true },
        { title: 'Strength: Complete Upper PUSH', xp: 100, type: 'Physique', completed: false }
    ];

    const [optimizationResult, setOptimizationResult] = useState<any>(null);
    const [loadingAI, setLoadingAI] = useState(false);
    const [showHealthModal, setShowHealthModal] = useState(false);
    const [healthData, setHealthData] = useState({
        sleepHours: '',
        sleepQualityScore: '',
        stressLevel: '',
        heartRateResting: '',
        readinessToTrain: ''
    });
    const [simMode, setSimMode] = useState<'CURRENT' | 'FUTURE'>('CURRENT');

    const handleOptimize = async () => {
        setLoadingAI(true);
        try {
            const res = await fetch('http://localhost:5000/api/ai/optimize', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (data.status === 'SUCCESS') {
                setOptimizationResult(data.optimization);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAI(false);
        }
    };

    const handleHealthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/health', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(healthData)
            });
            if (res.ok) {
                alert('Biometrics Logged Successfully!');
                setShowHealthModal(false);
                setHealthData({
                    sleepHours: '',
                    sleepQualityScore: '',
                    stressLevel: '',
                    heartRateResting: '',
                    readinessToTrain: ''
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-8 p-6 bg-[var(--background)] min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-white mb-2 flex items-center">
                        ATHENA <span className="text-violet-500 mx-2">CORE</span> STATUS
                    </h2>
                    <p className="text-gray-400">Welcome, Architect <span className="text-white font-bold">{user ? user.name.split(' ')[0] : 'Guest'}</span>. System optimizations ready.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="outline" onClick={() => setShowHealthModal(true)}>
                        <Activity className="w-4 h-4 mr-2" />
                        Log Biometrics
                    </Button>
                    <div className="flex items-center space-x-2 bg-violet-900/10 px-4 py-2 rounded-full border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
                        </span>
                        <span className="text-sm font-bold text-violet-200 tracking-wide">NEURAL LINK: STABLE</span>
                    </div>
                </div>
            </div>

            {/* AI Optimization Overlay (If Active) */}
            {optimizationResult && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-xl border ${optimizationResult.visualMode === 'RED' ? 'bg-red-900/20 border-red-500/50' :
                        optimizationResult.visualMode === 'PURPLE' ? 'bg-violet-900/20 border-violet-500/50' :
                            'bg-green-900/20 border-green-500/50'
                        } flex items-center justify-between backdrop-blur-md`}
                >
                    <div>
                        <h3 className={`text-lg font-bold ${optimizationResult.visualMode === 'RED' ? 'text-red-400' :
                            optimizationResult.visualMode === 'PURPLE' ? 'text-violet-400' :
                                'text-green-400'
                            } flex items-center`}>
                            <Brain className="w-5 h-5 mr-2" /> AI INTERVENTION: {optimizationResult.decision}
                        </h3>
                        <p className="text-white mt-1 text-sm">{optimizationResult.adjustment}</p>
                        <p className="text-xs text-gray-400 mt-2 font-mono uppercase">REASON: {optimizationResult.reason}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => setOptimizationResult(null)}>DISMISS</Button>
                </motion.div>
            )}

            {/* Futuristic Hero Section: Digital Twin & Recovery */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* AI Recovery Engine */}
                <Card className="md:col-span-2 bg-gradient-to-br from-[var(--surface)] to-green-900/10 border-[var(--glass-border)] relative overflow-hidden group">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--secondary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[var(--secondary)]/20 transition-all duration-700"></div>

                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-lg font-bold text-white flex items-center">
                            <Battery className="w-5 h-5 mr-2 text-[var(--secondary)]" />
                            AI Recovery Engine
                        </CardTitle>
                        <span className="text-xs font-mono text-[var(--secondary)] border border-[var(--secondary)]/30 px-2 py-1 rounded">LIVE</span>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-4xl font-extrabold text-white tracking-tighter">
                                    {recoveryScore}%
                                </div>
                                <p className="text-sm text-gray-400 mt-1">Readiness to Train</p>
                            </div>
                            <div className="h-16 w-32 relative">
                                {/* Simplified visuals for graph representation in code, could be a mini-chart */}
                                <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-between space-x-1">
                                    {[60, 80, 45, 90, 75, 92, 88].map((val, i) => (
                                        <div key={i} className="bg-[var(--secondary)]/50 hover:bg-[var(--secondary)] transition-all w-3 rounded-t-sm" style={{ height: `${val}%` }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-xs text-gray-400">Recommendation:</span>
                            <span className="text-sm font-bold text-white bg-[var(--secondary)]/20 px-3 py-1 rounded-full border border-[var(--secondary)]/30">
                                {recoveryScore > 80 ? 'Heavy Lifting' : recoveryScore > 50 ? 'Active Recovery' : 'Rest Day'}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* Digital Twin / Body Type */}
                <Card className={`group transition-all duration-500 border relative overflow-hidden ${simMode === 'FUTURE' ? 'bg-fuchsia-900/10 border-fuchsia-500/50 hover:shadow-[0_0_30px_rgba(232,121,249,0.3)]'
                    : 'bg-[var(--surface)] border-[var(--glass-border)] hover:border-[var(--primary)]'
                    }`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 z-10 relative">
                        <div className="flex space-x-2 bg-black/40 p-1 rounded-lg border border-white/10">
                            <button
                                onClick={() => setSimMode('CURRENT')}
                                className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${simMode === 'CURRENT' ? 'bg-[var(--primary)] text-black' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                CURRENT
                            </button>
                            <button
                                onClick={() => setSimMode('FUTURE')}
                                className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${simMode === 'FUTURE' ? 'bg-fuchsia-500 text-black' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                FUTURE
                            </button>
                        </div>
                        {simMode === 'FUTURE' && (
                            <span className="animate-pulse text-[10px] font-mono text-fuchsia-400">SIMULATION_ACTIVE</span>
                        )}
                    </CardHeader>
                    <CardContent className="relative z-10 pt-6">
                        <div className="flex flex-col items-center justify-center p-2">
                            {/* Avatar Container */}
                            <div className="relative w-24 h-24 mb-6">
                                <motion.div
                                    className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${simMode === 'FUTURE' ? 'bg-fuchsia-500/40' : 'bg-[var(--primary)]/20'
                                        }`}
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <div className={`relative z-10 w-full h-full border-2 rounded-full flex items-center justify-center bg-black/40 transition-all duration-500 ${simMode === 'FUTURE' ? 'border-fuchsia-500 text-fuchsia-400' : 'border-[var(--primary)] text-[var(--primary)]'
                                    }`}>
                                    <UserIcon className="h-12 w-12" />
                                </div>
                                {/* Scanning line animation */}
                                <div className={`absolute top-0 w-full h-0.5 shadow-[0_0_10px] animate-[scan_3s_ease-in-out_infinite] opacity-50 transition-colors duration-500 ${simMode === 'FUTURE' ? 'bg-fuchsia-400 shadow-fuchsia-400' : 'bg-white shadow-white'
                                    }`}></div>
                            </div>

                            {/* Stats Display */}
                            <div className="text-center space-y-1">
                                <motion.div
                                    key={simMode}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-lg font-black text-white"
                                >
                                    {simMode === 'CURRENT' ? user?.profile?.bodyType || 'Ectomorph' : 'Hybrid Athlete'}
                                </motion.div>
                                <p className={`text-xs font-bold uppercase tracking-widest ${simMode === 'FUTURE' ? 'text-fuchsia-400' : 'text-[var(--primary)]'
                                    }`}>
                                    {simMode === 'CURRENT' ? 'GENETIC BASELINE' : 'OPTIMIZED STRUCTURE'}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mt-4 w-full text-xs text-gray-400 border-t border-white/5 pt-3">
                                    <div className="text-center">
                                        <p>Mass</p>
                                        <p className="text-white font-bold">{simMode === 'CURRENT' ? '82kg' : '78kg'}</p>
                                        {simMode === 'FUTURE' && <span className="text-fuchsia-400 text-[10px]">-4kg</span>}
                                    </div>
                                    <div className="text-center">
                                        <p>Body Fat</p>
                                        <p className="text-white font-bold">{simMode === 'CURRENT' ? '18%' : '12%'}</p>
                                        {simMode === 'FUTURE' && <span className="text-fuchsia-400 text-[10px]">-6%</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    {/* Background Grid for Future Mode */}
                    {simMode === 'FUTURE' && (
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 z-0"></div>
                    )}
                </Card>

                <Card className="bg-[var(--surface-highlight)]/50 hover:border-[var(--accent)] transition-all">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Total Workouts</CardTitle>
                        <Dumbbell className="h-4 w-4 text-[var(--accent)]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">12</div>
                        <p className="text-xs text-[var(--accent)] font-medium">+2 this week</p>
                    </CardContent>
                </Card>
            </div>

            {/* Dashboard Main Grid */}
            <div className="grid gap-6 md:grid-cols-7">

                {/* Left Column: Analytics & AI Agent */}
                <div className="col-span-1 md:col-span-5 space-y-6">
                    {/* Performance Chart */}
                    <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-white">Metabolic Output Analysis</CardTitle>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="text-violet-400 text-xs border border-violet-500/30 hover:bg-violet-500/10"
                                onClick={handleOptimize}
                                disabled={loadingAI}
                            >
                                <Zap className={`w-3 h-3 mr-1 ${loadingAI ? 'animate-spin' : ''}`} />
                                {loadingAI ? 'ANALYZING...' : 'OPTIMIZE'}
                            </Button>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data}>
                                        <defs>
                                            <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorRecovery" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888' }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#111', borderRadius: '8px', border: '1px solid #333', color: '#fff' }}
                                        />
                                        <Area type="monotone" dataKey="calories" stroke="var(--primary)" fillOpacity={1} fill="url(#colorCalories)" />
                                        <Area type="monotone" dataKey="recovery" stroke="var(--secondary)" fillOpacity={0.3} fill="url(#colorRecovery)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Insights Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[var(--surface-highlight)]/30 p-4 rounded-xl border border-[var(--glass-border)] flex items-center">
                            <div className="h-10 w-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center mr-3">
                                <Shield className="h-5 w-5 text-[var(--primary)]" />
                            </div>
                            <div>
                                <h4 className="text-white text-sm font-bold">Sleep Quality</h4>
                                <p className="text-[var(--primary)] text-xs">7h 42m (Optimal)</p>
                            </div>
                        </div>
                        <div className="bg-[var(--surface-highlight)]/30 p-4 rounded-xl border border-[var(--glass-border)] flex items-center">
                            <div className="h-10 w-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mr-3">
                                <Brain className="h-5 w-5 text-[var(--accent)]" />
                            </div>
                            <div>
                                <h4 className="text-white text-sm font-bold">Mental Focus</h4>
                                <p className="text-[var(--accent)] text-xs">High Alertness</p>
                            </div>
                        </div>
                        <div className="bg-[var(--surface-highlight)]/30 p-4 rounded-xl border border-[var(--glass-border)] flex items-center">
                            <div className="h-10 w-10 rounded-full bg-[var(--secondary)]/20 flex items-center justify-center mr-3">
                                <Flame className="h-5 w-5 text-[var(--secondary)]" />
                            </div>
                            <div>
                                <h4 className="text-white text-sm font-bold">Burnout Risk</h4>
                                <p className="text-[var(--secondary)] text-xs">Low (3%)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Daily Quests (Gamification) */}
                <div className="col-span-1 md:col-span-2 space-y-6">
                    <Card className="bg-[var(--surface)] border-[var(--glass-border)] h-full">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <CheckCircle className="w-5 h-5 mr-2 text-[var(--accent)]" />
                                Daily Missions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {quests.map((quest: any, i: number) => (
                                    <div
                                        key={i}
                                        className={`p-3 rounded-lg border transition-all duration-300 group cursor-pointer relative overflow-hidden ${quest.completed
                                            ? 'bg-green-900/10 border-green-500/30 opacity-60'
                                            : 'bg-[var(--surface-highlight)] border-white/5 hover:border-[var(--primary)]'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between relative z-10">
                                            <div className="flex items-center">
                                                <div className={`
                                                    w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors
                                                    ${quest.completed ? 'bg-green-500 border-green-500' : 'border-gray-500 group-hover:border-[var(--primary)]'}
                                                `}>
                                                    {quest.completed && <CheckCircle className="w-3.5 h-3.5 text-black" />}
                                                </div>
                                                <div>
                                                    <h4 className={`text-sm font-medium ${quest.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                                                        {quest.title}
                                                    </h4>
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">{quest.type}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-[var(--secondary)]">+{quest.xp} XP</span>
                                        </div>
                                        {/* Progress Bar Background for Quests effect */}
                                        {!quest.completed && (
                                            <div className="absolute bottom-0 left-0 h-0.5 bg-[var(--primary)] w-0 group-hover:w-full transition-all duration-700"></div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/10">
                                <p className="text-xs text-gray-400 text-center mb-3">Complete all to trigger <span className="text-[var(--accent)] font-bold">Supercharge Mode</span>.</p>
                                <Button className="w-full bg-[var(--surface-highlight)] hover:bg-[var(--surface-highlight)]/80 text-white border border-white/10">
                                    View Quest Log
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Health Modal */}
            {showHealthModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md bg-[var(--surface)] border-[var(--primary)] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                        <CardHeader className="border-b border-[var(--glass-border)] pb-4">
                            <CardTitle className="text-xl font-bold text-white">Log Biometrics</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleHealthSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Sleep (Hours)</label>
                                        <input
                                            type="number" step="0.1"
                                            className="w-full bg-[var(--surface-highlight)] border border-[var(--glass-border)] rounded-md px-3 py-2 text-white"
                                            value={healthData.sleepHours}
                                            onChange={(e) => setHealthData({ ...healthData, sleepHours: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Sleep Quality (1-100)</label>
                                        <input
                                            type="number"
                                            className="w-full bg-[var(--surface-highlight)] border border-[var(--glass-border)] rounded-md px-3 py-2 text-white"
                                            value={healthData.sleepQualityScore}
                                            onChange={(e) => setHealthData({ ...healthData, sleepQualityScore: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Stress Level (1-100)</label>
                                        <input
                                            type="number"
                                            className="w-full bg-[var(--surface-highlight)] border border-[var(--glass-border)] rounded-md px-3 py-2 text-white"
                                            value={healthData.stressLevel}
                                            onChange={(e) => setHealthData({ ...healthData, stressLevel: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Resting HR</label>
                                        <input
                                            type="number"
                                            className="w-full bg-[var(--surface-highlight)] border border-[var(--glass-border)] rounded-md px-3 py-2 text-white"
                                            value={healthData.heartRateResting}
                                            onChange={(e) => setHealthData({ ...healthData, heartRateResting: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Readiness (1-100) (Optional)</label>
                                    <input
                                        type="number"
                                        className="w-full bg-[var(--surface-highlight)] border border-[var(--glass-border)] rounded-md px-3 py-2 text-white"
                                        value={healthData.readinessToTrain}
                                        onChange={(e) => setHealthData({ ...healthData, readinessToTrain: e.target.value })}
                                    />
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <Button type="button" variant="outline" className="w-full" onClick={() => setShowHealthModal(false)}>Cancel</Button>
                                    <Button type="submit" variant="glow" className="w-full">Save Metrics</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}

            <style jsx global>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
}
