// src/features/catalog/components/ProductGrid.tsx
import { Box, Skeleton, Typography } from '@mui/material';
import type { Product } from '../../../types/product';
import ProductCard from './ProductCard';
import { useCatalogStore } from '../../../store/catalogStore';

type Props = {
  products: Product[];
  isLoading: boolean;
};

const skeletonArray = Array.from({ length: 8 });

const ProductGrid = ({ products, isLoading }: Props) => {
  const viewMode = useCatalogStore((s) => s.viewMode);

  const columns =
    viewMode === 'compact'
      ? {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(4, minmax(0, 1fr))', // 4 equal-width small tiles
        }
      : {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, minmax(0, 1fr))', // 3 equal-width large tiles
        };

  if (isLoading && products.length === 0) {
    return (
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: columns,
        }}
      >
        {skeletonArray.map((_, index) => (
          <Box key={index} sx={{ height: '100%' }}>
            <Skeleton
              variant="rectangular"
              height={viewMode === 'compact' ? 140 : 180}
            />
            <Skeleton variant="text" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="60%" />
          </Box>
        ))}
      </Box>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 6,
          borderRadius: 2,
          border: '1px dashed',
          borderColor: 'divider',
          bgcolor: 'rgba(15,23,42,0.5)',
        }}
      >
        <Typography variant="h6" mb={1.5}>
          No products found
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={0.5}>
          Try a different search term, remove some filters, or use the quick
          filters above.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: columns,
      }}
    >
      {products.map((product) => (
        <Box key={product.id} sx={{ height: '100%' }}>
          <ProductCard product={product} />
        </Box>
      ))}
    </Box>
  );
};

export default ProductGrid;
