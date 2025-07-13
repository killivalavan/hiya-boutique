import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaYoutube, FaPhoneAlt, FaEnvelope, FaArrowUp, FaAngleRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { policyMap } from './policyDetails';

export default function Footer() {
  const email = "hiyatrends@gmail.com";
  const [showScrollButton, setShowScrollButton] = useState(false);
  const footerRef = useRef(null);
  const [modalContent, setModalContent] = useState<null | string>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowScrollButton(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const policyLinks = [
    "Terms of Service",
    "Privacy Policy",
    "Shipping Policy",
    "Refund Policy",
    "How to Order"
  ];

  return (
    <>
      <footer id="about" ref={footerRef} className="bg-black text-white px-6 pt-10 pb-4 text-sm relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:justify-items-center">

          {/* Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-1/2 justify-center">
            <Image className="w-full" src="/logo.png" alt="Logo" width={100} height={100} />
          </div>

          {/* Address */}
          <div>
            <h4 className="text-lg font-bold mb-2 bg-clip-text text-transparent w-fit"
              style={{ backgroundImage: 'linear-gradient(to right, #688245, #8CC63E)' }}>
              Address
            </h4>
            <p className="text-white text-sm leading-relaxed">
              Hiya Fashions & Boutique<br/>
              No. 21, RKV Avenue Main Road,<br/>
              Zamin Pallavaram,<br/>
              Chennai - 600117.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col md:items-start text-center md:text-left">
            <h4 className="text-lg font-bold mb-2 bg-clip-text text-transparent w-fit mr-auto"
              style={{ backgroundImage: 'linear-gradient(to right, #688245, #8CC63E)' }}>
              Contact Us
            </h4>
            <p className="flex items-center gap-2 text-white">
              <FaPhoneAlt /> +91 72999 27172
            </p>
            <p className="flex items-center gap-2 text-white">
              <FaPhoneAlt /> +91 86102 03368
            </p>
            <h4 className="text-lg font-bold mb-2 bg-clip-text text-transparent w-fit mt-5"
              style={{ backgroundImage: 'linear-gradient(to right, #688245, #8CC63E)' }}>
              Follow Us
            </h4>
            <div className="flex gap-4 mt-2 text-white text-lg">
              <a href="https://www.instagram.com/hiya_instore/" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.facebook.com/ilakkiya2017" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://www.youtube.com/@hiyafashionsandboutique" aria-label="YouTube"><FaYoutube /></a>
              <a href={`mailto:${email}`} aria-label="Gmail"><FaEnvelope /></a>
            </div>
          </div>

          {/* Policies */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-lg font-bold mb-2 bg-clip-text text-transparent w-fit mr-auto"
              style={{ backgroundImage: 'linear-gradient(to right, #688245, #8CC63E)' }}>
              Our Policies
            </h4>
            <div className="flex flex-col gap-1">
              {policyLinks.map(title => (
                <button
                  key={title}
                  onClick={() => setModalContent(title)}
                  className="flex items-center gap-2 hover:underline hover:text-[#8ac63e] text-sm transition-colors duration-200"
                >
                  <FaAngleRight className="text-xs" /> {title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-xs mt-8 text-gray-400">
          © 2025 Hiya Fashions & Boutique. All rights reserved.
        </div>

        {showScrollButton && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="text-white absolute right-5 bottom-3 animate-bounce"
          >
            <FaArrowUp size={24} />
          </button>
        )}
      </footer>

      {/* Modal */}
     <AnimatePresence>
      {modalContent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={() => setModalContent(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 text-black relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{modalContent}</h2>
            {modalContent && policyMap[modalContent] && (
              <div className="text-sm leading-relaxed whitespace-pre-line">
                {policyMap[modalContent]}
              </div>
            )}
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </>
  );
}
