export type Category = 'Business' | 'Self-Help' | 'Tech';

export interface Product {
  id: number;
  title: string;
  subtitle?: string;
  author: string;
  category: Category;

  price: number;
  originalPrice?: number;

  rating: number;
  reviewCount: number;

  pages?: number;
  format?: string;
  releaseDate?: string;

  type: 'ebook' | 'workbook';
  preOrder?: boolean;
  isBestseller: boolean;
  isNew: boolean;
  featured?: boolean;

  description: string;
  features: string[];
  coverImage: string;
  tags: string[];
}
