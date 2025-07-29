'use client';

import { useEffect, useRef, useState } from 'react';
import { FcPicture } from 'react-icons/fc';
import Link from 'next/link';
import Image from 'next/image';

const images = [
  '/client-carousel-images/img1.jpeg',
  '/client-carousel-images/img2.jpg',
  '/client-carousel-images/img3.jpg',
  '/client-carousel-images/img4.jpg',
  '/client-carousel-images/img5.jpg',
  '/client-carousel-images/img6.jpg',
  '/client-carousel-images/img7.jpg',
  '/client-carousel-images/img8.jpg',
  '/client-carousel-images/img9.jpg',
  '/client-carousel-images/img10.jpg',
  '/client-carousel-images/img11.jpg',
  '/client-carousel-images/img12.jpg',
];

export default function SmallImageCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [loadedSet, setLoadedSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    const updateView = () => {
      setIsMobile(window.innerWidth < 640);
    };
    updateView();
    window.addEventListener('resize', updateView);
    return () => window.removeEventListener('resize', updateView);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(timer);
    } else {
      const container = scrollRef.current;
      const card = container?.querySelector('.carousel-card') as HTMLDivElement;
      if (card) setCardWidth(card.offsetWidth + 16); // gap-4 = 16px

      intervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }, 3000);

      return () => intervalRef.current && clearInterval(intervalRef.current);
    }
  }, [isMobile, cardWidth]);

  const handleImageLoad = (url: string) => {
    setLoadedSet((prev) => new Set(prev).add(url));
  };

  const isImageLoaded = (url: string) => loadedSet.has(url);

  return (
    <div className="w-full px-4 py-10 bg-[#f9f9f9] relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Client Looks</h2>

        {/* Mobile View: One image at a time, auto-rotating */}
        {isMobile ? (
          <div className="relative h-[400px] sm:h-[300px] rounded-lg overflow-hidden">
            <div className="absolute w-full h-full">
              {!isImageLoaded(images[index]) && (
                <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg absolute inset-0 z-0" />
              )}
              <Image
                src={images[index]}
                alt={`Client ${index + 1}`}
                width={800}
                height={600}
                className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
                  isImageLoaded(images[index]) ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(images[index])}
              />
            </div>
          </div>
        ) : (
          // Desktop View: Horizontal scroll auto-loop
          <div className="relative">
            <div
              className="flex overflow-x-auto scroll-smooth gap-4 pb-2 no-scrollbar"
              ref={scrollRef}
            >
              {images.concat(images).map((url, idx) => (
                <div
                  key={idx}
                  className="carousel-card flex-shrink-0 w-[220px] h-[300px] bg-white rounded-lg overflow-hidden shadow-md relative"
                >
                  {!isImageLoaded(url) && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg z-0" />
                  )}
                  <Image
                    src={url}
                    alt={`Client ${idx + 1}`}
                    width={300}
                    height={300}
                    onLoad={() => handleImageLoad(url)}
                    className={`w-full h-full object-cover rounded-lg transition-transform duration-300 ${
                      isImageLoaded(url) ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    }`}
                  />
                </div>
              ))}
            </div>
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
