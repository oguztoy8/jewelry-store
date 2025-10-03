import fetch from 'node-fetch';

let cachedGoldPrice = null;
let lastFetchTime = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 saat

/**
 * GoldAPI'den gram başına USD altın fiyatı çeker
 */
export async function getGoldPricePerGram() {
  const now = Date.now();

  // Cache kontrolü
  if (cachedGoldPrice && lastFetchTime && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedGoldPrice;
  }

  try {
    const response = await fetch("https://www.goldapi.io/api/XAU/USD", {
      method: "GET",
      headers: {
        "x-access-token": process.env.GOLDAPI_KEY,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    /**
     * GoldAPI dönen JSON örneği:
     * {
     *   "symbol": "XAU/USD",
     *   "price": 2345.67,       // ons başına USD fiyatı
     *   "price_gram_24k": 75.42 // gram başına USD fiyatı (24 ayar)
     * }
     */
    
    // Eğer API doğrudan gram fiyatı veriyorsa:
    const pricePerGram = data.price_gram_24k || (data.price / 31.1035);

    cachedGoldPrice = pricePerGram;
    lastFetchTime = now;

    return pricePerGram;
  } catch (error) {
    console.error("Error fetching gold price:", error.message);
    // fallback
    return cachedGoldPrice || 60; // Varsayılan 60 USD/gram
  }
}

/**
 * Ürün fiyatını hesapla:
 * Price = (popularityScore + 1) * weight * goldPrice
 */
export function calculatePrice(popularityScore, weight, goldPricePerGram) {
  return (popularityScore + 1) * weight * goldPricePerGram;
}
