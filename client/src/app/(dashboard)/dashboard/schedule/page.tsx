'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function SchedulePage() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = ['06:00 AM', '08:00 AM', '10:00 AM', '12:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'];

    // Mock scheduled items
    const schedule = [
        { day: 'Monday', time: '06:00 AM', title: 'Morning Cardio', type: 'Cardio', color: 'bg-orange-100 text-orange-700 border-orange-200' },
        { day: 'Wednesday', time: '06:00 PM', title: 'Upper Body', type: 'Strength', color: 'bg-blue-100 text-blue-700 border-blue-200' },
        { day: 'Friday', time: '08:00 AM', title: 'Yoga Flow', type: 'Flexibility', color: 'bg-green-100 text-green-700 border-green-200' },
        { day: 'Saturday', time: '10:00 AM', title: 'HIIT Class', type: 'Cardio', color: 'bg-red-100 text-red-700 border-red-200' },
    ];

    const getEvent = (day: string, time: string) => {
        return schedule.find(s => s.day === day && s.time === time);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Weekly Schedule</h1>
                    <p className="text-gray-500">Plan your week for maximum performance.</p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm"><ChevronLeft className="h-4 w-4" /></Button>
                    <span className="flex items-center px-4 font-medium text-gray-700 bg-white border rounded-md">May 15 - May 21</span>
                    <Button variant="outline" size="sm"><ChevronRight className="h-4 w-4" /></Button>
                </div>
            </div>

            <Card className="overflow-x-auto">
                <CardContent className="p-0 min-w-[800px]">
                    <div className="grid grid-cols-8 border-b bg-gray-50">
                        <div className="p-4 font-medium text-gray-500 text-sm border-r">Time</div>
                        {days.map(day => (
                            <div key={day} className="p-4 font-bold text-gray-700 text-center border-r last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>
                    {timeSlots.map(time => (
                        <div key={time} className="grid grid-cols-8 border-b last:border-b-0 h-24">
                            <div className="p-3 text-xs font-medium text-gray-400 border-r bg-gray-50/30 flex items-center justify-center">
                                {time}
                            </div>
                            {days.map(day => {
                                const event = getEvent(day, time);
                                return (
                                    <div key={`${day}-${time}`} className="border-r last:border-r-0 p-1 relative group hover:bg-gray-50 transition-colors">
                                        {event ? (
                                            <div className={`h-full w-full rounded-md p-2 text-xs border ${event.color} cursor-pointer hover:shadow-sm transition-all`}>
                                                <div className="font-bold">{event.title}</div>
                                                <div className="opacity-75">{event.type}</div>
                                            </div>
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="sm" className="h-6 w-6 rounded-full p-0">
                                                    <Plus className="h-4 w-4 text-gray-400" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
