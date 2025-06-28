import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaYoutube, FaPhoneAlt, FaEnvelope, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const email = "hiyatrends@gmail.com"; // Add your email here
  const [showScrollButton, setShowScrollButton] = useState(false);
  const footerRef = useRef(null);

  // Handle Intersection Observer to track footer visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowScrollButton(true); // Show button when footer is in view
        } else {
          setShowScrollButton(false); // Hide button when footer is out of view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the footer is in view
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll to top
    });
  };

  return (
    <footer id="about" ref={footerRef} className="bg-black text-white px-6 pt-10 pb-4 text-sm relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:justify-items-center">
        {/* Column 1: Logo */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-1/2 justify-center">
          <Image className="w-full" src="/logo.png" alt="Logo" width={100} height={100} />
        </div>

        {/* Column 2: Address + Socials with green gradient */}
        <div className="rounded text-left">
          <h4
            className="text-lg font-bold mb-2 bg-clip-text text-transparent w-fit"
            style={{
              backgroundImage: 'linear-gradient(to right, #688245, #8CC63E)',
            }}
          >
            Address
          </h4>
          <p className="text-white text-sm leading-relaxed">
            Hiya Fashions & Boutique
            <br />
            No. 21, RKV Avenue Main Road,
            <br />
            Zamin Pallavaram,
            <br />
            Chennai - 600117.
          </p>
          <h4
            className="text-lg font-bold mb-2 bg-clip-text text-transparent w-fit mt-5"
            style={{
              backgroundImage: 'linear-gradient(to right, #688245, #8CC63E)',
            }}
          >
            Follow us
          </h4>
          <div className="flex gap-4 mt-2 text-white text-lg">
            <a href="https://www.instagram.com/ilakkiya2017" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/ilakkiya2017" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.youtube.com/@hiyafashionsandboutique" aria-label="YouTube">
              <FaYoutube />
            </a>
            {/* Gmail icon now links to mailto */}
            <a href={`mailto:${email}`} aria-label="Gmail">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col md:items-center md:items-start text-center md:text-left">
          <h4
            className="text-lg font-bold mb-2 bg-clip-text text-transparent w-fit mr-auto"
            style={{
              backgroundImage: 'linear-gradient(to right, #688245, #8CC63E)',
            }}
          >
            Contact Us
          </h4>
          <p className="flex items-center gap-2 text-white">
            <FaPhoneAlt className="text-white" /> +91-7299927172
          </p>
          <p className="flex items-center gap-2 text-white">
            <FaPhoneAlt className="text-white" /> +91-91**********
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs mt-8 text-gray-400">
        © 2025 Hiya Fashions & Boutique. All rights reserved.
      </div>

      {/* Scroll to Top Button */}
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
  );
}
