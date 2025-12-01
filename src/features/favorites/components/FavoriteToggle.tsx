import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton, Tooltip } from '@mui/material';
import { useCatalogStore } from '../../../store/catalogStore';

type Props = {
  productId: string;
};

const FavoriteToggle = ({ productId }: Props) => {
  const isFavorite = useCatalogStore((s) => s.isFavorite(productId));
  const toggleFavorite = useCatalogStore((s) => s.toggleFavorite);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(productId);
  };

  const label = isFavorite ? 'Remove from saved items' : 'Save item for later';

  return (
    <Tooltip title={label} arrow>
      <IconButton
        size="small"
        onClick={handleClick}
        aria-label={label}
        aria-pressed={isFavorite}
        sx={{
          bgcolor: 'background.default',
          '&:hover': { bgcolor: 'background.default' },
          color: isFavorite ? 'primary.main' : 'text.secondary',
        }}
      >
        {isFavorite ? (
          <FavoriteIcon fontSize="small" />
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteToggle;
