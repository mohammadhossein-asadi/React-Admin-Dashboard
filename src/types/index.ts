export interface TeamMember {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  access: "admin" | "manager" | "user";
}

export interface Contact {
  id: number;
  registrarId: number;
  name: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface Invoice {
  id: number;
  name: string;
  phone: string;
  email: string;
  cost: number;
  date: string;
}

export interface Transaction {
  txId: string;
  user: string;
  cost: string;
  date: string;
}

export interface BarDataItem {
  country: string;
  "hot dog": number;
  burger: number;
  sandwich: number;
  kebab: number;
  fries: number;
  donut: number;
}

export interface LineDataItem {
  name: string;
  cost: number;
  profit: number;
  loss: number;
}

export interface PieDataItem {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface GeographyDataItem {
  id: string;
  value: number;
  country: string;
}
