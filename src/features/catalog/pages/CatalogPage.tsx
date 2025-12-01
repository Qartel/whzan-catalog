import { Box, Typography, Pagination, Stack, Alert } from '@mui/material';
import { useCatalogStore } from '../../../store/catalogStore';
import { useProducts } from '../../../api/products';
import CatalogToolbar from '../components/CatalogToolbar';
import ProductGrid from '../components/ProductGrid';
import { useCatalogQuerySync } from '../hooks/useCatalogQuerySync';

const CatalogPage = () => {
  useCatalogQuerySync();

  const search = useCatalogStore((s) => s.search);
  const inStockOnly = useCatalogStore((s) => s.inStockOnly);
  const sortBy = useCatalogStore((s) => s.sortBy);
  const sortDir = useCatalogStore((s) => s.sortDir);
  const page = useCatalogStore((s) => s.page);
  const pageSize = useCatalogStore((s) => s.pageSize);
  const setPage = useCatalogStore((s) => s.setPage);

  const { data, isLoading, isError, error, isFetching } = useProducts({
    search,
    inStock: inStockOnly,
    sortBy,
    sortDir,
    page,
    pageSize,
  });

  const total = data?.total ?? 0;
  const totalPages = total > 0 ? Math.ceil(total / pageSize) : 1;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" mb={1}>
          Catalog
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Browse thousands of products, refine with search and filters, and save
          items to review later.
        </Typography>
      </Box>

      <CatalogToolbar />

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error?.message || 'Something went wrong while loading products.'}
        </Alert>
      )}

      <ProductGrid
        products={data?.items ?? []}
        isLoading={isLoading || isFetching}
      />

      {totalPages > 1 && (
        <Stack
          mt={3}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption" color="text.secondary">
            Showing page {page} of {totalPages} ({total} items)
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      )}
    </Box>
  );
};

export default CatalogPage;
