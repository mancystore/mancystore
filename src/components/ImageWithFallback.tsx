import React, { useState } from 'react';
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
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If no src is provided, immediately treat as fallback
  const effectiveSrc = hasError || !src ? fallbackSrc : src;

  return (
    <div className={`relative overflow-hidden bg-[#ECEAE3] ${containerClassName}`}>
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-[#E8E6DF] animate-pulse z-0" />
      )}

      {/* Actual Image */}
      <img
        {...props}
        src={effectiveSrc}
        alt={alt}
        loading={props.loading || 'lazy'}
        referrerPolicy="no-referrer"
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setIsLoading(false);
          }
        }}
        className={`${className} transition-opacity duration-300 ${
          isLoading && !hasError ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Fallback Graphic Overlay when image fails completely */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none bg-[#ECEAE3]">
          <div className="w-10 h-10 mb-2 opacity-40">
            <img
              src={FALLBACK_ASSETS.productGarment}
              alt="MNC Silhouette"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#858585]">
            MNC // ASSET PENDING
          </span>
          <span className="font-mono text-[8px] text-[#9A9A91] uppercase tracking-wider mt-0.5">
            [ PROTOTYPE PLACEHOLDER ]
          </span>
        </div>
      )}

      {/* Optional subtle prototype watermark badge (for asset audit mode) */}
      {showPrototypeIndicator && (
        <div className="absolute bottom-2 left-2 pointer-events-none bg-[#111111]/70 backdrop-blur-xs text-[#F5F4F0] text-[7.5px] font-mono uppercase tracking-widest px-1.5 py-0.5 z-10">
          PROTOTYPE
        </div>
      )}
    </div>
  );
};
