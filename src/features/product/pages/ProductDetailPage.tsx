// src/features/product/pages/ProductDetailPage.tsx
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box>
      <Typography variant="h4" mb={1.5}>
        Product Detail
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Product ID: {id}
      </Typography>
      {/* We will render detailed product info here later */}
    </Box>
  );
};

export default ProductDetailPage;
