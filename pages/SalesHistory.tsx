import React, { useState } from 'react';
import { sales } from '../data/mockData';
import { MagnifyingGlassIcon } from '../components/icons/Icons';
import { Sale } from '../types';

const SalesHistory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSales = sales.filter(s =>
        s.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.cashier.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <h2 className="text-xl font-bold text-gray-800">Sales History</h2>
                <div className="w-full md:w-auto flex gap-2">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search by receipt or cashier..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                     <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">Export</button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Receipt #</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Cashier</th>
                            <th scope="col" className="px-6 py-3">Items</th>
                            <th scope="col" className="px-6 py-3 text-right">Total</th>
                            <th scope="col" className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSales.map((sale: Sale) => (
                            <tr key={sale.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-semibold text-gray-900">{sale.receiptNumber}</td>
                                <td className="px-6 py-4">{new Date(sale.date).toLocaleString()}</td>
                                <td className="px-6 py-4">{sale.cashier}</td>
                                <td className="px-6 py-4">{sale.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                                <td className="px-6 py-4 font-semibold text-right">${sale.total.toFixed(2)}</td>
                                <td className="px-6 py-4 text-center">
                                    <button className="font-medium text-primary hover:underline">Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesHistory;