/**
 * Takes an image URL and returns an optimized version with appropriate dimensions, quality, and WebP format.
 * Currently optimizes Unsplash URLs by adding/modifying URL parameters.
 * 
 * @param {string} url Original image URL
 * @param {object} options Optimization options
 * @param {number} options.width Target image width in px (default: 600)
 * @param {number} options.quality Quality compression 1-100 (default: 75)
 * @param {string} options.format Image format 'webp'|'avif'|'jpg' (default: 'webp')
 * @returns {string} Optimized image URL
 */
export function getOptimizedImageUrl(url, { width = 600, quality = 75, format = 'webp' } = {}) {
  if (!url || typeof url !== 'string') return url;

  // Optimize Unsplash images
  if (url.includes('images.unsplash.com')) {
    try {
      const parsedUrl = new URL(url);
      parsedUrl.searchParams.set('auto', 'format');
      parsedUrl.searchParams.set('fit', 'crop');
      parsedUrl.searchParams.set('w', width.toString());
      parsedUrl.searchParams.set('q', quality.toString());
      parsedUrl.searchParams.set('fm', format);
      return parsedUrl.toString();
    } catch {
      return url;
    }
  }

  return url;
}
