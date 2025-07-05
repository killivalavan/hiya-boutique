import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

export default function GalleryPage({
  title,
  imageFolder,
  images,
}: {
  title: string;
  imageFolder: string;
  images: string[];
}) {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const imagesPerPage = 12;

  // Load images from localStorage or initial prop on mount
  useEffect(() => {
    const storageKey = `gallery_${imageFolder}`;
    let loaded = false;

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setGalleryImages(parsed);
          loaded = true;
        }
      }
    } catch (e) {
      console.error("Error parsing local storage:", e);
    }

    if (!loaded) {
      setGalleryImages(images);
      localStorage.setItem(storageKey, JSON.stringify(images));
    }
  }, [imageFolder, images]);

  // Handle skeleton loading timeout
  useEffect(() => {
    const timer = setTimeout(() => setSkeletonLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle body scroll locking on modal
  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
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
            <div key={img} className="relative cursor-pointer group">
              {skeletonLoading ? (
                <div className="w-full h-[300px] bg-gray-300 animate-pulse rounded-lg" />
              ) : (
                <Image
                  src={`/${imageFolder}/${img}`}
                  alt={img}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover rounded-lg shadow-lg group-hover:opacity-80 transition-opacity duration-300"
                  loading="lazy"
                  onClick={() => setSelectedImage(img)}
                />
              )}
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

        {/* Modal with framer motion */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative bg-white p-9 rounded-lg max-w-4xl w-full mx-6 max-h-[100vh] overflow-y-auto"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-[-0.2em] text-black text-3xl right-[0.2em]"
                  onClick={() => setSelectedImage(null)}
                >
                  &times;
                </button>

                <div className="flex justify-center mb-4">
                  <Image
                    src={`/${imageFolder}/${selectedImage}`}
                    alt={selectedImage}
                    width={1200}
                    height={800}
                    className="w-full h-auto max-h-[75vh] object-contain"
                  />
                </div>

                <WhatsAppButton
                  message={`Hi, I'm interested in the ${title} collection - ${selectedImage}`}
                  large
                  text="Get The Latest Collections"
                />
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
