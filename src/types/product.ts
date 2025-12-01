export interface Product {
  description: ReactNode;
  ratingCount: ReactNode;
  id: string;
  name: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  category: string;
  inStock: boolean;
  imageUrl: string;
  updatedAt: string; // ISO date string
  shortDescription: string;
}
