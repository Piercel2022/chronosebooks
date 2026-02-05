import type { Product, Category } from '../types/Product';
import { products } from '../data/products';

export const getProductsByCategory = (category: Category): Product[] =>
  products.filter(p => p.category === category);

export const getBestsellers = (): Product[] =>
  products.filter(p => p.isBestseller);

export const getNewReleases = (): Product[] =>
  products.filter(p => p.isNew);

export const getPreOrders = (): Product[] =>
  products.filter(p => p.preOrder);

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(tag => tag.toLowerCase().includes(q)) ||
    p.author.toLowerCase().includes(q)
  );
};

export const getProductById = (id: number): Product | undefined =>
  products.find(p => p.id === id);

export const categories: Category[] = ['Business', 'Self-Help', 'Tech'];
