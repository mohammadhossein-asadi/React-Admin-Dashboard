import type { EcommerceProduct, EcommerceOrder } from "@/types";

export const ecommerceProducts: EcommerceProduct[] = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 79.99, stock: 145, sold: 892, rating: 4.5, image: "🎧" },
  { id: 2, name: "Smart Watch Pro", category: "Electronics", price: 249.99, stock: 67, sold: 431, rating: 4.8, image: "⌚" },
  { id: 3, name: "Ergonomic Chair", category: "Furniture", price: 399.99, stock: 23, sold: 156, rating: 4.3, image: "🪑" },
  { id: 4, name: "Running Shoes", category: "Sports", price: 129.99, stock: 210, sold: 1247, rating: 4.6, image: "👟" },
  { id: 5, name: "Coffee Maker Deluxe", category: "Kitchen", price: 189.99, stock: 89, sold: 567, rating: 4.4, image: "☕" },
  { id: 6, name: "Backpack Travel", category: "Accessories", price: 59.99, stock: 312, sold: 2103, rating: 4.7, image: "🎒" },
  { id: 7, name: "LED Desk Lamp", category: "Furniture", price: 45.99, stock: 178, sold: 890, rating: 4.2, image: "💡" },
  { id: 8, name: "Yoga Mat Premium", category: "Sports", price: 34.99, stock: 245, sold: 1560, rating: 4.5, image: "🧘" },
  { id: 9, name: "Bluetooth Speaker", category: "Electronics", price: 69.99, stock: 156, sold: 1823, rating: 4.6, image: "🔊" },
  { id: 10, name: "Stainless Bottle", category: "Accessories", price: 24.99, stock: 420, sold: 3210, rating: 4.8, image: "🍶" },
  { id: 11, name: "Mechanical Keyboard", category: "Electronics", price: 149.99, stock: 78, sold: 654, rating: 4.7, image: "⌨️" },
  { id: 12, name: "Plant Pot Set", category: "Home", price: 29.99, stock: 340, sold: 980, rating: 4.3, image: "🪴" },
];

export const ecommerceOrders: EcommerceOrder[] = [
  { id: "ORD-7291", customer: "Jon Snow", product: "Smart Watch Pro", amount: 249.99, status: "delivered", date: "2024-01-15" },
  { id: "ORD-7292", customer: "Cersei Lannister", product: "Wireless Headphones", amount: 79.99, status: "shipped", date: "2024-01-15" },
  { id: "ORD-7293", customer: "Tyrion Lannister", product: "Ergonomic Chair", amount: 399.99, status: "processing", date: "2024-01-14" },
  { id: "ORD-7294", customer: "Daenerys Targaryen", product: "Running Shoes", amount: 129.99, status: "pending", date: "2024-01-14" },
  { id: "ORD-7295", customer: "Arya Stark", product: "Bluetooth Speaker", amount: 69.99, status: "delivered", date: "2024-01-13" },
  { id: "ORD-7296", customer: "Sansa Stark", product: "Coffee Maker Deluxe", amount: 189.99, status: "shipped", date: "2024-01-13" },
  { id: "ORD-7297", customer: "Bran Stark", product: "Mechanical Keyboard", amount: 149.99, status: "processing", date: "2024-01-12" },
  { id: "ORD-7298", customer: "Theon Greyjoy", product: "Yoga Mat Premium", amount: 34.99, status: "delivered", date: "2024-01-12" },
  { id: "ORD-7299", customer: "Samwell Tarly", product: "LED Desk Lamp", amount: 45.99, status: "pending", date: "2024-01-11" },
  { id: "ORD-7300", customer: "Brienne of Tarth", product: "Backpack Travel", amount: 59.99, status: "shipped", date: "2024-01-11" },
];

export const categoryRevenue = [
  { name: "Electronics", value: 49997, color: "#16a34a" },
  { name: "Furniture", value: 44598, color: "#2563eb" },
  { name: "Sports", value: 20379, color: "#f59e0b" },
  { name: "Accessories", value: 10508, color: "#8b5cf6" },
  { name: "Kitchen", value: 18999, color: "#ef4444" },
  { name: "Home", value: 9597, color: "#06b6d4" },
];

export const salesTrend = [
  { month: "Jul", orders: 120, revenue: 14500 },
  { month: "Aug", orders: 145, revenue: 17800 },
  { month: "Sep", orders: 132, revenue: 16200 },
  { month: "Oct", orders: 168, revenue: 20400 },
  { month: "Nov", orders: 195, revenue: 24100 },
  { month: "Dec", orders: 220, revenue: 28900 },
  { month: "Jan", orders: 188, revenue: 23200 },
];
