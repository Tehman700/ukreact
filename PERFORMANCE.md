# Performance & Caching Setup

## Implemented Optimizations

### 1. Build-time Optimizations (vite.config.ts)
- **Content-based hashing**: All assets include hash in filename for cache busting
- **Code splitting**: Vendor libraries separated into chunks for better caching
- **Asset inlining**: Small files (<4KB) inlined to reduce HTTP requests
- **CSS code splitting**: Splits CSS per route for faster initial load
- **ES Build minification**: Fast and effective code minification

### 2. HTTP Caching Headers (public/_headers)
- **Static assets**: 1 year cache (immutable)
- **JavaScript/CSS with hash**: 1 year cache (immutable)
- **Images**: 1 year cache (immutable)
- **Fonts**: 1 year cache (immutable)
- **HTML files**: No cache (always fresh)
- **Service Worker**: No cache (always fresh)

### 3. Service Worker (public/sw.js)
- **Cache strategy**:
  - API requests: Network only
  - Images/fonts/CSS: Cache first, update in background
  - JavaScript/HTML: Network first, fallback to cache
- **Version management**: Auto-cleanup old caches
- **Offline support**: Basic offline functionality for cached assets

### 4. PWA Manifest (public/manifest.json)
- Progressive Web App support
- Install to home screen capability
- Standalone display mode

### 5. Component Optimizations
- React.memo() applied to static pages
- Lazy loading for large components (already implemented)
- Code splitting per route

## Browser Caching Strategy

```
┌─────────────────────┬──────────────┬───────────────────┐
│ Asset Type          │ Cache Time   │ Strategy          │
├─────────────────────┼──────────────┼───────────────────┤
│ JS/CSS with hash    │ 1 year       │ Immutable         │
│ Images              │ 1 year       │ Immutable         │
│ Fonts               │ 1 year       │ Immutable         │
│ HTML                │ No cache     │ Always fresh      │
│ Service Worker      │ No cache     │ Always fresh      │
│ Manifest            │ 1 day        │ Revalidate        │
└─────────────────────┴──────────────┴───────────────────┘
```

## Performance Benefits

1. **Faster repeat visits**: Static assets cached for 1 year
2. **Smaller bundle sizes**: Code splitting reduces initial load
3. **Better browser caching**: Content-based hashing enables long-term caching
4. **Offline capability**: Service worker provides basic offline support
5. **Reduced bandwidth**: Cached assets don't require re-downloading

## Testing Cache Performance

### 1. Check Build Output
```bash
npm run build
```
Look for hashed filenames like: `assets/index-BWZaz1Jo.css`

### 2. Test in Browser DevTools
- Open DevTools > Network tab
- Load page twice
- Second load should show "(disk cache)" or "(memory cache)" for assets

### 3. Lighthouse Performance Test
```bash
npm install -g lighthouse
lighthouse https://your-domain.com --view
```

### 4. Verify Service Worker
- Open DevTools > Application > Service Workers
- Should see registered service worker in production

## Server Configuration

### For Netlify/Vercel
The `_headers` file is automatically recognized.

### For Apache (.htaccess)
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
```

### For Nginx
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

location = /index.html {
  add_header Cache-Control "no-cache, must-revalidate";
}
```

## Additional Performance Tips

1. **Image Optimization**:
   - Use WebP format where possible
   - Compress images before uploading
   - Use appropriate image sizes (don't serve 4K images for thumbnails)

2. **Lazy Load Images**:
   - Use `loading="lazy"` on img tags
   - Defer offscreen images

3. **Preload Critical Assets**:
   - Already implemented in index.html with preconnect
   - Consider adding `<link rel="preload">` for critical CSS/JS

4. **Monitor Bundle Size**:
   - Run `npm run build` regularly
   - Keep eye on chunk size warnings
   - Consider dynamic imports for large features

5. **CDN Usage**:
   - Deploy to a CDN (Netlify, Vercel, Cloudflare)
   - Enable compression (Gzip/Brotli)
   - Use edge caching

## Monitoring Performance

Track these metrics:
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Total Blocking Time (TBT)**: < 200ms
- **Cumulative Layout Shift (CLS)**: < 0.1

Use Google PageSpeed Insights: https://pagespeed.web.dev/
