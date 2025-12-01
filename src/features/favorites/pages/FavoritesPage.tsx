// src/features/favorites/pages/FavoritesPage.tsx
import { Box, Typography } from '@mui/material';

const FavoritesPage = () => {
  return (
    <Box>
      <Typography variant="h4" mb={1.5}>
        Saved Items
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Products you’ve saved for later will appear here.
      </Typography>
      {/* Saved products grid will go here */}
    </Box>
  );
};

export default FavoritesPage;
