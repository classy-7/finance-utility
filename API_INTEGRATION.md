# API Integration Guide

This document explains how to integrate real financial data APIs into FinWise.

## Architecture Overview

FinWise is built with a clean API service layer located in `services/`. The architecture supports:

- Multiple API providers with fallback options
- Environment-based configuration for API keys
- Caching to reduce API calls and improve performance
- Error handling and retry logic
- Rate limiting compliance

## Required APIs

### 1. Market Data APIs

#### Indian Market Data (Required for production)

**NSE (National Stock Exchange)**
- **Provider**: NSE India
- **Documentation**: https://www.nseindia.com/
- **Registration**: Required for official data
- **Rate Limits**: As per NSE terms
- **Cost**: Varies by subscription tier
- **Setup**:
  ```env
  NSE_API_KEY=your_nse_api_key
  NSE_API_SECRET=your_nse_api_secret
  ```

**BSE (Bombay Stock Exchange)**
- **Provider**: BSE India
- **Documentation**: https://www.bseindia.com/
- **Registration**: Required for official data
- **Rate Limits**: As per BSE terms
- **Cost**: Varies by subscription tier
- **Setup**:
  ```env
  BSE_API_KEY=your_bse_api_key
  BSE_API_SECRET=your_bse_api_secret
  ```

#### Global Market Data (Optional)

**Alpha Vantage** (Recommended for development)
- **Provider**: Alpha Vantage
- **Documentation**: https://www.alphavantage.co/documentation/
- **Registration**: Free tier available (25 requests/day)
- **Rate Limits**: 5 requests/minute (free), 600 requests/minute (paid)
- **Cost**: Free / $49.99/month
- **Setup**:
  ```env
  ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
  ```

**Twelve Data** (Alternative)
- **Provider**: Twelve Data
- **Documentation**: https://twelvedata.com/docs
- **Registration**: Free tier available (800 requests/day)
- **Rate Limits**: 8 requests/minute (free), 800 requests/minute (paid)
- **Cost**: Free / $49.99/month
- **Setup**:
  ```env
  TWELVE_DATA_API_KEY=your_twelve_data_api_key
  ```

### 2. Mutual Fund Data

**AMFI India** (Required for production)
- **Provider**: Association of Mutual Funds in India
- **Documentation**: https://www.amfiindia.com/
- **Registration**: Required for official data
- **Rate Limits**: As per AMFI terms
- **Cost**: Varies by subscription
- **Setup**:
  ```env
  AMFI_API_KEY=your_amfi_api_key
  ```

### 3. News APIs

**NewsAPI** (Recommended)
- **Provider**: NewsAPI
- **Documentation**: https://newsapi.org/docs
- **Registration**: Free tier available
- **Rate Limits**: 100 requests/day (free)
- **Cost**: Free / $449/month
- **Setup**:
  ```env
  NEWS_API_KEY=your_news_api_key
  ```

**GNews API** (Alternative)
- **Provider**: GNews
- **Documentation**: https://gnews.io/docs
- **Registration**: Free tier available
- **Rate Limits**: 100 requests/day (free)
- **Cost**: Free / $99/month
- **Setup**:
  ```env
  GNEWS_API_KEY=your_gnews_api_key
  ```

### 4. Currency Exchange Rates

**Exchange Rate API** (For currency converter)
- **Provider**: ExchangeRate-API
- **Documentation**: https://www.exchangerate-api.com/docs
- **Registration**: Free tier available
- **Rate Limits**: 1,500 requests/month (free)
- **Cost**: Free / $12.99/month
- **Setup**:
  ```env
  EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
  ```

## Integration Steps

### Step 1: Get API Keys

1. Register with the chosen API providers
2. Obtain your API keys
3. Add them to your `.env` file (do not commit `.env` to git)

### Step 2: Update API Service Files

The API service files are located in `services/`:

- `services/marketApi.ts` - Market data integration
- `services/demo-data.ts` - Demo data (replace with real API calls)

Update each service file to use your chosen APIs. Example pattern:

```typescript
// services/marketApi.ts
export async function getStockQuote(symbol: string) {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY
  const response = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
  )
  const data = await response.json()
  return transformData(data)
}
```

### Step 3: Update API Route Handlers

The API route handlers are in `app/api/`:

- `app/api/markets/indices/route.ts` - Indian indices
- `app/api/markets/stocks/route.ts` - Stock search
- `app/api/markets/quote/route.ts` - Stock quotes
- `app/api/funds/route.ts` - Mutual funds
- `app/api/news/route.ts` - News articles

Update these routes to call your API services instead of returning demo data.

### Step 4: Test Integration

1. Start the development server: `npm run dev`
2. Test each endpoint to ensure data is flowing correctly
3. Check browser console for any errors
4. Verify data display on frontend pages

## Security Best Practices

1. **Never expose API keys in client-side code**
   - All API calls should go through Next.js API routes
   - API keys should only be used server-side

2. **Use environment variables**
   - Store API keys in `.env` file
   - Add `.env` to `.gitignore`
   - Use different keys for development and production

3. **Implement rate limiting**
   - Respect API provider rate limits
   - Implement caching to reduce API calls
   - Use Redis for production caching

4. **Handle errors gracefully**
   - Show user-friendly error messages
   - Provide fallback to demo data if API fails
   - Log errors for debugging

## Caching Strategy

For production, implement caching to:

- Reduce API costs
- Improve performance
- Stay within rate limits

### Redis Setup (Optional but Recommended)

```env
REDIS_URL=redis://localhost:6379
```

Install Redis:
```bash
# Windows
# Download and install Redis from https://redis.io/download

# macOS
brew install redis
brew services start redis

# Linux
sudo apt-get install redis-server
sudo systemctl start redis
```

## Cost Estimation

### Development (Free Tier)
- Alpha Vantage: Free (25 requests/day)
- NewsAPI: Free (100 requests/day)
- Exchange Rate API: Free (1,500 requests/month)
- **Total**: $0/month

### Production (Paid Tier)
- NSE/BSE Data: ~₹10,000-50,000/month (varies by provider)
- AMFI Data: ~₹5,000-20,000/month
- NewsAPI: $449/month (~₹37,000/month)
- Exchange Rate API: $12.99/month (~₹1,000/month)
- **Total**: ~₹53,000-1,08,000/month

## Alternative: Use Data Aggregators

Consider using data aggregators that provide multiple data sources:

- **RapidAPI**: Multiple financial APIs in one place
- **Polygon.io**: Comprehensive financial data
- **IEX Cloud**: Real-time market data

## Troubleshooting

### API Returns 401/403
- Check API key is correct
- Verify API key has required permissions
- Check if API key is expired

### API Returns 429 (Too Many Requests)
- Implement rate limiting
- Add caching
- Upgrade to paid tier if needed

### Data Not Displaying
- Check browser console for errors
- Verify API route is returning data
- Check frontend is consuming API correctly
- Verify data transformation logic

### Demo Data Still Showing
- Check API keys are set in `.env`
- Restart development server after adding keys
- Verify API service files are updated

## Support

For API-specific issues, refer to the provider's documentation:
- Alpha Vantage: support@alphavantage.co
- NewsAPI: support@newsapi.org
- NSE: Contact through NSE website
- BSE: Contact through BSE website

For FinWise-specific integration issues, contact: contact@finwise.example.com
