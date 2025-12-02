// src/features/catalog/pages/CatalogPage.tsx
import {
  Box,
  Typography,
  Pagination,
  Stack,
  Alert,
} from '@mui/material';
import CatalogToolbar from '../components/CatalogToolbar';
import CatalogFiltersSidebar from '../components/CatalogFiltersSidebar';
import ProductGrid from '../components/ProductGrid';
import { useCatalogStore } from '../../../store/catalogStore';
import { useProducts } from '../../../api/products';
import { useDebouncedValue } from '../../../lib/useDebouncedValue';

const CatalogPage = () => {
  const search = useCatalogStore((s) => s.search);
  const inStockOnly = useCatalogStore((s) => s.inStockOnly);
  const sortBy = useCatalogStore((s) => s.sortBy);
  const sortDir = useCatalogStore((s) => s.sortDir);
  const tag = useCatalogStore((s) => s.tag);
  const page = useCatalogStore((s) => s.page);
  const pageSize = useCatalogStore((s) => s.pageSize);
  const setPage = useCatalogStore((s) => s.setPage);

  const debouncedSearch = useDebouncedValue(search, 300);

  const priceMin = useCatalogStore((s) => s.priceMin);
  const priceMax = useCatalogStore((s) => s.priceMax);

  const { data, isLoading, isError, error, isFetching } = useProducts({
    search: debouncedSearch,
    inStock: inStockOnly,
    sortBy,
    sortDir,
    page,
    pageSize,
    tag,
    priceMin,
    priceMax, // ← add these
  });

  const products = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / (pageSize || 1)));

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Catalog
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Browse thousands of products, refine with search and filters, and
        save items to review later.
      </Typography>

      {/* Top bar: search + sort + view toggle */}
      <CatalogToolbar />

      {/* Main content: sidebar + grid */}
      <Box
        mt={3}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '280px minmax(0, 1fr)' },
          gap: 3,
        }}
      >
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <CatalogFiltersSidebar />
        </Box>

        {/* On small screens, put filters above grid */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
          <CatalogFiltersSidebar />
        </Box>

        <Box>
          {isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error?.message ?? 'Failed to load products.'}
            </Alert>
          )}

          <ProductGrid
            products={products}
            isLoading={isLoading || isFetching}
          />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt={3}
          >
            <Typography variant="caption" color="text.secondary">
              {total > 0
                ? `Showing page ${page} of ${totalPages} (${total} items)`
                : 'No products to display'}
            </Typography>

            {totalPages > 1 && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                shape="rounded"
                size="small"
              />
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CatalogPage;
