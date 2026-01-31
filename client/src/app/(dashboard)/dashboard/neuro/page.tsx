'use client';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Brain, Zap, Clock, Activity, Play, Square, MousePointer2 } from 'lucide-react';
import { API_BASE_URL } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function NeuroPage() {
    const { user, login } = useAuth();

    // Neuro Stats (Mocked initial provided by user context if available, else default)
    const [focusScore, setFocusScore] = useState(user?.profile?.neuroStats?.focusScore || 75);
    const [stressLevel, setStressLevel] = useState(user?.profile?.neuroStats?.stressLevel || 20);
    const [reactionTime, setReactionTime] = useState(user?.profile?.neuroStats?.reactionTime || 0);

    // Focus Timer State
    const [isActive, setIsActive] = useState(false);
    const [seconds, setSeconds] = useState(600); // 10 mins default
    const [mode, setMode] = useState('Focus'); // Focus or Rest

    // Reaction Game State
    const [gameState, setGameState] = useState('idle'); // idle, waiting, ready, finished
    const [startTime, setStartTime] = useState(0);
    const [gameMessage, setGameMessage] = useState("Click 'Start Test' to begin.");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // --- Focus Timer Logic ---
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prev => prev - 1);
            }, 1000);
        } else if (seconds === 0) {
            setIsActive(false);
            // Award XP for completing focus session (Mock logic)
            // Ideally trigger an API call here
            alert("Session Complete! +50 XP");
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setSeconds(600);
    };

    const formatTime = (secs: number) => {
        const mins = Math.floor(secs / 60);
        const remainingSecs = secs % 60;
        return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
    };

    // --- Reaction Game Logic ---
    const startReactionTest = () => {
        setGameState('waiting');
        setGameMessage('Wait for Green...');

        const randomDelay = Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds

        timeoutRef.current = setTimeout(() => {
            setGameState('ready');
            setStartTime(Date.now());
            setGameMessage('CLICK NOW!');
        }, randomDelay);
    };

    const handleReactionClick = () => {
        if (gameState === 'waiting') {
            setGameState('idle');
            setGameMessage('Too early! Try again.');
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        } else if (gameState === 'ready') {
            const endTime = Date.now();
            const timeTaken = endTime - startTime;
            setReactionTime(timeTaken);
            setGameState('finished');
            setGameMessage(`Reaction Time: ${timeTaken}ms`);

            // Save to backend (Optimistic update)
            if (timeTaken < (user?.profile?.neuroStats?.reactionTime || 999)) {
                updateNeuroStats({ reactionTime: timeTaken });
            }
        }
    };

    const updateNeuroStats = async (newStats: any) => {
        try {
            // Optimistic Update
            if (newStats.reactionTime) setReactionTime(newStats.reactionTime);

            const res = await fetch(`${API_BASE_URL}/api/ai/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`
                },
                body: JSON.stringify({
                    neuroStats: {
                        reactionTime: newStats.reactionTime || reactionTime,
                        focusScore: focusScore,
                        stressLevel: stressLevel
                    }
                }),
            });

            if (res.ok) {
                const data = await res.json();
                // Optionally update context if we had a deep merge, 
                // but for now local state is sufficient for immediate feedback
                console.log("Neuro Stats Saved", data);
            }
        } catch (err) {
            console.error("Failed to update neuro stats", err);
        }
    };

    return (
        <div className="space-y-8 p-6 bg-[var(--background)] min-h-screen">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                    Neuro<span className="text-[var(--primary)]">Fitness</span>
                </h2>
                <p className="text-gray-400">Train your nervous system. Optimize reaction, focus, and recovery.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Focus Timer Module */}
                <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
                    <CardHeader>
                        <CardTitle className="flex items-center text-white">
                            <Brain className="w-5 h-5 mr-2 text-[var(--secondary)]" />
                            Focus Breathwork
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                            {/* Animated Circle */}
                            <div className={`absolute inset-0 rounded-full border-4 border-[var(--primary)]/30 ${isActive ? 'animate-ping duration-[4000ms]' : ''}`}></div>
                            <div className={`absolute inset-0 rounded-full border-4 border-[var(--primary)] ${isActive ? 'animate-pulse' : ''} transition-all duration-1000`}></div>
                            <div className="text-5xl font-mono font-bold text-white z-10">
                                {formatTime(seconds)}
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <Button
                                variant={isActive ? "danger" : "glow"}
                                onClick={toggleTimer}
                                className="w-32"
                            >
                                {isActive ? <><Square className="w-4 h-4 mr-2" /> Pause</> : <><Play className="w-4 h-4 mr-2" /> Start</>}
                            </Button>
                            <Button variant="outline" onClick={resetTimer}>Reset</Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-6 text-center max-w-xs">
                            Box breathing technique to lower cortisol and improve focus score.
                        </p>
                    </CardContent>
                </Card>

                {/* Reaction Drill Module */}
                <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
                    <CardHeader>
                        <CardTitle className="flex items-center text-white">
                            <Zap className="w-5 h-5 mr-2 text-[var(--accent)]" />
                            Reaction Drill
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className={`
                                w-full h-64 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200
                                ${gameState === 'idle' || gameState === 'finished' ? 'bg-[var(--surface-highlight)]' : ''}
                                ${gameState === 'waiting' ? 'bg-red-900/50' : ''}
                                ${gameState === 'ready' ? 'bg-green-500' : ''}
                            `}
                            onMouseDown={handleReactionClick}
                        >
                            <div className="text-center pointer-events-none select-none">
                                {gameState === 'idle' || gameState === 'finished' ? (
                                    <>
                                        <MousePointer2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                        <h3 className="text-xl font-bold text-white mb-2">{gameMessage}</h3>
                                        {gameState === 'finished' ? (
                                            <Button variant="outline" className="mt-4 pointer-events-auto" onClick={(e) => { e.stopPropagation(); startReactionTest(); }}>
                                                Try Again
                                            </Button>
                                        ) : (
                                            <Button variant="glow" className="mt-4 pointer-events-auto" onClick={(e) => { e.stopPropagation(); startReactionTest(); }}>
                                                Start Test
                                            </Button>
                                        )}
                                    </>
                                ) : (
                                    <h3 className="text-3xl font-bold text-white uppercase tracking-widest">{gameMessage}</h3>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-between items-center text-sm">
                            <span className="text-gray-400">Personal Best:</span>
                            <span className="text-[var(--accent)] font-mono font-bold">{reactionTime > 0 ? `${reactionTime}ms` : '---'}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Neural Load Map */}
            <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
                <CardHeader>
                    <CardTitle className="flex items-center text-white">
                        <Activity className="w-5 h-5 mr-2 text-white" />
                        Neural Load Statistics
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="p-4 bg-black/30 rounded-lg text-center border border-white/5">
                            <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Current Focus</div>
                            <div className="text-3xl font-black text-[var(--primary)]">{focusScore}/100</div>
                        </div>
                        <div className="p-4 bg-black/30 rounded-lg text-center border border-white/5">
                            <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Stress Index</div>
                            <div className={`text-3xl font-black ${stressLevel > 50 ? 'text-red-500' : 'text-green-500'}`}>{stressLevel}/100</div>
                        </div>
                        <div className="p-4 bg-black/30 rounded-lg text-center border border-white/5">
                            <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Cognitive Load</div>
                            <div className="text-3xl font-black text-[var(--secondary)]">OPTIMAL</div>
                        </div>
                    </div>

                    <div className="h-[250px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                                { time: '09:00', focus: 65, stress: 30 },
                                { time: '10:00', focus: 75, stress: 35 },
                                { time: '11:00', focus: 85, stress: 45 },
                                { time: '12:00', focus: 60, stress: 25 },
                                { time: '13:00', focus: 70, stress: 40 },
                                { time: '14:00', focus: 90, stress: 55 },
                                { time: '15:00', focus: 80, stress: 40 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="focus" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)' }} />
                                <Line type="monotone" dataKey="stress" stroke="red" strokeWidth={2} strokeOpacity={0.5} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
