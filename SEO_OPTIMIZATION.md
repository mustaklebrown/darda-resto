# SEO Optimization for Darda Resto

## Overview

This document outlines all SEO improvements implemented for Darda Resto website (https://darda-resto-3eiv.vercel.app/) to improve visibility on Google search engine for the restaurant located in Moroni, Comoros.

## Implemented SEO Features

### 1. **Meta Tags & Metadata**

All pages now include comprehensive metadata:

#### Root Layout (`app/layout.tsx`)

- **Title Template**: Dynamic titles for all pages
- **Description**: Optimized for local search in Moroni, Comoros
- **Keywords**: 14+ targeted keywords including:
  - "restaurant Moroni"
  - "restaurant Comores"
  - "cuisine comorienne"
  - "restaurant traditionnel Moroni"
  - And more location-specific terms
- **Open Graph Tags**: For better social media sharing
- **Twitter Cards**: Enhanced Twitter previews
- **Canonical URLs**: Prevent duplicate content issues
- **Robots Meta**: Optimized for search engine crawling

#### Page-Specific Metadata

Each page has unique, optimized metadata:

- **Home** (`/`): Focus on general restaurant info and daily menu
- **Menu** (`/menu`): Emphasizes food offerings and specialties
- **About** (`/about`): Brand story and values
- **Contact** (`/contact`): Location and contact information
- **Reservation** (`/reservation`): Booking-focused keywords

### 2. **Structured Data (JSON-LD)**

Implemented Schema.org structured data on the homepage:

```json
{
  "@type": "Restaurant",
  "name": "Darda Resto",
  "address": {
    "addressLocality": "Moroni",
    "addressCountry": "KM"
  },
  "geo": {
    "latitude": -11.7172,
    "longitude": 43.2551
  },
  "servesCuisine": ["Comorienne", "Africaine", "Traditionnelle"],
  "openingHours": "Mo-Fr 08:00-22:00, Sa-Su 09:00-23:00",
  "acceptsReservations": true
}
```

This helps Google display:

- **Rich Snippets** in search results
- **Knowledge Panel** information
- **Local Business Card** with hours, location, and ratings
- **Map integration** in search results

### 3. **Sitemap (`sitemap.ts`)**

Dynamic XML sitemap including:

- Homepage (Priority: 1.0, Daily updates)
- Menu page (Priority: 0.9, Daily updates)
- Reservation page (Priority: 0.9, Weekly updates)
- About page (Priority: 0.8, Monthly updates)
- Contact page (Priority: 0.7, Monthly updates)

**URL**: https://darda-resto-3eiv.vercel.app/sitemap.xml

### 4. **Robots.txt (`robots.ts`)**

Configured to:

- Allow all search engines to crawl public pages
- Block admin, API, and auth routes
- Reference sitemap location

**URL**: https://darda-resto-3eiv.vercel.app/robots.txt

### 5. **Web App Manifest (`manifest.ts`)**

PWA support for:

- Mobile app-like experience
- Add to home screen functionality
- Offline capability preparation
- Better mobile SEO signals

**URL**: https://darda-resto-3eiv.vercel.app/manifest.json

## Local SEO Optimization

### Geographic Targeting

- **Country**: Comoros (KM)
- **City**: Moroni
- **Coordinates**: -11.7172, 43.2551
- **Language**: French (fr_KM locale)

### Local Keywords Targeted

1. restaurant Moroni
2. restaurant Comores
3. cuisine comorienne
4. restaurant traditionnel Moroni
5. plats comoriens
6. gastronomie Comores
7. restaurant Union des Comores
8. meilleur restaurant Moroni
9. spécialités comoriennes
10. réservation restaurant Moroni

## Next Steps for Better SEO

### 1. **Google Business Profile**

Create and verify a Google Business Profile:

- Add exact address in Moroni
- Upload high-quality photos
- Add business hours
- Encourage customer reviews
- Post regular updates

### 2. **Google Search Console**

- Submit sitemap: https://darda-resto-3eiv.vercel.app/sitemap.xml
- Monitor search performance
- Fix any crawl errors
- Track keyword rankings

### 3. **Content Optimization**

- Add blog section with Comorian recipes
- Create location-specific content
- Add customer testimonials with schema markup
- Include FAQ section with schema

### 4. **Technical SEO**

- Ensure all images have alt text
- Optimize image sizes (WebP format)
- Implement lazy loading
- Add breadcrumb navigation with schema
- Ensure mobile responsiveness

### 5. **Link Building**

- Get listed in Comoros business directories
- Partner with local tourism websites
- Engage with food bloggers
- Create social media presence

### 6. **Performance**

- Monitor Core Web Vitals
- Optimize loading speed
- Implement caching strategies
- Use CDN for static assets

## Monitoring & Analytics

### Recommended Tools

1. **Google Analytics 4**: Track user behavior
2. **Google Search Console**: Monitor search performance
3. **Google Business Profile**: Manage local presence
4. **Bing Webmaster Tools**: Additional search engine coverage

### Key Metrics to Track

- Organic search traffic
- Keyword rankings for "restaurant Moroni"
- Click-through rate (CTR)
- Bounce rate
- Time on site
- Conversion rate (reservations)
- Local pack rankings

## Schema Markup Benefits

The implemented structured data will help Google show:

- ⭐ Star ratings (when reviews are added)
- 📍 Location on maps
- 🕐 Opening hours
- 📞 Phone number
- 💰 Price range
- 🍽️ Cuisine type
- 📅 Reservation availability

## Mobile Optimization

All pages are mobile-optimized with:

- Responsive design
- Touch-friendly buttons
- Fast loading times
- PWA capabilities
- Mobile-first indexing ready

## Social Media Integration

Open Graph tags ensure beautiful previews on:

- Facebook
- WhatsApp
- LinkedIn
- Telegram
- Other social platforms

## Accessibility & SEO

Good accessibility = Better SEO:

- Semantic HTML structure
- Proper heading hierarchy (H1, H2, H3)
- Alt text for images
- ARIA labels where needed
- Keyboard navigation support

## Multilingual Considerations

Current setup:

- Primary language: French
- Locale: fr_KM (French - Comoros)

Future expansion:

- Consider adding Comorian language version
- Add English version for tourists
- Implement hreflang tags

## Conclusion

Your website now has enterprise-level SEO implementation with:
✅ Comprehensive metadata on all pages
✅ Structured data for rich snippets
✅ Dynamic sitemap and robots.txt
✅ PWA manifest for mobile
✅ Local business optimization
✅ Open Graph and Twitter Cards
✅ Proper canonical URLs
✅ Search engine friendly architecture

The next critical step is to **submit your sitemap to Google Search Console** and **create a Google Business Profile** to maximize local visibility in Moroni, Comoros.
