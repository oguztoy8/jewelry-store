import { useState, useEffect } from 'react';
import ProductCarousel from './components/ProductCarousel';
import FilterPanel from './components/FilterPanel';
import { fetchProducts } from './services/api';
import { Loader2 } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [goldPrice, setGoldPrice] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    loadProducts(filters);
  }, []);

  const loadProducts = async (appliedFilters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchProducts(appliedFilters);
      
      if (data.success) {
        setProducts(data.products);
        setGoldPrice(data.goldPricePerGram);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError('Unable to connect to the server. Please make sure the backend is running.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    loadProducts(newFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600 font-light">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-normal mb-2">Error</h2>
          <p className="text-gray-600 mb-4 font-light">{error}</p>
          <button
            onClick={() => loadProducts(filters)}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-light"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-light tracking-wide">Product List</h1>
              <div className="hidden sm:block h-px w-12 bg-gray-300" />
              <span className="hidden sm:inline text-xs text-gray-400 font-light">Avenir - Book - 45</span>
            </div>
            <FilterPanel onFilterChange={handleFilterChange} isLoading={loading} />
          </div>
          
          {goldPrice && (
            <div className="mt-3 text-xs text-gray-500 font-light">
              Current Gold Price: <span className="font-normal">${goldPrice} USD/gram</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg font-light">No products found matching your criteria.</p>
            <button
              onClick={() => handleFilterChange({})}
              className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-light"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-gray-500 font-light">
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
            </div>
            <ProductCarousel products={products} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-xs text-gray-400 font-light">
            <p>Jewelry Store © 2024 - Product Listing Application</p>
            <p className="mt-1">Prices are calculated based on real-time gold prices</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;