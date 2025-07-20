import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FcPicture } from "react-icons/fc";

export default function SmallImageCarousel() {
  const images = [
    "/client-carousel-images/img1.jpeg",
    "/client-carousel-images/img2.jpg",
    "/client-carousel-images/img3.jpg",
    "/client-carousel-images/img4.jpg",
    "/client-carousel-images/img5.jpg",
    "/client-carousel-images/img6.jpg",
    "/client-carousel-images/img7.jpg",
    "/client-carousel-images/img8.jpg",
    "/client-carousel-images/img9.jpeg",
    "/client-carousel-images/img10.jpg",
  ];

  const [showCount, setShowCount] = useState(3);
  const [slideIndex, setSlideIndex] = useState(0);
  const singleCardPercent = 100 / images.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  let touchStartX = 0;

  useEffect(() => {
    const updateShowCount = () => {
      if (window.innerWidth < 640) setShowCount(1);
      else if (window.innerWidth < 1024) setShowCount(2);
      else setShowCount(3);
    };
    updateShowCount();
    window.addEventListener("resize", updateShowCount);
    return () => window.removeEventListener("resize", updateShowCount);
  }, []);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSlideIndex((prev) =>
        prev < images.length - showCount ? prev + 1 : 0
      );
    }, 3000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showCount]);

  const slideNext = () => {
    setSlideIndex((prev) =>
      prev < images.length - showCount ? prev + 1 : 0
    );
  };

  const slidePrev = () => {
    setSlideIndex((prev) =>
      prev > 0 ? prev - 1 : images.length - showCount
    );
  };

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) slideNext();
    if (touchEndX - touchStartX > 50) slidePrev();
  };

  return (
    <div
      className="w-full px-4 py-10 bg-white relative bg-[#f9f9f9]"
      onMouseEnter={() => intervalRef.current && clearInterval(intervalRef.current)}
      onMouseLeave={() => startAutoSlide()}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Client Looks</h2>
        <div
          className="overflow-hidden relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={slidePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 
              bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-2 rounded-full z-10 transition"
          >
            <FaChevronLeft size={20} />
          </button>

          <button
            onClick={slideNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 
              bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-2 rounded-full z-10 transition"
          >
            <FaChevronRight size={20} />
          </button>

          <motion.div
            className="flex gap-4"
            animate={{ x: `-${slideIndex * singleCardPercent}%` }}
            transition={{ duration: 0.5 }}
            style={{ width: `${(images.length / showCount) * 100}%` }}
          >
            {images.map((url, idx) => (
              <div
                key={idx}
                className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md 
                           w-full sm:w-[90%] md:w-[45%] lg:w-[30%] h-[400px]"
              >
                <img
                  src={url}
                  alt={`Client ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ➡️ Clients Gallery Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="/gallery/clients-gallery"
            className="inline-flex items-center justify-center gap-2 bg-[#2563eb] text-white px-6 py-3 rounded-full hover:bg-[#1e4bb8] transition"
          >
            <FcPicture className="text-xl" />
            <span>See More Styles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
