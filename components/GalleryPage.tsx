import { useState } from 'react';

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

  const handleWhatsApp = (img: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in: ${img}`);
    const phone = '91XXXXXXXXXX'; // your number here
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img} className="cursor-pointer" onClick={() => setSelectedImage(img)}>
            <img
              src={`/${imageFolder}/${img}`}
              alt={img}
              className="w-full h-auto rounded shadow"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded shadow-lg max-w-3xl w-full mx-6">
            <button
              className="absolute top-2 right-4 text-black text-xl"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={`/${imageFolder}/${selectedImage}`}
              alt={selectedImage}
              className="w-full h-auto mb-4"
            />
            <button
              onClick={() => handleWhatsApp(selectedImage)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 block mx-auto"
            >
              WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
