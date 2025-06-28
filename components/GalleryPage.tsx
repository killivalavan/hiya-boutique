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
  const imagesPerPage = 12; // Number of images to load per page

  // Handle WhatsApp message
  const handleWhatsApp = (img: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in: ${img}`);
    const phone = '7299927172'; // your number here
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  // Load more images function
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

    // Cleanup: reset scroll when modal is closed
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  // Close modal if clicking outside the modal content
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b p-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-800 mb-8">{title}</h1>

        {/* Gallery Grid - Displaying smaller thumbnail images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {images
            .slice(0, page * imagesPerPage)
            .map((img) => (
              <div key={img} className="relative cursor-pointer group">
                {/* Thumbnail Image */}
                <Image
                  src={`/${imageFolder}/${img}`}
                  alt={img}
                  width={400} // Thumbnails with a fixed size (adjust as needed)
                  height={300} // Thumbnails with a fixed size (adjust as needed)
                  className="w-full h-full object-cover rounded-lg shadow-lg group-hover:opacity-80 transition-opacity duration-300"
                  loading="lazy"
                  onClick={() => setSelectedImage(img)} // Set selected image to open modal
                />
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
            onClick={closeModal} // Close modal when clicking the gray area
          >
            <div
              className="relative bg-white p-9 rounded-lg max-w-4xl w-full mx-6 max-h-[100vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside the modal content
            >
              {/* Close Icon */}
              <button
                className="absolute top-[-0.2em] text-black text-3xl right-[0.2em]"
                onClick={() => setSelectedImage(null)} // Close the modal by setting selectedImage to null
              >
                &times;
              </button>

              {/* Display Full Image in Modal */}
              <div className="flex justify-center mb-4">
                <Image
                  src={`/${imageFolder}/${selectedImage}`} // Full-size image shown in modal
                  alt={selectedImage}
                  width={1200} // Full-size image width
                  height={800} // Full-size image height
                  className="w-full h-auto max-h-[75vh] object-contain"
                />
              </div>

              {/* WhatsApp Button */}
              <button
                onClick={() => handleWhatsApp(selectedImage)}
                className="flex bg-green-600 text-white px-6 py-3 rounded-lg block mx-auto mt-4 hover:bg-green-700 transition"
              >
                <FaWhatsapp className="inline-block mr-2 text-2xl" />
                Get The Best Price
              </button>
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
