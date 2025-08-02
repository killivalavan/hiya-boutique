import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

// Types
type CloudinaryFile = {
  url: string;
  public_id: string;
  badge?: string | null;
};

type FallbackImageProps = React.ComponentProps<typeof Image> & {
  fallback?: string;
  src: string;
};

function FallbackImage({
  src,
  fallback = '/image-not-found.png',
  onError,
  onLoadingComplete,
  ...props
}: FallbackImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const erroredRef = useRef(false);

  useEffect(() => {
    setCurrentSrc(src);
    erroredRef.current = false;
  }, [src]);

  return (
    <Image
      {...props}
      src={currentSrc}
      onError={(e) => {
        if (!erroredRef.current) {
          erroredRef.current = true;
          setCurrentSrc(fallback);
        }
        if (onError) onError(e as any);
      }}
      onLoadingComplete={(res) => {
        if (onLoadingComplete) onLoadingComplete(res);
      }}
    />
  );
}

export default function GalleryPage({
  title,
  images,
  slug
}: {
  title: string;
  images: CloudinaryFile[];
  slug: string;
}) {
  const [galleryImages, setGalleryImages] = useState<CloudinaryFile[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isModalImageLoaded, setIsModalImageLoaded] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const imagesPerPage = 12;
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});
  const [recentlyAdded, setRecentlyAdded] = useState<Set<string>>(new Set());
  const fallbackImage = '/image-not-found.png';
  const preloaded = useRef<Set<string>>(new Set());

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleImageLoad = (url: string) => {
    setLoadedImages((prev) => ({ ...prev, [url]: true }));
  };

  const handleImageError = (url: string) => {
    setErrorImages((prev) => ({ ...prev, [url]: true }));
  };

  const getThumbnailUrl = (url: string) =>
    url.includes('/upload/') ? url.replace('/upload/', '/upload/w_500,q_70/') : url;

  const getModalUrl = (url: string, zoomed: boolean, mobile: boolean) => {
    if (!url.includes('/upload/')) return url;
    let size: string;
    if (mobile) {
      size = zoomed ? 'w_900,q_80' : 'w_600,q_70';
    } else {
      size = zoomed ? 'w_1200,q_80' : 'w_900,q_70';
    }
    return url.replace('/upload/', `/upload/${size}/`);
  };

  const getBadgeGradientClass = (badge: string) => {
    switch (badge) {
      case 'Best Seller':
        return 'from-pink-500 to-red-600';
      case 'Trending':
        return 'from-yellow-400 to-orange-500';
      case 'New':
        return 'from-green-400 to-green-600';
      case '100+ Bought':
        return 'from-sky-500 to-blue-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const preloadImage = (url: string) => {
    if (!preloaded.current.has(url)) {
      const img = new window.Image();
      img.src = url;
      preloaded.current.add(url);
    }
  };

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 768);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    const storageKey = `gallery_${title}`;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        const newOrUpdated = images.filter((img) =>
          !parsed.some((p: any) => p.url === img.url && p.badge === img.badge)
        );
        if (newOrUpdated.length > 0) {
          setRecentlyAdded(new Set(newOrUpdated.map((f) => f.url)));
          setTimeout(() => setRecentlyAdded(new Set()), 3000);
          localStorage.setItem(storageKey, JSON.stringify(images));
          setGalleryImages(images);
        } else {
          setGalleryImages(parsed);
        }
      } else {
        localStorage.setItem(storageKey, JSON.stringify(images));
        setGalleryImages(images);
      }
    } catch (e) {
      console.error('LocalStorage parse error:', e);
      setGalleryImages(images);
    }
    setTimeout(() => setIsInitialLoading(false), 500);
  }, [title, images]);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, galleryImages]);

  const currentIndex = useMemo(
    () => galleryImages.findIndex((img) => img.url === selectedImage),
    [selectedImage, galleryImages]
  );

  useEffect(() => {
    if (!selectedImage) return;
    const preloadNext = galleryImages.slice(currentIndex + 1, currentIndex + 6);
    const preloadPrev = galleryImages.slice(Math.max(0, currentIndex - 5), currentIndex);
    [...preloadNext, ...preloadPrev].forEach((img) => preloadImage(img.url));
  }, [selectedImage, currentIndex, galleryImages]);

  useEffect(() => {
    if (selectedImage) {
      setIsModalImageLoaded(false);
    }
  }, [isZoomed, selectedImage]);

  const showPrevImage = () => {
    if (currentIndex > 0) {
      const prevImg = galleryImages[currentIndex - 1];
      setSelectedImage(prevImg.url);
      setIsModalImageLoaded(false);
      setIsZoomed(false);
    }
  };

  const showNextImage = () => {
    if (currentIndex < galleryImages.length - 1) {
      const nextImg = galleryImages[currentIndex + 1];
      setSelectedImage(nextImg.url);
      setIsModalImageLoaded(false);
      setIsZoomed(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current && touchEndX.current) {
      const deltaX = touchEndX.current - touchStartX.current;
      if (deltaX > 50) showPrevImage();
      else if (deltaX < -50) showNextImage();
    }
  };

  const handleDoubleClick = () => {
    setIsZoomed((prev) => !prev);
  };

  const loadMoreImages = () => {
    if (page * imagesPerPage < galleryImages.length) {
      setPage((prev) => prev + 1);
    }
  };

  const imagesToShow = galleryImages.slice(0, page * imagesPerPage);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b p-8">
        <h1 className="text-xl sm:text-2xl font-bold text-start text-gray-800 mb-8">{title}</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {isInitialLoading
            ? Array.from({ length: imagesPerPage }).map((_, index) => (
                <div key={index} className="relative w-full pt-[133.33%] bg-gray-300 animate-pulse rounded-lg" />
              ))
            : imagesToShow.map((img, idx) => {
                const displayUrl = errorImages[img.url] ? fallbackImage : getThumbnailUrl(img.url);
                return (
                  <div
                    key={img.public_id}
                    className={`relative cursor-pointer group w-full ${
                      recentlyAdded.has(img.url) ? 'ring-[3px] ring-[#FFD700] animate-pulse' : ''
                    }`}
                  >
                    {img.badge && (
                      <span
                        className={`absolute top-2 left-2 z-20 px-2 py-[2px] text-[10px] font-semibold text-white rounded-full shadow bg-gradient-to-r ${getBadgeGradientClass(
                          img.badge
                        )}`}
                      >
                        {img.badge}
                      </span>
                    )}

                    <div className="relative w-full pt-[133.33%]">
                      {!loadedImages[img.url] && (
                        <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg z-10" />
                      )}
                      <Image
                        src={displayUrl}
                        alt={`${title} thumbnail ${idx + 1}`}
                        fill
                        className={`object-cover rounded-lg shadow-lg group-hover:opacity-80 transition-opacity duration-300 ${
                          loadedImages[img.url] ? 'opacity-100' : 'opacity-0'
                        } ${slug === 'whatsapp-testimonials' ? 'object-cover' : ''}`}
                        loading="lazy"
                        onLoadingComplete={() => handleImageLoad(img.url)}
                        onError={() => handleImageError(img.url)}
                        onClick={() => {
                          setSelectedImage(img.url);
                          setIsModalImageLoaded(false);
                          setIsZoomed(false);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
        </div>

        {!isInitialLoading && (
          <div className="flex justify-center mt-8">
            <button
              className="text-black px-6 py-2 rounded-lg transition"
              onClick={loadMoreImages}
              disabled={page * imagesPerPage >= galleryImages.length}
            >
              {page * imagesPerPage < galleryImages.length ? 'Tap to load more...' : ''}
            </button>
          </div>
        )}

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative bg-white p-4 sm:p-9 rounded-lg max-w-4xl w-full mx-2 sm:mx-6 max-h-[100vh] overflow-y-auto"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <button
                  className="absolute top-2 right-4 text-black text-3xl"
                  onClick={() => {
                    setSelectedImage(null);
                    setIsModalImageLoaded(false);
                    setIsZoomed(false);
                  }}
                >
                  &times;
                </button>

                <div className="text-center text-sm text-gray-600 mb-2">
                  {currentIndex + 1} of {galleryImages.length}
                </div>

                <div className="flex items-center justify-center mb-4 relative w-full max-h-[75vh] overflow-hidden">
                  {currentIndex > 0 && (
                    <button
                      onClick={showPrevImage}
                      className="absolute left-2 sm:left-4 z-30 text-white text-xl sm:text-2xl bg-black bg-opacity-50 hover:bg-opacity-80 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                      aria-label="Previous image"
                    >
                      &#10094;
                    </button>
                  )}

                  <div className="relative w-full max-w-[90%] max-h-[75vh] flex justify-center items-center overflow-auto">
                    {!isModalImageLoaded && (
                      <div className="absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse rounded-lg z-10" />
                    )}
                    <FallbackImage
                      key={`${selectedImage}-${isZoomed ? 'zoomed' : 'normal'}-${isMobile ? 'mobile' : 'desktop'}`}
                      src={
                        errorImages[selectedImage!]
                          ? fallbackImage
                          : getModalUrl(selectedImage!, isZoomed, isMobile)
                      }
                      fallback={fallbackImage}
                      alt={`${title} modal image ${currentIndex + 1}`}
                      width={
                        isMobile ? (isZoomed ? 900 : 600) : isZoomed ? 1200 : 900
                      }
                      height={
                        isMobile ? (isZoomed ? 600 : 400) : isZoomed ? 800 : 600
                      }
                      sizes="(max-width: 768px) 90vw, 800px"
                      className={`w-full h-auto max-h-[75vh] object-contain rounded-lg z-20 ${
                        isModalImageLoaded ? 'opacity-100' : 'opacity-0'
                      } transition-opacity duration-300`}
                      onLoadingComplete={() => setIsModalImageLoaded(true)}
                      onError={() => handleImageError(selectedImage!)}
                      onDoubleClick={handleDoubleClick}
                    />
                  </div>

                  {currentIndex < galleryImages.length - 1 && (
                    <button
                      onClick={showNextImage}
                      className="absolute right-2 sm:right-4 z-30 text-white text-xl sm:text-2xl bg-black bg-opacity-50 hover:bg-opacity-80 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                      aria-label="Next image"
                    >
                      &#10095;
                    </button>
                  )}
                </div>

                {!(slug === 'whatsapp-testimonials' || slug === 'clients-gallery') && (
                  <WhatsAppButton
                    message={`Hi, I'm interested in the ${title} collection - ${selectedImage}`}
                    large
                    text={
                      slug === 'aari-embroidery-designing-customisation' ||
                      slug === 'customization-custom-tailoring' ||
                      slug === 'pre-pleating' ||
                      slug === 'mehendi-art' ||
                      slug === 'bridal-makeup-hair-style' ||
                      slug === 'training'
                        ? 'Book now!'
                        : 'Get The Latest Collections'
                    }
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!selectedImage && <WhatsAppButton />}
      <Footer />
    </>
  );
}
