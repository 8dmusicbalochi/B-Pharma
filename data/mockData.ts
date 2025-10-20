
import { User, Product, Sale, UserRole } from '../types';

export const users: User[] = [
  { id: '1', name: 'Dr. Evelyn Reed', email: 'admin@bpharma.com', role: UserRole.SuperAdmin, avatarUrl: 'https://picsum.photos/seed/user1/100' },
  { id: '2', name: 'Marco Vance', email: 'stock@bpharma.com', role: UserRole.StockManager, avatarUrl: 'https://picsum.photos/seed/user2/100' },
  { id: '3', name: 'Aisha Khan', email: 'cashier@bpharma.com', role: UserRole.Cashier, avatarUrl: 'https://picsum.photos/seed/user3/100' },
];

export const products: Product[] = [
  { id: 'p1', name: 'Paracetamol 500mg', genericName: 'Acetaminophen', category: 'Pain Relief', price: 5.99, stock: 150, lowStockThreshold: 20, imageUrl: 'https://picsum.photos/seed/product1/200', expiryDate: '2025-12-31' },
  { id: 'p2', name: 'Amoxicillin 250mg', genericName: 'Amoxicillin', category: 'Antibiotics', price: 12.50, stock: 80, lowStockThreshold: 15, imageUrl: 'https://picsum.photos/seed/product2/200', expiryDate: '2024-10-01' },
  { id: 'p3', name: 'Vitamin C 1000mg', genericName: 'Ascorbic Acid', category: 'Supplements', price: 9.75, stock: 18, lowStockThreshold: 25, imageUrl: 'https://picsum.photos/seed/product3/200', expiryDate: '2026-06-30' },
  { id: 'p4', name: 'Ibuprofen 200mg', genericName: 'Ibuprofen', category: 'Pain Relief', price: 7.20, stock: 200, lowStockThreshold: 30, imageUrl: 'https://picsum.photos/seed/product4/200', expiryDate: '2025-08-15' },
  { id: 'p5', name: 'Loratadine 10mg', genericName: 'Loratadine', category: 'Allergy', price: 15.00, stock: 65, lowStockThreshold: 10, imageUrl: 'https://picsum.photos/seed/product5/200', expiryDate: '2024-11-20' },
  { id: 'p6', name: 'Cough Syrup DXM', genericName: 'Dextromethorphan', category: 'Cold & Flu', price: 8.99, stock: 90, lowStockThreshold: 20, imageUrl: 'https://picsum.photos/seed/product6/200', expiryDate: '2025-02-28' },
];

export const sales: Sale[] = [
  { id: 's1', receiptNumber: 'R001', items: [{...products[0], quantity: 2}, {...products[2], quantity: 1}], total: 21.73, date: '2024-07-29T10:30:00Z', cashier: 'Aisha Khan' },
  { id: 's2', receiptNumber: 'R002', items: [{...products[4], quantity: 1}], total: 15.00, date: '2024-07-29T11:15:00Z', cashier: 'Aisha Khan' },
  { id: 's3', receiptNumber: 'R003', items: [{...products[1], quantity: 1}, {...products[3], quantity: 1}], total: 19.70, date: '2024-07-28T14:00:00Z', cashier: 'Aisha Khan' },
];
