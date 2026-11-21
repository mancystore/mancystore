
import React, { useEffect, useRef, useState } from 'react';
import { FALLBACK_ASSETS } from '../config/assets';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  containerClassName?: string;
  showPrototypeIndicator?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'MNC Garment',
  fallbackSrc = FALLBACK_ASSETS.placeholderNeutral,
  className = '',
  containerClassName = '',
  showPrototypeIndicator = false,
  loading,
  referrerPolicy,
  onLoad,
  onError,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [hasFallbackError, setHasFallbackError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset image state whenever the source changes, but detect if already cached.
  useEffect(() => {
    setHasError(false);
    setHasFallbackError(false);

    // If the image is already cached or completed, avoid blank flash
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [src, fallbackSrc]);

  // Use the fallback when the original image is missing or fails.
  const effectiveSrc = hasError || !src ? fallbackSrc : src;

  const handleLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setIsLoading(false);
    onLoad?.(event);
  };

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (!hasError && src && fallbackSrc && src !== fallbackSrc) {
      // Original image failed. Try the fallback image.
      setHasError(true);
      setIsLoading(true);
    } else {
      // Both the original and fallback images failed.
      setHasFallbackError(true);
      setIsLoading(false);
    }

    onError?.(event);
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#ECEAE3] ${containerClassName}`}
    >
      {/* Loading Skeleton */}
      {isLoading && !hasFallbackError && (
        <div
          className="absolute inset-0 z-0 animate-pulse bg-[#E8E6DF]"
          aria-hidden="true"
        />
      )}

      {/* Actual Image or Fallback */}
      {effectiveSrc && (
        <img
          {...props}
          ref={imgRef}
          src={effectiveSrc}
          alt={alt}
          loading={loading ?? 'lazy'}
          referrerPolicy={referrerPolicy ?? 'no-referrer'}
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* Final Placeholder if Both Images Fail */}
      {hasFallbackError && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-[#ECEAE3] p-4 text-center select-none"
          role="img"
          aria-label={`${alt} - image unavailable`}
        >
          <div className="mb-2 h-10 w-10 opacity-40">
            <img
              src={FALLBACK_ASSETS.productGarment}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-contain"
            />
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#858585]">
            MNC // ASSET PENDING
          </span>

          <span className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-[#9A9A91]">
            [ PROTOTYPE PLACEHOLDER ]
          </span>
        </div>
      )}

      {/* Prototype Indicator */}
      {showPrototypeIndicator && (
        <div className="pointer-events-none absolute bottom-2 left-2 z-10 bg-[#111111]/70 px-1.5 py-0.5 text-[7.5px] font-mono uppercase tracking-widest text-[#F5F4F0] backdrop-blur-sm">
          PROTOTYPE
        </div>
      )}
    </div>
  );
};
