export type Product = {
  id: number;
  title: string;
  subtitle?: string;
  author?: string;
  category?: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  pages?: number;
  format?: string;
  releaseDate?: string;
  coverImage?: string;
  description?: string;
  isNew?: boolean;
  isBestseller?: boolean;
};
