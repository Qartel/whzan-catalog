// src/features/catalog/components/CatalogToolbar.tsx
import {
  Box,
  TextField,
  InputAdornment,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useCatalogStore } from '../../../store/catalogStore';
import type { SortBy, SortDir } from '../../../store/catalogStore';

const CatalogToolbar = () => {
  const search = useCatalogStore((s) => s.search);
  const setSearch = useCatalogStore((s) => s.setSearch);
  const inStockOnly = useCatalogStore((s) => s.inStockOnly);
  const setInStockOnly = useCatalogStore((s) => s.setInStockOnly);
  const sortBy = useCatalogStore((s) => s.sortBy);
  const sortDir = useCatalogStore((s) => s.sortDir);
  const setSort = useCatalogStore((s) => s.setSort);
  const tag = useCatalogStore((s) => s.tag);
  const setTag = useCatalogStore((s) => s.setTag);
  const setPage = useCatalogStore((s) => s.setPage);

  const handleSortChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    const [field, dir] = value.split(':') as [SortBy, SortDir];
    setSort(field, dir);
  };

  const applyQuickTag = (value: string | null) => {
    setTag(value);
    setPage(1);
  };

  const applyTopRated = () => {
    setSort('rating', 'desc');
    setPage(1);
  };

  const applyNewest = () => {
    setSort('updatedAt', 'desc');
    setPage(1);
  };

  return (
    <>
      {/* Main toolbar row */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 2,
          alignItems: { xs: 'stretch', sm: 'center' },
        }}
      >
        <TextField
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name, tag, or description..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              color="primary"
            />
          }
          label="In stock only"
          sx={{ ml: { xs: 0, sm: 1 } }}
        />

        <FormControl
          size="small"
          sx={{ minWidth: 180, ml: { xs: 0, sm: 'auto' } }}
        >
          <InputLabel id="sort-label">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SortIcon fontSize="small" /> Sort
            </Box>
          </InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            label="Sort"
            value={`${sortBy}:${sortDir}`}
            onChange={handleSortChange}
          >
            <MenuItem value="updatedAt:desc">Newest first</MenuItem>
            <MenuItem value="price:asc">Price: Low to High</MenuItem>
            <MenuItem value="price:desc">Price: High to Low</MenuItem>
            <MenuItem value="rating:desc">Rating: High to Low</MenuItem>
            <MenuItem value="name:asc">Name A → Z</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Quick filter row */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          mb: 3,
        }}
      >
        <Button
          size="small"
          variant={tag === null ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => applyQuickTag(null)}
        >
          All
        </Button>
        <Button
          size="small"
          variant={tag === 'audio' ? 'contained' : 'outlined'}
          onClick={() => applyQuickTag('audio')}
        >
          Audio
        </Button>
        <Button
          size="small"
          variant={tag === 'furniture' ? 'contained' : 'outlined'}
          onClick={() => applyQuickTag('furniture')}
        >
          Furniture
        </Button>
        <Button
          size="small"
          variant={tag === 'smart-home' ? 'contained' : 'outlined'}
          onClick={() => applyQuickTag('smart-home')}
        >
          Smart home
        </Button>

        {/* Spacer for sort presets */}
        <Box sx={{ flexGrow: 1 }} />

        <Button
          size="small"
          variant="outlined"
          onClick={applyTopRated}
        >
          Top rated
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={applyNewest}
        >
          Newest
        </Button>
      </Box>
    </>
  );
};

export default CatalogToolbar;
