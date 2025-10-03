import express from 'express';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getGoldPricePerGram, calculatePrice } from '../services/goldPrice.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


router.get('/', async (req, res) => {
  try {
    // Read products from JSON file
    const productsPath = join(__dirname, '../data/products.json');
    const productsData = await readFile(productsPath, 'utf-8');
    const products = JSON.parse(productsData);

    // Get current gold price
    const goldPrice = await getGoldPricePerGram();

    // Calculate prices and convert popularity to 5-star rating
    let processedProducts = products.map((product, index) => {
      const price = calculatePrice(product.popularityScore, product.weight, goldPrice);
      const popularityOutOfFive = ((product.popularityScore * 5)).toFixed(1);
      
      return {
        id: index + 1,
        name: product.name,
        price: parseFloat(price.toFixed(2)),
        popularityScore: product.popularityScore,
        popularityRating: parseFloat(popularityOutOfFive),
        weight: product.weight,
        images: product.images
      };
    });

    // Apply filters if provided
    const { minPrice, maxPrice, minPopularity, maxPopularity } = req.query;

    if (minPrice) {
      processedProducts = processedProducts.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      processedProducts = processedProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    if (minPopularity) {
      processedProducts = processedProducts.filter(p => p.popularityScore >= parseFloat(minPopularity));
    }

    if (maxPopularity) {
      processedProducts = processedProducts.filter(p => p.popularityScore <= parseFloat(maxPopularity));
    }

    res.json({
      success: true,
      goldPricePerGram: parseFloat(goldPrice.toFixed(2)),
      count: processedProducts.length,
      products: processedProducts
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    
    const productsPath = join(__dirname, '../data/products.json');
    const productsData = await readFile(productsPath, 'utf-8');
    const products = JSON.parse(productsData);

    if (productId < 1 || productId > products.length) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const product = products[productId - 1];
    const goldPrice = await getGoldPricePerGram();
    const price = calculatePrice(product.popularityScore, product.weight, goldPrice);
    const popularityOutOfFive = ((product.popularityScore * 5)).toFixed(1);

    res.json({
      success: true,
      product: {
        id: productId,
        name: product.name,
        price: parseFloat(price.toFixed(2)),
        popularityScore: product.popularityScore,
        popularityRating: parseFloat(popularityOutOfFive),
        weight: product.weight,
        images: product.images
      }
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

export default router;