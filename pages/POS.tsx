
import React, { useState } from 'react';
import { products } from '../data/mockData';
import { CartItem, Product } from '../types';
import { MagnifyingGlassIcon, XMarkIcon, PlusIcon, MinusIcon } from '../components/icons/Icons';

const POS: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: string, amount: number) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + amount;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            }).filter((item): item is CartItem => item !== null);
        });
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.genericName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;

    return (
        <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-8rem)]">
            {/* Product Selection */}
            <div className="md:w-3/5 lg:w-2/3 bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredProducts.map(product => (
                            <button key={product.id} onClick={() => addToCart(product)} className="border rounded-lg p-2 text-center hover:shadow-md transition-shadow">
                                <img src={product.imageUrl} alt={product.name} className="w-full h-24 object-cover rounded-md mb-2" />
                                <p className="text-sm font-semibold text-gray-800 leading-tight">{product.name}</p>
                                <p className="text-xs text-gray-500">{product.category}</p>
                                <p className="text-sm font-bold text-primary mt-1">${product.price.toFixed(2)}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cart */}
            <div className="md:w-2/5 lg:w-1/3 bg-white p-4 rounded-lg shadow-sm flex flex-col">
                <h2 className="text-xl font-bold border-b pb-2 mb-4">Current Order</h2>
                <div className="flex-1 overflow-y-auto">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-3">
                            {cart.map(item => (
                                <li key={item.id} className="flex items-center space-x-3">
                                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold">{item.name}</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-gray-200 rounded-full"><MinusIcon className="h-3 w-3"/></button>
                                            <span className="text-sm font-mono w-6 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-gray-200 rounded-full"><PlusIcon className="h-3 w-3"/></button>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="border-t pt-4 mt-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Tax (5%)</span><span>${tax.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
                <div className="mt-4">
                    <button 
                        disabled={cart.length === 0}
                        className="w-full bg-accent-success text-white font-bold py-3 rounded-lg disabled:bg-gray-300"
                    >
                        Process Payment
                    </button>
                    <button 
                        onClick={() => setCart([])}
                        className="w-full bg-accent-danger text-white font-bold py-2 rounded-lg mt-2"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default POS;
