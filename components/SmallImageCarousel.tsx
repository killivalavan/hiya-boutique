import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FcPicture } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const images = [
  "/client-carousel-images/img1.jpeg",
  "/client-carousel-images/img2.jpg",
  "/client-carousel-images/img3.jpg",
  "/client-carousel-images/img4.jpg",
  "/client-carousel-images/img5.jpg",
  "/client-carousel-images/img6.jpg",
  "/client-carousel-images/img7.jpg",
  "/client-carousel-images/img8.jpg",
  "/client-carousel-images/img9.jpg",
  "/client-carousel-images/img10.jpg",
  "/client-carousel-images/img11.jpg",
  "/client-carousel-images/img12.jpg",
];

export default function SmallImageCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [[index, direction], setIndex] = useState([0, 0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [cardWidth, setCardWidth] = useState(0);

  // Detect screen size
  useEffect(() => {
    const updateView = () => {
      setIsMobile(window.innerWidth < 640);
    };
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (isMobile) {
      const timer = setInterval(() => paginate(1), 3000);
      return () => clearInterval(timer);
    } else {
      const container = scrollRef.current;
      const card = container?.querySelector(".carousel-card") as HTMLDivElement;
      if (card) setCardWidth(card.offsetWidth + 16); // gap-4 = 16px

      intervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }, 3000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isMobile, cardWidth]);

  const paginate = (newDirection: number) => {
    setIndex(([prev]) => {
      const newIndex = (prev + newDirection + images.length) % images.length;
      return [newIndex, newDirection];
    });
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    if (
      container.scrollLeft + container.offsetWidth >=
      container.scrollWidth - cardWidth
    ) {
      container.scrollTo({ left: 0, behavior: "auto" });
    }
  };

  return (
    <div
      className="w-full px-4 py-10 bg-[#f9f9f9] relative"
      onMouseEnter={() => intervalRef.current && clearInterval(intervalRef.current)}
      onMouseLeave={() => {
        if (!isMobile)
          intervalRef.current = setInterval(() => {
            if (scrollRef.current)
              scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
          }, 3000);
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Client Looks</h2>

        {/* Mobile: One image at a time */}
        {isMobile ? (
         <div className="relative h-[400px] sm:h-[300px] rounded-lg overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                className="absolute w-full h-full"
                custom={direction}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={images[index]}
                  alt={`Client ${index + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover rounded-lg"
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => paginate(-1)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-2 rounded-full z-10"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-2 rounded-full z-10"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        ) : (
          // Large view: Multiple images in scroll
          <div className="relative">
            <div
              className="flex overflow-x-auto scroll-smooth gap-4 pb-2 no-scrollbar"
              ref={scrollRef}
              onScroll={handleScroll}
            >
              {images.concat(images).map((url, idx) => (
                <div
                  key={idx}
                  className="carousel-card flex-shrink-0 w-[220px] h-[300px] bg-white rounded-lg overflow-hidden shadow-md relative"
                >
                  <Image
                    src={url}
                    alt={`Client ${idx + 1}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                scrollRef.current?.scrollBy({ left: -cardWidth, behavior: "smooth" })
              }
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-2 rounded-full z-10 transition"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={() =>
                scrollRef.current?.scrollBy({ left: cardWidth, behavior: "smooth" })
              }
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-2 rounded-full z-10 transition"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        )}

        {/* CTA */}
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
