const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

// Load products from JSON once into memory
const dataPath = path.join(__dirname, 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Utility: apply filters/sorting/pagination
function filterAndSortProducts(query) {
  const {
    q,
    tag,
    inStock,
    sortBy = 'updatedAt',
    sortDir = 'desc',
    page = '1',
    pageSize = '20',
  } = query;

  let result = [...products];

  // Text search (name + shortDescription + tags)
  if (q) {
    const term = q.toLowerCase();
    result = result.filter((p) => {
      return (
        p.name.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(term))
      );
    });
  }

  // Tag filter
  if (tag) {
    result = result.filter((p) =>
      (p.tags || []).map((t) => t.toLowerCase()).includes(tag.toLowerCase())
    );
  }

  // inStock filter
  if (typeof inStock === 'string') {
    if (inStock === 'true') {
      result = result.filter((p) => p.inStock === true);
    } else if (inStock === 'false') {
      result = result.filter((p) => p.inStock === false);
    }
  }

  // Sorting
  result.sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1;

    if (sortBy === 'price') {
      return (a.price - b.price) * dir;
    }

    if (sortBy === 'rating') {
      return (a.rating - b.rating) * dir;
    }

    if (sortBy === 'name') {
      return a.name.localeCompare(b.name) * dir;
    }

    // default: updatedAt
    const aTime = new Date(a.updatedAt).getTime();
    const bTime = new Date(b.updatedAt).getTime();
    return (aTime - bTime) * dir;
  });

  // Pagination
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const size = Math.max(parseInt(pageSize, 10) || 20, 1);
  const start = (pageNum - 1) * size;
  const end = start + size;

  const paged = result.slice(start, end);

  return {
    items: paged,
    total: result.length,
    page: pageNum,
    pageSize: size,
  };
}

// Routes
app.get('/api/products', (req, res) => {
  try {
    const { ids } = req.query;

    // If ids are provided, return only those products (no pagination)
    if (ids) {
      const idList = String(ids)
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);

      const items = products.filter((p) => idList.includes(p.id));
      return res.json({
        items,
        total: items.length,
        page: 1,
        pageSize: items.length || 1,
      });
    }

    // Otherwise apply normal filters/sorting/pagination
    const data = filterAndSortProducts(req.query);
    res.json(data);
  } catch (err) {
    console.error('Error in /api/products', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}`);
});
