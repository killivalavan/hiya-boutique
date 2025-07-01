import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { FaWhatsapp } from 'react-icons/fa';
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [skeletonLoading, setSkeletonLoading] = useState(true); // Track skeleton loading state
  const imagesPerPage = 12;

  const handleWhatsApp = (img: string, title: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in the ${title} collection - ${img}`);
    const phoneNumber = process.env.WHATSAPP_NUMBER;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const loadMoreImages = () => {
    if (page * imagesPerPage < images.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Disable page scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
      document.body.style.overflow = 'auto'; // Enable scroll
    }

    // After images are loaded, stop showing skeleton
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 2000); // Set 2-second delay for skeleton to show

    return () => clearTimeout(timer); // Cleanup timeout
  }, [selectedImage]);

  // Close modal if clicking outside the modal content
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b p-8">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-8 text-start">{title}</h1>

        {/* Gallery Grid - Displaying smaller thumbnail images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {images
            .slice(0, page * imagesPerPage)
            .map((img) => (
              <div key={img} className="relative cursor-pointer group">
                {/* Show Skeleton while image is loading */}
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
                    onClick={() => setSelectedImage(img)} // Set selected image to open modal
                  />
                )}
              </div>
            ))}
        </div>

        {/* Load more images button */}
        <div className="flex justify-center mt-8">
          <button
            className="text-black px-6 py-2 rounded-lg transition"
            onClick={loadMoreImages}
            disabled={page * imagesPerPage >= images.length}
          >
            {page * imagesPerPage < images.length ? 'Tap to load more...' : ''}
          </button>
        </div>

        {/* Modal for Selected Image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="relative bg-white p-9 rounded-lg max-w-4xl w-full mx-6 max-h-[100vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Icon */}
              <button
                className="absolute top-[-0.2em] text-black text-3xl right-[0.2em]"
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </button>

              {/* Display Full Image in Modal */}
              <div className="flex justify-center mb-4">
                <Image
                  src={`/${imageFolder}/${selectedImage}`}
                  alt={selectedImage}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[75vh] object-contain"
                />
              </div>

              {/* WhatsApp Button */}
              <WhatsAppButton
                message={`Hi, I'm interested in the ${title} collection - ${selectedImage}`}
                large
                text="Get The Latest Collections"
              />
            </div>
          </div>
        )}
      </div>

      {/* Conditionally render WhatsAppButton when modal is not open */}
      {!selectedImage && <WhatsAppButton />}
      <Footer />
    </>
  );
}
