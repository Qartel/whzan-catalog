import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { Product } from '../types/product';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export type ProductsQueryParams = {
  search?: string;
  tag?: string | null;
  inStock?: boolean;
  sortBy?: 'price' | 'rating' | 'updatedAt' | 'name';
  sortDir?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
};

export type PaginatedProducts = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

function buildProductsUrl(params: ProductsQueryParams): string {
  const url = new URL('/api/products', API_BASE_URL);

  if (params.search) url.searchParams.set('q', params.search);
  if (params.tag) url.searchParams.set('tag', params.tag);
  if (params.inStock === true) {
    url.searchParams.set('inStock', 'true');
  }
  if (params.sortBy) url.searchParams.set('sortBy', params.sortBy);
  if (params.sortDir) url.searchParams.set('sortDir', params.sortDir);
  if (params.page) url.searchParams.set('page', String(params.page));
  if (params.pageSize) url.searchParams.set('pageSize', String(params.pageSize));

  return url.toString();
}

async function fetchProducts(params: ProductsQueryParams): Promise<PaginatedProducts> {
  const url = buildProductsUrl(params);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!res.ok) {
    throw new Error('Product not found');
  }
  return res.json();
}

async function fetchProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  const url = new URL('/api/products', API_BASE_URL);
  url.searchParams.set('ids', ids.join(','));
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error('Failed to fetch favorite products');
  }
  const data = (await res.json()) as PaginatedProducts;
  return data.items;
}

export function useProducts(params: ProductsQueryParams) {
  return useQuery<PaginatedProducts, Error>({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    placeholderData: keepPreviousData, // v5 way to keep previous page while loading
  });
}

export function useProductById(id?: string) {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => {
      if (!id) {
        throw new Error('No product id provided');
      }
      return fetchProductById(id);
    },
    enabled: !!id,
  });
}

export function useFavoriteProducts(ids: string[]) {
  return useQuery<Product[], Error>({
    queryKey: ['favoriteProducts', ids],
    queryFn: () => fetchProductsByIds(ids),
    enabled: ids.length > 0,
  });
}

export function useAllProductsForSearch() {
  return useQuery<PaginatedProducts, Error>({
    queryKey: ['products', 'all'],
    queryFn: () =>
      fetchProducts({
        page: 1,
        pageSize: 1000,
        sortBy: 'name',
        sortDir: 'asc',
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

