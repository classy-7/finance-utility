# Installation Guide

This guide will help you set up and run FinWise on your local machine.

## Prerequisites

- **Node.js**: 18.x or higher
- **pnpm**: Latest version (recommended) or npm/yarn
- **Git**: For cloning the repository

## Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd finance-tools
```

### 2. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### 3. Set Up Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys (see API_INTEGRATION.md for details):
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ALPHA_VANTAGE_API_KEY=your_api_key_here
# ... other environment variables
```

### 4. Run Development Server

```bash
pnpm dev
```

Or using npm:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Project Structure

```
finance-tools/
├── app/                      # Next.js App Router pages
│   ├── about/                # About page
│   ├── calculators/          # Calculator pages
│   ├── contact/              # Contact page
│   ├── cookie-policy/        # Cookie policy page
│   ├── data-source/          # Data sources page
│   ├── disclaimer/           # Disclaimer page
│   ├── editorial-policy/     # Editorial policy page
│   ├── learn/                # Educational content
│   ├── markets/              # Market data pages
│   ├── mutual-funds/         # Mutual fund pages
│   ├── news/                 # News pages
│   ├── privacy/              # Privacy policy page
│   ├── stocks/               # Stock pages
│   ├── terms/                # Terms of service page
│   ├── watchlist/            # Watchlist page
│   ├── compare/              # Comparison page
│   ├── api/                  # API routes
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/               # React components
│   ├── calculators/          # Calculator components
│   ├── home/                 # Homepage components
│   ├── layout/               # Layout components
│   ├── markets/              # Market components
│   ├── search/               # Search components
│   ├── shared/               # Shared components
│   ├── theme-provider.tsx    # Theme provider
│   └── ui/                   # UI components (shadcn/ui)
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
│   ├── finance/              # Financial calculation logic
│   ├── format.ts             # Formatting utilities
│   ├── learn-content.ts      # Educational content
│   ├── market-hours.ts       # Market hours logic
│   ├── search-index.ts       # Search indexing
│   ├── site-config.ts        # Site configuration
│   └── utils.ts              # General utilities
├── public/                   # Static assets
├── services/                 # API services
│   ├── demo-data.ts          # Demo data
│   ├── marketApi.ts          # Market API integration
│   └── types.ts              # TypeScript types
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore file
├── components.json          # shadcn/ui configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Project dependencies
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Development Workflow

1. **Make changes** to components, pages, or styles
2. **Hot reload** will automatically update the browser
3. **Test with demo data** first (no API keys required)
4. **Add API keys** to `.env` when ready to test real data
5. **Build and test** production build before deploying

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can either:
- Stop the process using port 3000
- Or use a different port:
  ```bash
  PORT=3001 pnpm dev
  ```

### Dependencies Issues

If you encounter dependency issues:
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript Errors

If you see TypeScript errors:
```bash
# Regenerate TypeScript types
pnpm build
```

### Styles Not Loading

If Tailwind CSS styles are not loading:
1. Check `tailwind.config.ts` is correct
2. Verify `postcss.config.mjs` is present
3. Restart the development server

## Production Build

### Build for Production

```bash
pnpm build
```

### Test Production Build Locally

```bash
pnpm build
pnpm start
```

### Environment Variables for Production

Make sure to set production environment variables:
- `NODE_ENV=production`
- `NEXT_PUBLIC_SITE_URL=your-production-url`
- All API keys for production use

## Browser Support

FinWise supports modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Next Steps

1. **Read API_INTEGRATION.md** to connect real data APIs
2. **Customize the design** in `app/globals.css` and components
3. **Add your own content** to the Learn section
4. **Configure analytics** if needed
5. **Deploy to production** (see DEPLOYMENT.md)

## Support

For issues or questions:
- Check the documentation in this repository
- Review API_INTEGRATION.md for API setup
- Contact: contact@finwise.example.com
