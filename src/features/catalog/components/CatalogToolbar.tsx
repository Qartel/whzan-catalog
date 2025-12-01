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
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import type { SelectChangeEvent } from '@mui/material/Select';
import {
  useCatalogStore
} from '../../../store/catalogStore';
import type {
  SortBy,
  SortDir,
} from '../../../store/catalogStore';
import { useAllProductsForSearch } from '../../../api/products';
import { useEffect, useMemo, useState } from 'react';

const CatalogToolbar = () => {
  const search = useCatalogStore((s) => s.search);
  const setSearch = useCatalogStore((s) => s.setSearch);
  const sortBy = useCatalogStore((s) => s.sortBy);
  const sortDir = useCatalogStore((s) => s.sortDir);
  const setSort = useCatalogStore((s) => s.setSort);
  const viewMode = useCatalogStore((s) => s.viewMode);
  const setViewMode = useCatalogStore((s) => s.setViewMode);
  const setPage = useCatalogStore((s) => s.setPage);
  const setPageSize = useCatalogStore((s) => s.setPageSize);

  // ---------- Search suggestions ----------
  const { data: allProducts } = useAllProductsForSearch();
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  const suggestionList = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q || !allProducts?.items) return [];

    const names = allProducts.items.map((p) => p.name);

    let starts = names.filter((name) =>
      name.toLowerCase().startsWith(q)
    );

    if (starts.length === 0) {
      starts = names.filter((name) =>
        name.toLowerCase().includes(q)
      );
    }

    return Array.from(new Set(starts));
  }, [search, allProducts]);

  const currentSuggestion =
    search.trim().length > 0 && suggestionList.length > 0
      ? suggestionList[highlightIndex ?? 0] ?? suggestionList[0]
      : null;

  useEffect(() => {
    setHighlightIndex(null);
  }, [search]);

  const handleSearchKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!suggestionList.length) return;

    if (e.key === 'ArrowRight') {
      if (currentSuggestion) {
        e.preventDefault();
        setSearch(currentSuggestion);
        setHighlightIndex(null);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % suggestionList.length;
      });
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => {
        if (prev === null) return suggestionList.length - 1;
        return (prev - 1 + suggestionList.length) % suggestionList.length;
      });
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setHighlightIndex(null);
      return;
    }
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    const [field, dir] = value.split(':') as [SortBy, SortDir];
    setSort(field, dir);
    setPage(1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', md: 'center' },
      }}
    >
      {/* Search with inline suggestion */}
      <Box sx={{ position: 'relative', flexGrow: 1 }}>
        {currentSuggestion &&
          currentSuggestion.toLowerCase() !==
            search.trim().toLowerCase() &&
          currentSuggestion
            .toLowerCase()
            .startsWith(search.trim().toLowerCase()) && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
                pl: '40px',
                pr: 2,
                fontSize: '0.875rem',
                fontFamily: 'inherit',
                color: 'text.disabled',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                opacity: 0.8,
              }}
            >
              <span style={{ visibility: 'hidden' }}>{search}</span>
              <span>{currentSuggestion.slice(search.length)}</span>
            </Box>
          )}

        <TextField
          size="small"
          fullWidth
          label="Search products"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search products by name, tag, or description..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            inputProps: {
              'aria-label': 'Search products',
              autoComplete: 'off',
            },
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          justifyContent: { xs: 'space-between', md: 'flex-end' },
        }}
      >
        <FormControl size="small" sx={{ minWidth: 180 }}>
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

        <ToggleButtonGroup
          size="small"
          value={viewMode}
          exclusive
          onChange={(_, value) => {
            if (!value) return;
            setViewMode(value);
            setPageSize(value === 'comfortable' ? 3 : 8);
            setPage(1);
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
      </Box>
    </Box>
  );
};

export default CatalogToolbar;
