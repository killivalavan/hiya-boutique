// components/WhatsAppTestimonials.tsx
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';

const screenshots = [
  '/whatsapp-testimonials/wa-1.jpeg',
  '/whatsapp-testimonials/wa-2.jpeg',
  '/whatsapp-testimonials/wa-3.jpeg',
  '/whatsapp-testimonials/wa-4.jpeg',
];

function WhatsAppImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative rounded-lg border-2 border-gray-300 p-2 shadow-lg bg-white w-full">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
      )}

      <img
        src={error ? '/default-image.jpeg' : src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={`w-full h-40 sm:h-48 md:h-64 object-cover rounded-md transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

export default function WhatsAppTestimonials() {
  return (
    <section className="bg-white py-12 px-4 text-center" id="wa-testimonials">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black">Words from WhatsApp</h2>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          Real words from our clients sharing their joy and trust in Hiya Fashions & Boutique.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {screenshots.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="w-full"
            >
              <WhatsAppImage src={img} alt={`WhatsApp feedback ${idx + 1}`} />
            </motion.div>
          ))}
        </div>

        <Link
          href="/gallery/whatsapp-testimonials"
          className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full mt-8 hover:bg-gray-900 transition"
        >
          <FaWhatsapp className="text-green-400 text-xl" />
          <span>View All WhatsApp Feedback</span>
        </Link>
      </div>
    </section>
  );
}
