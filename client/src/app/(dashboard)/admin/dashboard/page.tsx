'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { API_BASE_URL } from '@/lib/utils';
import { Users, Dumbbell, Shield, Activity, Database, Search } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'USERS' | 'WORKOUTS' | 'NUTRITION' | 'HEALTH'>('USERS');
  const [collectionData, setCollectionData] = useState<any[]>([]);

  useEffect(() => {
    if (user?.token) {
      fetchAdminStats();
    }
  }, [user]);

  useEffect(() => {
    if (activeTab !== 'USERS') {
      fetchCollectionData(activeTab.toLowerCase());
    }
  }, [activeTab]);

  const fetchAdminStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setStats(data.stats);
        setUsers(data.allUsers);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollectionData = async (collection: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/data?collection=${collection}`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setCollectionData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="text-white p-10">Loading Admin Panel...</div>;

  return (
    <div className="space-y-8 p-6 min-h-screen text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center">
            <Shield className="w-8 h-8 mr-3 text-red-500" />
            ADMIN <span className="text-red-500 ml-2">OVERLORD</span>
          </h1>
          <p className="text-gray-400">System-wide monitoring and database access.</p>
        </div>
        <div className="bg-red-900/20 border border-red-500/30 px-4 py-2 rounded-lg text-red-400 font-mono text-xs">
          ACCESS LEVEL: ROOT
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-[var(--primary)]" />
              {stats?.totalUsers}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Trainers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white flex items-center">
              <Shield className="w-5 h-5 mr-2 text-yellow-500" />
              {stats?.totalTrainers}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white flex items-center">
              <Dumbbell className="w-5 h-5 mr-2 text-[var(--secondary)]" />
              {stats?.totalWorkouts}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              ONLINE
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Explorer */}
      <div className="space-y-4">
        <div className="flex space-x-2 border-b border-gray-800 pb-1">
          {['USERS', 'WORKOUTS', 'NUTRITION', 'HEALTH'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 text-sm font-bold transition-all ${activeTab === tab
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <Card className="bg-[var(--surface)] border-[var(--glass-border)]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <Database className="w-4 h-4 mr-2 text-gray-400" />
              {activeTab} COLLECTION
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search ID..." className="pl-8 w-64 h-9 bg-[var(--surface-highlight)] border-none text-xs" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-[var(--glass-border)] overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#111] text-gray-400 uppercase font-mono text-xs">
                  <tr>
                    {activeTab === 'USERS' ? (
                      <>
                        <th className="px-4 py-3">User</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Level</th>
                        <th className="px-4 py-3">Joined</th>
                      </>
                    ) : (
                      <>
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">User</th>
                        <th className="px-4 py-3">Details</th>
                        <th className="px-4 py-3">Date</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {activeTab === 'USERS' ? (
                    users.map((u) => (
                      <tr key={u._id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{u.name}</div>
                          <div className="text-xs text-gray-500">{u.email}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'admin' ? 'bg-red-900/50 text-red-500' :
                              u.role === 'trainer' ? 'bg-yellow-900/50 text-yellow-500' :
                                'bg-gray-800 text-gray-400'
                            }`}>
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-white font-mono">LVL {u.level || 1}</td>
                        <td className="px-4 py-3 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    collectionData.map((item: any) => (
                      <tr key={item._id} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-gray-500">{item._id.substring(0, 8)}...</td>
                        <td className="px-4 py-3 text-white">{item.user?.name || 'Unknown'}</td>
                        <td className="px-4 py-3 text-gray-400">
                          {activeTab === 'WORKOUTS' && `${item.name} (${item.status})`}
                          {activeTab === 'NUTRITION' && `${item.foodItem} (${item.calories} kcal)`}
                          {activeTab === 'HEALTH' && `Recovery: ${item.recoveryScore}%`}
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {new Date(item.createdAt || item.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {((activeTab === 'USERS' && users.length === 0) || (activeTab !== 'USERS' && collectionData.length === 0)) && (
                <div className="p-8 text-center text-gray-500">No data found in this collection.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
