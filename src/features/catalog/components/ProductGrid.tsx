import { Box, Skeleton, Typography } from '@mui/material';
import type { Product } from '../../../types/product';
import ProductCard from './ProductCard';

type Props = {
  products: Product[];
  isLoading: boolean;
};

const skeletonArray = Array.from({ length: 8 });

const ProductGrid = ({ products, isLoading }: Props) => {
  if (isLoading && products.length === 0) {
    return (
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {skeletonArray.map((_, index) => (
          <Box key={index}>
            <Skeleton variant="rectangular" height={180} />
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
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: 'repeat(4, 1fr)',
        },
      }}
    >
      {products.map((product) => (
        <Box key={product.id}>
          <ProductCard product={product} />
        </Box>
      ))}
    </Box>
  );
};

export default ProductGrid;
