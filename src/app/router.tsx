// src/app/router.tsx
import { Routes, Route } from 'react-router-dom';
import CatalogPage from '../features/catalog/pages/CatalogPage';
import ProductDetailPage from '../features/product/pages/ProductDetailPage';
import FavoritesPage from '../features/favorites/pages/FavoritesPage';
import NotFoundPage from '../pages/NotFoundPage';

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<CatalogPage />} />
    <Route path="/products/:id" element={<ProductDetailPage />} />
    <Route path="/favorites" element={<FavoritesPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
