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
import FavoriteToggle from '../../favorites/components/FavoriteToggle';
import type { Product } from '../../../types/product';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
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
            height="180"
            image={product.imageUrl}
            alt={product.name}
            loading="lazy"
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
            gap: 1,
          }}
        >
          <Typography
            variant="subtitle1"
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

          <Typography variant="body2" color="text.secondary" noWrap>
            {product.shortDescription}
          </Typography>

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
            <Typography variant="caption" color="text.secondary">
              {product.category}
            </Typography>
          </Box>

          {product.tags?.length > 0 && (
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
