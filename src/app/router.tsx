// src/app/router.tsx
import { Routes, Route } from 'react-router-dom';

import CatalogPage from '../features/catalog/pages/CatalogPage';
import FavoritesPage from '../features/favorites/pages/FavoritesPage';
import ProductDetailPage from '../features/product/pages/ProductDetailPage';
import NotFound from '../pages/NotFoundPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />

      {/* ✅ Product details route */}
      <Route path="/product/:id" element={<ProductDetailPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
