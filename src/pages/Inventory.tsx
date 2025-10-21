
import React, { useState } from 'react';
import { products } from '../data/mockData';
import { Product } from '../types';
import { MagnifyingGlassIcon } from '../components/icons/Icons';

const Inventory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.genericName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStockStatus = (product: Product) => {
        if (product.stock === 0) {
            return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">Out of Stock</span>;
        }
        if (product.stock < product.lowStockThreshold) {
            return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">Low Stock</span>;
        }
        return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">In Stock</span>;
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Inventory</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Product Name</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Stock</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                                    <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-md mr-3 object-cover" />
                                    <div>
                                        {product.name}
                                        <div className="text-xs text-gray-400">{product.genericName}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                                <td className="px-6 py-4 font-mono font-semibold">{product.stock}</td>
                                <td className="px-6 py-4">{getStockStatus(product)}</td>
                                <td className="px-6 py-4">{product.expiryDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;