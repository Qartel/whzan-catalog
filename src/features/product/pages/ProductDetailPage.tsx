// src/features/product/pages/ProductDetailsPage.tsx
import { useMemo } from 'react';
import {
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  Paper,
  Skeleton,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CategoryIcon from '@mui/icons-material/Category';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductById } from '../../../api/products';
import { useCatalogStore } from '../../../store/catalogStore';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();

  const toggleFavorite = useCatalogStore((s) => s.toggleFavorite);
  const favorites = useCatalogStore((s) => s.favorites);
  const setTag = useCatalogStore((s) => s.setTag);

  const productId = id ?? '';
  const {
    data: product,
    isLoading,
    isError,
  } = useProductById(productId);

  const isFavorite = useMemo(
    () => (product ? favorites.includes(product.id) : false),
    [favorites, product]
  );

  if (isLoading) {
    return (
      <Box sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          size="small"
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
              gap: 3,
            }}
          >
            <Skeleton variant="rectangular" height={320} />
            <Box>
              <Skeleton width="60%" height={40} />
              <Skeleton width="30%" height={30} sx={{ mt: 2 }} />
              <Skeleton width="80%" height={20} sx={{ mt: 3 }} />
              <Skeleton width="70%" height={20} />
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }

  if (isError || !product) {
    return (
      <Box sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          size="small"
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Typography variant="h6">Product not found.</Typography>
      </Box>
    );
  }

  const handleViewCategory = () => {
    // Go back to catalog with this category/tag selected
    if (product.tags && product.tags.length > 0) {
      setTag(product.tags[0]); // simple mapping; adjust if you have a dedicated category key
    }
    navigate('/');
  };

  const priceFormatted = `USD ${product.price.toFixed(2)}`;

  return (
    <Box sx={{ py: 4 }}>
      {/* Back link */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        size="small"
        sx={{ mb: 2, textTransform: 'none', fontWeight: 500 }}
      >
        Back
      </Button>

      {/* Main card */}
      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Top: image + details */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
            gap: { xs: 3, md: 4 },
            alignItems: 'flex-start',
          }}
        >
          {/* Image section */}
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              bgcolor: 'background.default',
            }}
          >
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.name}
              sx={{
                width: '100%',
                display: 'block',
                objectFit: 'cover',
                maxHeight: { xs: 360, md: 420 },
              }}
            />

            {/* Stock badge */}
            {!product.inStock && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  px: 2,
                  py: 0.5,
                  borderRadius: 9999,
                  bgcolor: theme.palette.error.main,
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                Out of Stock
              </Box>
            )}
          </Box>

          {/* Details section */}
          <Box>
            {/* Title */}
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, mb: 1 }}
            >
              {product.name}
            </Typography>

            {/* Rating row */}
            <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
              <Stack direction="row" spacing={0.25}>
                {Array.from({ length: 5 }).map((_, index) =>
                  index < Math.round(product.rating) ? (
                    <StarIcon
                      key={index}
                      fontSize="small"
                      sx={{ color: '#FACC15' }}
                    />
                  ) : (
                    <StarBorderIcon
                      key={index}
                      fontSize="small"
                      sx={{ color: '#FACC15' }}
                    />
                  )
                )}
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.85rem' }}
              >
                {product.rating.toFixed(1)} ({product.ratingCount} reviews)
              </Typography>
            </Stack>

            {/* Price */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
              }}
            >
              {priceFormatted}
              <Typography
                component="span"
                sx={{
                  ml: 1,
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                }}
              >
                USD
              </Typography>
            </Typography>

            {/* Category */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mb={1}
            >
              <CategoryIcon
                fontSize="small"
                sx={{ color: 'text.secondary' }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Category:{' '}
                <Typography
                  component="span"
                  sx={{ fontWeight: 600 }}
                >
                  {product.category}
                </Typography>
              </Typography>
            </Stack>

            {/* Stock line */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mb={3}
            >
              <ErrorOutlineIcon
                fontSize="small"
                sx={{
                  color: product.inStock
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: product.inStock
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                }}
              >
                {product.inStock ? 'In stock' : 'Out of Stock'}
              </Typography>
            </Stack>

            {/* Description */}
            <Box mb={3}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                Description
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {product.description}
              </Typography>
            </Box>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <Box mb={3}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Tags
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {product.tags.map((tagValue) => (
                    <Chip
                      key={tagValue}
                      label={tagValue}
                      size="small"
                      sx={{
                        mb: 1,
                        borderRadius: 9999,
                        fontSize: '0.8rem',
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Box>

        {/* Favorites bar */}
        <Box
          sx={{
            mt: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
            px: { xs: 0, md: 2 },
            py: 2,
            bgcolor:
              theme.palette.mode === 'light'
                ? 'grey.50'
                : 'background.default',
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            {isFavorite ? (
              <FavoriteIcon
                sx={{ color: theme.palette.error.main }}
              />
            ) : (
              <FavoriteBorderIcon sx={{ color: 'text.secondary' }} />
            )}
            <Button
              onClick={() => toggleFavorite(product.id)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {isFavorite ? 'Remove from favorites' : 'Add to Favorites'}
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Similar products section */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          Similar Products
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Check out other items in the{' '}
          <strong>{product.category}</strong> category.
        </Typography>
        <Button
          variant="contained"
          onClick={handleViewCategory}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          View all {product.category}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;
