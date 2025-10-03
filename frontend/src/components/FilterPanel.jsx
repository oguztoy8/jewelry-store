import { useState } from 'react';
import { Filter, X } from 'lucide-react';

const FilterPanel = ({ onFilterChange, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minPopularity: '',
    maxPopularity: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    const appliedFilters = {};
    
    if (filters.minPrice) appliedFilters.minPrice = parseFloat(filters.minPrice);
    if (filters.maxPrice) appliedFilters.maxPrice = parseFloat(filters.maxPrice);
    if (filters.minPopularity) appliedFilters.minPopularity = parseFloat(filters.minPopularity);
    if (filters.maxPopularity) appliedFilters.maxPopularity = parseFloat(filters.maxPopularity);
    
    onFilterChange(appliedFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      minPopularity: '',
      maxPopularity: ''
    });
    onFilterChange({});
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <Filter size={20} />
        <span>Filters</span>
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-12 bg-white rounded-lg shadow-xl p-6 z-50 w-80 border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Price Range (USD)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleInputChange}
                  placeholder="Min"
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  min="0"
                  step="0.01"
                />
                <span className="self-center">-</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleInputChange}
                  placeholder="Max"
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Popularity Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Popularity Score (0-1)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minPopularity"
                  value={filters.minPopularity}
                  onChange={handleInputChange}
                  placeholder="Min"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  min="0"
                  max="1"
                  step="0.01"
                />
                <span className="self-center">-</span>
                <input
                  type="number"
                  name="maxPopularity"
                  value={filters.maxPopularity}
                  onChange={handleInputChange}
                  placeholder="Max"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  min="0"
                  max="1"
                  step="0.01"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleClearFilters}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleApplyFilters}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterPanel;