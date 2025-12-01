// src/features/catalog/hooks/useCatalogQuerySync.ts
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCatalogStore } from '../../../store/catalogStore';
import type { SortBy, SortDir } from '../../../store/catalogStore';

const SORT_BY_VALUES: SortBy[] = ['price', 'rating', 'updatedAt', 'name'];
const SORT_DIR_VALUES: SortDir[] = ['asc', 'desc'];

export const useCatalogQuerySync = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    search,
    tag,
    inStockOnly,
    sortBy,
    sortDir,
    page,
    pageSize,
    setSearch,
    setTag,
    setInStockOnly,
    setSort,
    setPage,
    setPageSize,
  } = useCatalogStore();

  // 1) On first mount: URL -> store
  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    const tagParam = searchParams.get('tag');
    const inStockParam = searchParams.get('inStock');
    const sortByParam = searchParams.get('sortBy') as SortBy | null;
    const sortDirParam = searchParams.get('sortDir') as SortDir | null;
    const pageParam = searchParams.get('page');
    const pageSizeParam = searchParams.get('pageSize');

    if (q) setSearch(q);
    if (tagParam) setTag(tagParam);

    if (inStockParam !== null) {
      setInStockOnly(inStockParam === 'true');
    }

    if (sortByParam && SORT_BY_VALUES.includes(sortByParam)) {
      const dir = sortDirParam && SORT_DIR_VALUES.includes(sortDirParam)
        ? sortDirParam
        : 'desc';
      setSort(sortByParam, dir);
    }

    if (pageParam && !Number.isNaN(Number(pageParam))) {
      setPage(Number(pageParam));
    }

    if (pageSizeParam && !Number.isNaN(Number(pageSizeParam))) {
      setPageSize(Number(pageSizeParam));
    }

    // We intentionally only run this once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Store -> URL (whenever state changes)
  useEffect(() => {
    const next = new URLSearchParams(searchParams);

    // Only store non-default values to keep URLs clean
    if (search) next.set('q', search);
    else next.delete('q');

    if (tag) next.set('tag', tag);
    else next.delete('tag');

    if (inStockOnly) next.set('inStock', 'true');
    else next.delete('inStock');

    if (sortBy !== 'updatedAt') next.set('sortBy', sortBy);
    else next.delete('sortBy');

    if (!(sortBy === 'updatedAt' && sortDir === 'desc')) {
      next.set('sortDir', sortDir);
    } else {
      next.delete('sortDir');
    }

    if (page > 1) next.set('page', String(page));
    else next.delete('page');

    if (pageSize !== 3) next.set('pageSize', String(pageSize));
    else next.delete('pageSize');

    const currentStr = searchParams.toString();
    const nextStr = next.toString();

    if (currentStr !== nextStr) {
      setSearchParams(next, { replace: true });
    }
  }, [
    search,
    tag,
    inStockOnly,
    sortBy,
    sortDir,
    page,
    pageSize,
    searchParams,
    setSearchParams,
  ]);
};
