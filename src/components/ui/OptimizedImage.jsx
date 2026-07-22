import { useState, useEffect, useRef } from 'react';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';

export default function OptimizedImage({
  src,
  alt = '',
  className = '',
  width = 600,
  quality = 75,
  format = 'webp',
  priority = false,
  containerClassName = '',
  onLoad,
  style = {},
  ...props
}) {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);

  const optimizedSrc = getOptimizedImageUrl(src, { width, quality, format });

  useEffect(() => {
    if (!src) {
      setIsLoaded(true);
      return;
    }

    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }

    // Safety fallback timer to ensure images never stay hidden
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, priority ? 50 : 300);

    return () => clearTimeout(timer);
  }, [src, optimizedSrc, priority]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  if (containerClassName) {
    return (
      <div className={`relative overflow-hidden ${containerClassName}`}>
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-paper/10 animate-pulse z-0 rounded-[inherit]" />
        )}
        <img
          ref={imgRef}
          src={hasError ? src : optimizedSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={style}
          {...props}
        />
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={hasError ? src : optimizedSrc}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      className={`${className} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={style}
      {...props}
    />
  );
}
