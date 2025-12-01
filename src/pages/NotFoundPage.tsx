// src/pages/NotFoundPage.tsx
import { Box, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        py: 8,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" mb={1.5}>
        404
      </Typography>
      <Typography variant="body2" color="text.secondary">
        The page you’re looking for doesn’t exist.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
