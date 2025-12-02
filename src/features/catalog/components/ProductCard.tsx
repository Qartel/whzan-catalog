// src/features/catalog/components/ProductCard.tsx
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack,
  Chip,
  useTheme,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { useCatalogStore } from '../../../store/catalogStore';
import { getProductImageForId } from '../../../app/assets/productImages';

// If you already have a Product type, use that instead of any
type ProductCardProps = {
  product: any;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const viewMode = useCatalogStore((s) => s.viewMode);
  const favorites = useCatalogStore((s) => s.favorites);
  const toggleFavorite = useCatalogStore((s) => s.toggleFavorite);

  const isFavorite = favorites.includes(product.id);
  const imageSrc = getProductImageForId(product.id);

  const handleOpenDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const headerHeight =
    viewMode === 'comfortable'
      ? 220
      : 170; // tweak if you want smaller/ larger

  const reviewCount =
  product.ratingCount ??
  product.reviewCount ??
  product.reviews ??
  0;

  return (
    <Paper
      onClick={handleOpenDetails}
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0, // you already removed radius globally, this keeps it square
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        boxShadow: '0px 16px 40px rgba(15, 23, 42, 0.12)',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0px 24px 60px rgba(15, 23, 42, 0.18)',
        },
      }}
    >
      {/* Image header: background image + name overlay + favorite */}
      <Box
        sx={{
          position: 'relative',
          height: headerHeight,
          overflow: 'hidden',
          bgcolor: 'grey.900',
        }}
      >
        {/* Image behind */}
        <Box
          component="img"
          src={imageSrc}
          alt={product.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: theme.palette.mode === 'dark' ? 0.45 : 0.55,
          }}
        />

        {/* Gradient to make text readable */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.70), rgba(0,0,0,0.15), rgba(0,0,0,0))',
          }}
        />

        {/* Favorite icon */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(15,23,42,0.8)',
            color: isFavorite ? theme.palette.error.main : '#ffffff',
            '&:hover': {
              bgcolor: 'rgba(15,23,42,0.95)',
            },
          }}
        >
          {isFavorite ? (
            <FavoriteIcon fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>

        {/* Name text sitting on top of the image (bottom area) */}
        <Box
          sx={{
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 14,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: '#ffffff',
              textShadow: '0 1px 3px rgba(0,0,0,0.65)',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </Typography>
        </Box>
      </Box>

      {/* Content section: sits below the image & name */}
      <Box
        sx={{
          p: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {/* Price + rating */}
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0.25 }}
          >
            ZAR
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 0.5 }}
          >
            {`R ${product.price.toFixed(2)}`}
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <StarIcon sx={{ fontSize: 18, color: '#FACC15' }} />
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              {product.rating.toFixed(1)} ({reviewCount})
            </Typography>
          </Stack>
         </Box>

        {/* Stock + category tags */}
        <Box sx={{ mt: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.8rem',
              color: product.inStock
                ? theme.palette.success.main
                : theme.palette.error.main,
              fontWeight: 500,
              mb: 0.5,
            }}
          >
            {product.inStock ? 'In stock' : 'Out of stock'}
          </Typography>
          <Stack
            direction="row"
            spacing={0.75}
            flexWrap="wrap"
          >
            {product.tags?.slice(0, 2).map((tagValue: string) => (
              <Chip
                key={tagValue}
                label={tagValue}
                size="small"
                sx={{
                  borderRadius: 9999,
                  fontSize: '0.7rem',
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductCard;
