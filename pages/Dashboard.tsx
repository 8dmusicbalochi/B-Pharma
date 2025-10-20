
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { sales, products } from '../data/mockData';
import { Product } from '../types';
import { PlusIcon, CurrencyDollarIcon, BellIcon, ArrowPathIcon } from '../components/icons/Icons';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    const todaySales = sales.reduce((sum, sale) => sum + sale.total, 0);
    const lowStockItems = products.filter(p => p.stock < p.lowStockThreshold);

    const salesData = [
        { name: 'Mon', sales: 4000 },
        { name: 'Tue', sales: 3000 },
        { name: 'Wed', sales: 2000 },
        { name: 'Thu', sales: 2780 },
        { name: 'Fri', sales: 1890 },
        { name: 'Sat', sales: 2390 },
        { name: 'Sun', sales: 3490 },
    ];
    
    const QuickActionButton: React.FC<{label: string, icon: React.ReactNode}> = ({label, icon}) => (
      <button className="flex flex-col items-center justify-center space-y-2 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
        <div className="p-3 bg-primary/10 rounded-full text-primary">{icon}</div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </button>
    );

    const StatCard: React.FC<{title: string, value: string, icon: React.ReactNode, color: string}> = ({title, value, icon, color}) => (
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <div className={`p-3 rounded-full mr-4 ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name.split(' ')[0]}!</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Today's Sales" value={`$${todaySales.toFixed(2)}`} icon={<CurrencyDollarIcon className="h-6 w-6 text-white"/>} color="bg-green-500" />
                <StatCard title="Transactions" value={`${sales.length}`} icon={<ArrowPathIcon className="h-6 w-6 text-white"/>} color="bg-blue-500" />
                <StatCard title="Low Stock Items" value={`${lowStockItems.length}`} icon={<BellIcon className="h-6 w-6 text-white"/>} color="bg-yellow-500" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <QuickActionButton label="New Sale" icon={<PlusIcon />} />
                <QuickActionButton label="Receive Stock" icon={<PlusIcon />} />
                <QuickActionButton label="Add Product" icon={<PlusIcon />} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg mb-4 text-gray-700">Weekly Sales</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#2563EB" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-bold text-lg mb-4 text-gray-700">Low Stock Alerts</h3>
                    <ul className="space-y-3">
                        {lowStockItems.map((item: Product) => (
                            <li key={item.id} className="flex justify-between items-center text-sm">
                                <span>{item.name}</span>
                                <span className="font-bold text-accent-warning">{item.stock} left</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
