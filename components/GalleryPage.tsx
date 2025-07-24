import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

type CloudinaryFile = {
  url: string;
  public_id: string;
  badge?: string | null;
};

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
  const imagesPerPage = 12;

  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [recentlyAdded, setRecentlyAdded] = useState<Set<string>>(new Set());
  const [isModalImageLoaded, setIsModalImageLoaded] = useState(false);

  const handleImageLoad = (url: string) => {
    setLoadedImages((prev) => ({ ...prev, [url]: true }));
  };

  const getThumbnailUrl = (url: string) =>
    url.includes('/upload/') ? url.replace('/upload/', '/upload/w_500,q_70/') : url;

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
          setRecentlyAdded(new Set(newOrUpdated.map(f => f.url)));
          setTimeout(() => setRecentlyAdded(new Set()), 3000);
          localStorage.setItem(storageKey, JSON.stringify(images));
          setGalleryImages(images); // 👈 Always take latest from props
        } else {
          setGalleryImages(parsed);
        }
      } else {
        localStorage.setItem(storageKey, JSON.stringify(images));
        setGalleryImages(images);
      }
    } catch (e) {
      console.error("LocalStorage parse error:", e);
      setGalleryImages(images);
    }
  }, [title, images]);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  const loadMoreImages = () => {
    if (page * imagesPerPage < galleryImages.length) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b p-8">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-8 text-start">{title}</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {galleryImages.slice(0, page * imagesPerPage).map((img) => (
            <div
              key={img.public_id}
              className={`relative cursor-pointer group w-full 
                ${recentlyAdded.has(img.url) ? 'ring-4 ring-green-400 animate-pulse' : ''}`}
            >
              {/* Badge UI */}
              {img.badge && (
                <span
                  className={`absolute top-2 left-2 z-20 px-2 py-[2px] text-[10px] font-semibold text-white 
                             rounded-full shadow
                             bg-gradient-to-r ${getBadgeGradientClass(img.badge)}`}
                >
                  {img.badge}
                </span>
              )}
              

              <div className="relative w-full pt-[133.33%]">
                {!loadedImages[img.url] && (
                  <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-lg z-10" />
                )}
                <Image
                  src={getThumbnailUrl(img.url)}
                  alt=""
                  fill
                  className={`object-cover rounded-lg shadow-lg group-hover:opacity-80 transition-opacity duration-300 
                    ${loadedImages[img.url] ? 'opacity-100' : 'opacity-0'} 
                    ${slug === 'whatsapp-testimonials' ? 'object-cover' : ''}`}
                  loading="lazy"
                  onLoadingComplete={() => handleImageLoad(img.url)}
                  onClick={() => {
                    setSelectedImage(img.url);
                    setIsModalImageLoaded(false);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="text-black px-6 py-2 rounded-lg transition"
            onClick={loadMoreImages}
            disabled={page * imagesPerPage >= galleryImages.length}
          >
            {page * imagesPerPage < galleryImages.length ? 'Tap to load more...' : ''}
          </button>
        </div>

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
                className="relative bg-white p-9 rounded-lg max-w-4xl w-full mx-6 max-h-[100vh] overflow-y-auto"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-[-0.2em] text-black text-3xl right-[0.2em]"
                  onClick={() => {
                    setSelectedImage(null);
                    setIsModalImageLoaded(false);
                  }}
                >
                  &times;
                </button>

                <div className="flex justify-center mb-4 relative w-full max-h-[75vh]">
                  {!isModalImageLoaded && (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse rounded-lg z-10" />
                  )}
                  <Image
                    src={selectedImage}
                    alt=""
                    width={1200}
                    height={800}
                    className={`w-full h-auto max-h-[75vh] object-contain rounded-lg z-20 ${
                      isModalImageLoaded ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-300`}
                    onLoadingComplete={() => setIsModalImageLoaded(true)}
                  />
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
