// src/features/catalog/components/CatalogFiltersSidebar.tsx
import {
  Box,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  Button,
  Divider,
  Stack,
  IconButton,
  FormGroup,
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
  Chip,
  TextField,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useCatalogStore } from '../../../store/catalogStore';

const CatalogFiltersSidebar = () => {
  const inStockOnly = useCatalogStore((s) => s.inStockOnly);
  const setInStockOnly = useCatalogStore((s) => s.setInStockOnly);
  const tag = useCatalogStore((s) => s.tag);
  const setTag = useCatalogStore((s) => s.setTag);
  const setPage = useCatalogStore((s) => s.setPage);
  const viewMode = useCatalogStore((s) => s.viewMode);
  const setPageSize = useCatalogStore((s) => s.setPageSize);
  const setSearch = useCatalogStore((s) => s.setSearch);
  const setSort = useCatalogStore((s) => s.setSort);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = (event.target as HTMLInputElement).value;
    // Map “All” to null, others to our existing tag values
    if (value === 'all') {
      setTag(null);
    } else {
      setTag(value);
    }
    setPage(1);
  };

  const clearAll = () => {
    setSearch('');
    setTag(null);
    setInStockOnly(false);
    setSort('updatedAt', 'desc');
    setPage(1);
    setPageSize(viewMode === 'comfortable' ? 3 : 8);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        // borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        width: '100%',
        maxWidth: { xs: '100%', md: 280 }, // desktop width close to reference
        backgroundColor: 'background.paper',
        boxShadow: '0px 24px 60px rgba(15, 23, 42, 0.10)',
      }}
    >
      {/* Header: icon + title */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 2.5,
        }}
      >
        <IconButton
          size="small"
          disableRipple
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            color: '#fff',
            '&:hover': { bgcolor: 'primary.main' },
          }}
        >
          <FilterAltOutlinedIcon fontSize="small" />
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Filters
        </Typography>
      </Box>

      {/* Availability section */}
      <Box mb={2.5}>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1 }}
        >
          Availability
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={inStockOnly}
                onChange={(e) => {
                  setInStockOnly(e.target.checked);
                  setPage(1);
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                In Stock
              </Typography>
            }
          />
          <FormControlLabel
            control={<Checkbox size="small" disabled />}
            label={
              <Typography
                variant="body2"
                sx={{ fontSize: '0.85rem', color: 'text.disabled' }}
              >
                Out of Stock
              </Typography>
            }
          />
        </FormGroup>
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      {/* Price Range section – visual only for now */}
      <Box mb={2.5}>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1 }}
        >
          Price Range
        </Typography>
        <Stack spacing={1.5}>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mb: 0.5 }}
            >
              Min Price
            </Typography>
            <TextField
              size="small"
              fullWidth
              placeholder="$0"
              variant="outlined"
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mb: 0.5 }}
            >
              Max Price
            </Typography>
            <TextField
              size="small"
              fullWidth
              placeholder="$1000"
              variant="outlined"
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Box>
          <Button
            variant="contained"
            size="small"
            fullWidth
            sx={{
              mt: 0.5,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Apply
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      {/* Category section – this is wired to our tag filter */}
      <Box mb={2.5}>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1 }}
        >
          Category
        </Typography>

        <FormControl component="fieldset" variant="standard" fullWidth>
          <RadioGroup
            value={tag ?? 'all'}
            onChange={handleCategoryChange}
          >
            <FormControlLabel
              value="all"
              control={<Radio size="small" />}
              label={
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  All
                </Typography>
              }
            />
            <FormControlLabel
              value="audio"
              control={<Radio size="small" />}
              label={
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  Audio
                </Typography>
              }
            />
            <FormControlLabel
              value="furniture"
              control={<Radio size="small" />}
              label={
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  Furniture
                </Typography>
              }
            />
            <FormControlLabel
              value="smart-home"
              control={<Radio size="small" />}
              label={
                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                  Smart home
                </Typography>
              }
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ mb: 2.5 }} />

      {/* Tags section – visual chips like the design */}
      <Box mb={2}>
        <Typography
          variant="subtitle2"
          sx={{ fontSize: '0.8rem', fontWeight: 600, mb: 1 }}
        >
          Tags
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            label="4k"
            size="small"
            sx={{ fontSize: '0.75rem', borderRadius: 9999 }}
          />
          <Chip
            label="accessories"
            size="small"
            sx={{ fontSize: '0.75rem', borderRadius: 9999 }}
          />
          <Chip
            label="work"
            size="small"
            sx={{ fontSize: '0.75rem', borderRadius: 9999 }}
          />
        </Stack>
      </Box>

      {/* Clear filters row at the bottom */}
      <Box mt={2}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 600, mr: 1 }}
        >
          Clear filters
        </Typography>
        <Button
          size="small"
          variant="text"
          color="inherit"
          onClick={clearAll}
          sx={{
            p: 0,
            minWidth: 'auto',
            textTransform: 'none',
            fontSize: '0.8rem',
          }}
        >
          Reset all
        </Button>
      </Box>
    </Paper>
  );
};

export default CatalogFiltersSidebar;
