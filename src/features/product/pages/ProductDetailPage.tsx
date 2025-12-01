// src/features/product/pages/ProductDetailPage.tsx
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductById } from '../../../api/products';
import FavoriteToggle from '../../favorites/components/FavoriteToggle';
import { useCatalogStore } from '../../../store/catalogStore';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const setTag = useCatalogStore((s) => s.setTag);
  const setSearch = useCatalogStore((s) => s.setSearch);
  const setInStockOnly = useCatalogStore((s) => s.setInStockOnly);
  const setPage = useCatalogStore((s) => s.setPage);

  const { data: product, isLoading, isError, error } = useProductById(id);

  const handleBack = () => {
    navigate('/');
  };

  const handleTagClick = (tag: string) => {
    // Quick filter: go back to catalog showing this tag
    setTag(tag);
    setSearch('');
    setPage(1);
    navigate('/');
  };

  const handleInStockFilter = () => {
    if (!product) return;
    setInStockOnly(true);
    setSearch(product.name.split(' ')[0] ?? '');
    setPage(1);
    navigate('/');
  };

  if (isLoading) {
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !product) {
    return (
      <Box sx={{ py: 6 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error?.message || 'Product could not be loaded.'}
        </Alert>
        <Button variant="outlined" onClick={handleBack} color="primary">
          Back to catalog
        </Button>
      </Box>
    );
  }

  const updatedDate = new Date(product.updatedAt).toLocaleDateString();

  return (
    <Box>
      {/* Top actions */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          gap: 2,
        }}
      >
        <Button variant="text" color="inherit" onClick={handleBack}>
          ← Back to catalog
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FavoriteToggle productId={product.id} />
          <Chip
            label={product.inStock ? 'In stock' : 'Out of stock'}
            color={product.inStock ? 'success' : 'default'}
            variant={product.inStock ? 'filled' : 'outlined'}
            size="small"
          />
        </Box>
      </Box>

      {/* Main layout: image + details */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        {/* Image */}
        <Box
          sx={{
            flex: 1,
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Box
            component="img"
            src={product.imageUrl}
            alt={product.name}
            sx={{
              width: '100%',
              height: { xs: 260, md: 340 },
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>

        {/* Details */}
        <Box sx={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography variant="h4" mb={1}>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.shortDescription}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {product.currency} {product.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ⭐ {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </Typography>
            <Chip
              label={product.category}
              variant="outlined"
              size="small"
              sx={{ borderRadius: 9999 }}
            />
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ textTransform: 'uppercase', letterSpacing: 0.8, mb: 1 }}
            >
              Tags
            </Typography>
            {product.tags && product.tags.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {product.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    onClick={() => handleTagClick(tag)}
                    sx={{
                      borderRadius: 9999,
                      cursor: 'pointer',
                    }}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No tags available.
              </Typography>
            )}
          </Box>

          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ textTransform: 'uppercase', letterSpacing: 0.8, mb: 1 }}
            >
              Quick actions
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleTagClick(product.category)}
              >
                Show more in {product.category}
              </Button>
              {product.inStock && (
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={handleInStockFilter}
                >
                  Find similar in stock
                </Button>
              )}
            </Stack>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Last updated on {updatedDate}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
