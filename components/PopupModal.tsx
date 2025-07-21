import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function PopupModal() {
  const [show, setShow] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    fetch('/api/popup-flag')
      .then(res => res.json())
      .then(data => {
        if (data.enabled) {
          setIsEnabled(true);
          setShow(true);
          const interval = setInterval(() => setShow(true), 2 * 60 * 1000);
          return () => clearInterval(interval);
        }
      })
      .catch(err => console.error('Failed to fetch popup flag:', err));
  }, []);

  const closeModal = () => setShow(false);

  return (
    <AnimatePresence>
      {isEnabled && show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-xl text-gray-500 hover:text-black"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-center text-lg sm:text-xl font-bold mb-4 text-yellow-500">
              🎉 Aadi Special Offer at Hiya Fashions & Boutique! 🎉
            </h2>

            <p className="text-sm sm:text-base text-gray-700 mb-2 leading-relaxed">
              Book your <span className="font-semibold text-pink-600">Aari or Custom Stitching Blouses</span> / any outfit this Aadi month and get
              <span className="font-bold text-green-600"> FLAT 50% OFF</span> on
              <span className="font-semibold text-green-600"> Saree Pre-Pleating!</span> 💫
            </p>

            <p className="text-sm text-gray-600 mt-2">
              💥 Pre-pleating starts at <span className="line-through">₹500</span> – now just <span className="font-bold text-pink-600">₹250</span> this month!
            </p>

            <p className="mt-2 text-sm text-gray-700 italic">✨ Perfect pleats. Perfect look. Perfect price.</p>

            <ul className="mt-3 text-xs sm:text-sm text-gray-500 list-disc list-inside">
              <li>Offer valid for bookings made during the Aadi month only</li>
              <li>Terms & Conditions apply</li>
            </ul>

            <a
              href="https://wa.me/917299927172?text=Hi, I want to book my Aadi Special Offer at Hiya Boutique!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition text-sm font-medium w-full"
            >
              <FaWhatsapp className="text-xl" />
              Book Now
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
