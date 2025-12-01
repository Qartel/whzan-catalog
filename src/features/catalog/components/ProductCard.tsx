// src/features/catalog/components/ProductCard.tsx
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FavoriteToggle from '../../favorites/components/FavoriteToggle';
import type { Product } from '../../../types/product';
import { useCatalogStore } from '../../../store/catalogStore';

type Props = {
  product: Product;
  viewMode?: 'comfortable' | 'compact';
};

const FALLBACK_IMAGE =
  'https://via.placeholder.com/400x300?text=Product';

const ProductCard = ({ product, viewMode }: Props) => {
  const navigate = useNavigate();
  const globalViewMode = useCatalogStore((s) => s.viewMode);
  const mode = viewMode ?? globalViewMode;
  const [imgSrc, setImgSrc] = useState(product.imageUrl || FALLBACK_IMAGE);

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const isCompact = mode === 'compact';

  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        width: '100%',          // 🔹 make card stretch to full grid cell width
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '100%',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height={isCompact ? 140 : 180}
            image={imgSrc}
            alt={product.name}
            loading="lazy"
            onError={() => setImgSrc(FALLBACK_IMAGE)}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <FavoriteToggle productId={product.id} />
          </Box>
        </Box>

        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: isCompact ? 0.5 : 1,
            py: isCompact ? 1 : 1.5,
          }}
        >
          <Typography
            variant={isCompact ? 'subtitle2' : 'subtitle1'}
            sx={{
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </Typography>

          {!isCompact && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {product.shortDescription}
            </Typography>
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 0.5,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {product.currency} {product.price.toFixed(2)}
            </Typography>
            <Typography
              variant="caption"
              color={product.inStock ? 'primary.main' : 'error.main'}
            >
              {product.inStock ? 'In stock' : 'Out of stock'}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 0.5,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              ⭐ {product.rating.toFixed(1)} ({product.reviewCount})
            </Typography>
            {!isCompact && (
              <Typography variant="caption" color="text.secondary">
                {product.category}
              </Typography>
            )}
          </Box>

          {product.tags?.length > 0 && !isCompact && (
            <Stack direction="row" spacing={0.5} mt={1} flexWrap="wrap">
              {product.tags.slice(0, 3).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: 9999,
                    borderColor: 'rgba(148,163,184,0.4)',
                    color: 'text.secondary',
                    fontSize: '0.7rem',
                  }}
                />
              ))}
            </Stack>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
