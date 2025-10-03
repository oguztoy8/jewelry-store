const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all products from the API
 * @param {Object} filters - Optional filters (minPrice, maxPrice, minPopularity, maxPopularity)
 * @returns {Promise<Object>} Product data
 */
export async function fetchProducts(filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.minPopularity) queryParams.append('minPopularity', filters.minPopularity);
    if (filters.maxPopularity) queryParams.append('maxPopularity', filters.maxPopularity);
    
    const url = `${API_URL}/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product data
 */
export async function fetchProductById(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}