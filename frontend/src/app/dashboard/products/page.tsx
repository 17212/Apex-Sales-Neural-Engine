// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Products Page
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Grid,
  List,
  Edit,
  Trash2,
  Eye,
  Star,
  Package,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

const mockProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    nameAr: 'آيفون 15 برو ماكس',
    price: 58999,
    originalPrice: 62999,
    cost: 48000,
    stock: 15,
    salesCount: 234,
    rating: 4.9,
    category: 'phones',
    thumbnail: '/iphone.jpg',
    isActive: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'MacBook Pro 14"',
    nameAr: 'ماك بوك برو 14 بوصة',
    price: 89999,
    originalPrice: 94999,
    cost: 75000,
    stock: 8,
    salesCount: 89,
    rating: 4.8,
    category: 'laptops',
    thumbnail: '/macbook.jpg',
    isActive: true,
    isFeatured: true,
  },
  {
    id: '3',
    name: 'AirPods Pro 2',
    nameAr: 'إيربودز برو 2',
    price: 8999,
    originalPrice: 9999,
    cost: 6500,
    stock: 45,
    salesCount: 567,
    rating: 4.7,
    category: 'accessories',
    thumbnail: '/airpods.jpg',
    isActive: true,
    isFeatured: false,
  },
  {
    id: '4',
    name: 'Apple Watch Ultra 2',
    nameAr: 'أبل ووتش ألترا 2',
    price: 34999,
    originalPrice: 38999,
    cost: 28000,
    stock: 3,
    salesCount: 156,
    rating: 4.9,
    category: 'watches',
    thumbnail: '/watch.jpg',
    isActive: true,
    isFeatured: false,
    lowStock: true,
  },
  {
    id: '5',
    name: 'iPad Pro 12.9"',
    nameAr: 'آيباد برو 12.9 بوصة',
    price: 44999,
    originalPrice: 49999,
    cost: 36000,
    stock: 0,
    salesCount: 123,
    rating: 4.6,
    category: 'tablets',
    thumbnail: '/ipad.jpg',
    isActive: false,
    isFeatured: false,
    outOfStock: true,
  },
];

const categories = [
  { id: 'all', name: 'الكل', count: 156 },
  { id: 'phones', name: 'الهواتف', count: 45 },
  { id: 'laptops', name: 'اللابتوبات', count: 23 },
  { id: 'tablets', name: 'التابلتات', count: 18 },
  { id: 'watches', name: 'الساعات', count: 34 },
  { id: 'accessories', name: 'الإكسسوارات', count: 36 },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameAr.includes(searchQuery);
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">المنتجات</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            إدارة كتالوج منتجاتك
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4" />
          إضافة منتج
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-500)]/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-[var(--primary-500)]" />
            </div>
            <div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-[var(--text-tertiary)]">إجمالي المنتجات</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--success)]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[var(--success)]" />
            </div>
            <div>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-[var(--text-tertiary)]">مبيعات هذا الشهر</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--warning)]/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[var(--warning)]" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-[var(--text-tertiary)]">مخزون منخفض</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--error)]/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-[var(--error)]" />
            </div>
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-[var(--text-tertiary)]">نفد المخزون</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="بحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pr-10 text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all ${
                categoryFilter === cat.id
                  ? 'bg-[var(--primary-500)] text-white'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
              }`}
            >
              {cat.name}
              <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-xs">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-1 bg-[var(--bg-tertiary)] rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all ${
              viewMode === 'grid' ? 'bg-[var(--bg-elevated)]' : ''
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-all ${
              viewMode === 'list' ? 'bg-[var(--bg-elevated)]' : ''
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-card overflow-hidden group ${!product.isActive ? 'opacity-60' : ''}`}
            >
              {viewMode === 'grid' ? (
                <>
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-elevated)] flex items-center justify-center">
                    <Package className="w-16 h-16 text-[var(--text-muted)]" />
                    
                    {/* Badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      {product.isFeatured && (
                        <span className="px-2 py-1 rounded-full bg-[var(--warning)] text-black text-xs font-medium flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          مميز
                        </span>
                      )}
                      {product.outOfStock && (
                        <span className="px-2 py-1 rounded-full bg-[var(--error)] text-white text-xs">
                          نفد المخزون
                        </span>
                      )}
                      {product.lowStock && (
                        <span className="px-2 py-1 rounded-full bg-[var(--warning)] text-black text-xs">
                          مخزون منخفض
                        </span>
                      )}
                    </div>

                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-[var(--error)]/50 hover:bg-[var(--error)]/70 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold truncate">{product.nameAr}</h3>
                      <p className="text-sm text-[var(--text-tertiary)] truncate">{product.name}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-[var(--primary-400)]">
                          {product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-[var(--text-tertiary)]"> ج.م</span>
                        {product.originalPrice > product.price && (
                          <span className="mr-2 text-sm text-[var(--text-muted)] line-through">
                            {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[var(--warning)]">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--text-tertiary)]">
                        المخزون: <span className={product.stock < 5 ? 'text-[var(--error)]' : 'text-[var(--success)]'}>{product.stock}</span>
                      </span>
                      <span className="text-[var(--text-tertiary)]">
                        المبيعات: {product.salesCount}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                // List View
                <div className="flex items-center gap-4 p-4">
                  <div className="w-16 h-16 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center flex-shrink-0">
                    <Package className="w-8 h-8 text-[var(--text-muted)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{product.nameAr}</h3>
                    <p className="text-sm text-[var(--text-tertiary)]">{product.name}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-[var(--primary-400)]">{product.price.toLocaleString()} ج.م</p>
                    <p className="text-sm text-[var(--text-tertiary)]">المخزون: {product.stock}</p>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)]">
                      <Eye className="w-4 h-4 text-[var(--text-secondary)]" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)]">
                      <Edit className="w-4 h-4 text-[var(--text-secondary)]" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
