import { useEffect } from 'react';

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

export default function ImageModal({ src, alt, onClose }: Props) {
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, [onClose]);

  const imageName = src.split('/').pop();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-3xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl font-bold"
        >
          ✕
        </button>
        <img src={src} alt={alt} className="w-full h-auto rounded shadow-lg" />
        <a
          href={`https://wa.me/91YOURNUMBER?text=Hi, I'm interested in: ${imageName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
