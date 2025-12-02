// src/features/favorites/pages/FavoritesPage.tsx
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import { useCatalogStore } from '../../../store/catalogStore';
import { useFavoriteProducts } from '../../../api/products';
import ProductGrid from '../../catalog/components/ProductGrid';

const FavoritesPage = () => {
  const favorites = useCatalogStore((s) => s.favorites);

  const {
    data: favoriteProducts,
    isLoading,
    isError,
    error,
  } = useFavoriteProducts(favorites);

  const hasFavorites = favorites.length > 0;

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" mb={1}>
          Saved Items
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Products you’ve marked to review later. Saved items persist across
          sessions on this device.
        </Typography>
      </Box>

      {!hasFavorites && (
        <Box
          sx={{
            mt: 4,
            textAlign: 'center',
            py: 6,
            borderRadius: 2,
            border: '1px dashed',
            borderColor: 'divider',
            bgcolor: 'rgba(15,23,42,0.5)',
          }}
        >
          <Typography variant="h6" mb={1.5}>
            No saved items yet
          </Typography>
          <Typography variant="body2" color="text.primary" mb={2}>
            Browse the catalog and click the heart icon on any product to save
            it here.
          </Typography>
          <Button
            href="/"
            variant="contained"
            color="primary"
            size="small"
          >
            Browse catalog
          </Button>
        </Box>
      )}

      {hasFavorites && isLoading && (
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}

      {hasFavorites && isError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error?.message || 'Failed to load saved products.'}
        </Alert>
      )}

      {hasFavorites && !isLoading && !isError && (
        <Box sx={{ mt: 3 }}>
          <ProductGrid
            products={favoriteProducts ?? []}
            isLoading={false}
          />
        </Box>
      )}
    </Box>
  );
};

export default FavoritesPage;
