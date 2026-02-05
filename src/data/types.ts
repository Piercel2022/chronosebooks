export interface Category {
  id: string;
  name: string;
  description: string;
  productTypes: string[]; // Changed from 'products' to 'productTypes' for clarity
  icon: string;
  color: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  productType: string; // e.g., "checklists", "ebooks", etc.
  image?: string;
  features: string[];
}