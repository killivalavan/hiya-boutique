import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useLockBodyScroll } from '../lib/useLockBodyScroll'; // adjust path if needed

export default function PopupModal() {
  const [show, setShow] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // lock body when modal is open
  useLockBodyScroll(isEnabled && show);

  useEffect(() => {
    fetch('/api/popup-flag')
      .then(res => res.json())
      .then(data => {
        if (data.enabled) {
          setIsEnabled(true);
          const alreadyShown = sessionStorage.getItem('hiya-popup-shown');
          if (!alreadyShown) {
            setShow(true);
            sessionStorage.setItem('hiya-popup-shown', 'true');
          }
          intervalRef.current = setInterval(() => {
            setShow(true);
          }, 2 * 60 * 1000);
        }
      })
      .catch(err => console.error('Failed to fetch popup flag:', err));

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
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

          <h2 className="text-center text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            ✨ Hiya Star Client Offer ✨
          </h2>

          <p className="text-sm sm:text-base text-gray-700 mb-2 leading-relaxed">
            Share your picture in a <span className="font-semibold text-pink-600">Hiya outfit</span> + post a review on social media{' '}
            <span className="font-semibold text-green-600">tagging us ⭐</span>
          </p>

          <p className="text-sm text-gray-600 mt-2">
            ✅ Get <span className="font-bold text-green-600">featured</span> on Hiya’s official website
          </p>

          <p className="text-sm text-gray-600 mt-1">
            ✅ Enjoy <span className="font-bold text-pink-600">FLAT 10% OFF</span> on your next customization order
          </p>

          <p className="mt-2 text-sm text-gray-700 italic">
            💫 Show off your style. Get rewarded.
          </p>

          <ul className="mt-3 text-xs sm:text-sm text-gray-500 list-disc list-inside">
            <li>Offer valid only for genuine posts with Hiya outfits</li>
            <li>Terms & Conditions apply</li>
          </ul>

          <a
            href="https://wa.me/917299927172?text=Hi, I want to avail the Hiya Star Client Offer!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-5 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full transition text-sm font-medium w-full"
          >
            <FaWhatsapp className="text-xl" />
            Share & Claim
          </a>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
