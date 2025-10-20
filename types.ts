
export enum UserRole {
  SuperAdmin = 'Super Admin',
  StockManager = 'Stock Manager',
  Cashier = 'Cashier',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
}

export interface Product {
  id: string;
  name: string;
  genericName: string;
  category: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  imageUrl: string;
  expiryDate: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Sale {
  id: string;
  receiptNumber: string;
  items: CartItem[];
  total: number;
  date: string;
  cashier: string;
}
