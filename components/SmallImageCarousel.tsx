import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FcPicture } from "react-icons/fc";
import Image from "next/image";

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
    "/client-carousel-images/img9.jpg",
    "/client-carousel-images/img10.jpg",
    "/client-carousel-images/img11.jpg",
    "/client-carousel-images/img12.jpg",
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollNext = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollPrev = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth;
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    intervalRef.current = setInterval(() => {
      scrollNext();
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const visibleWidth = container.offsetWidth;

    if (scrollLeft + visibleWidth >= scrollWidth - 2) {
      container.scrollTo({ left: 0, behavior: "auto" });
    }
  };

  return (
    <div
      className="w-full px-4 py-10 bg-[#f9f9f9] relative"
      onMouseEnter={() => intervalRef.current && clearInterval(intervalRef.current)}
      onMouseLeave={() =>
        (intervalRef.current = setInterval(() => scrollNext(), 3000))
      }
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Client Looks</h2>

        <div className="relative">
          {/* Scrollable container */}
          <div
            className="flex overflow-x-auto scroll-smooth gap-4 pb-2 no-scrollbar"
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {images.concat(images).map((url, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[100vw] sm:w-[50vw] md:w-[220px] h-[300px] bg-white rounded-lg overflow-hidden shadow-md relative"
              >
                <Image
                  src={url}
                  alt={`Client ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 220px"
                  priority={idx < 3}
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-2 rounded-full z-10 transition"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-2 rounded-full z-10 transition"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* CTA Button */}
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
