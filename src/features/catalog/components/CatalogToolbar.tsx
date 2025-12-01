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
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
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
  const setPageSize = useCatalogStore((s) => s.setPageSize);
  const viewMode = useCatalogStore((s) => s.viewMode);
  const setViewMode = useCatalogStore((s) => s.setViewMode);

  const handleSortChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    const [field, dir] = value.split(':') as [SortBy, SortDir];
    setSort(field, dir);
    setPage(1);
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

  const clearAllFilters = () => {
    setSearch('');
    setTag(null);
    setInStockOnly(false);
    setSort('updatedAt', 'desc');
    setPageSize(20);
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
          label="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name, tag, or description..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            inputProps: {
              'aria-label': 'Search products',
            },
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
          alignItems: 'center',
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

        <Box sx={{ flexGrow: 1 }} />

        <ToggleButtonGroup
          size="small"
          value={viewMode}
          exclusive
          onChange={(_, value) => {
            if (!value) return;
            setViewMode(value);
          }}
          aria-label="Tile density"
        >
          <ToggleButton value="comfortable" aria-label="Comfortable view">
            <ViewModuleIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="compact" aria-label="Compact view">
            <ViewCompactIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>

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

        <Button
          size="small"
          variant="text"
          onClick={clearAllFilters}
          sx={{ ml: 1 }}
        >
          Clear filters
        </Button>
      </Box>
    </>
  );
};

export default CatalogToolbar;
