import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const slides = [
  {
    src: "/carousel/c1.png",
    alt: "Happy Clients",
    text: <>Our <span className="text-pink-500">happy clients</span> are our biggest achievement.</>,
    button: null,
  },
  {
    src: "/carousel/c2.png",
    alt: "kurtis and kurti sets",
    text: <>
      <span className="text-pink-500">Elegance</span> in Every Thread. <span className="text-pink-500">Passion</span> in Every Stitch.
    </>,
    button: {
      label: "Explore kurtis",
      href: "/gallery/kurtis-kurti-sets",
    },
  },
  {
    src: "/carousel/c3.png",
    alt: "Mehendi Art",
    text: <>
      Crafting <span className="text-pink-500">elegance</span> in every swirl of <span className="text-pink-500">Mehendi</span>.
    </>,
    button: {
      label: "Explore Mehendi Art",
      href: "/gallery/mehendi-art",
    },
  },
  {
    src: "/carousel/c4.png",
    alt: "Casual and party sarees",
    text: <>
      Every pleat whispers <span className="text-pink-500">tradition</span>, every drape radiates <span className="text-pink-500">grace</span>.
    </>,
    button: {
      label: "Explore Sarees",
      href: "/gallery/casual-party-wear-sarees",
    },
  },
];

export default function ImageCarousel() {
  return (
    <div className="w-full overflow-hidden custom-carousel">
      <Carousel
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        autoPlay
        interval={5000}
        stopOnHover
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[300px] sm:h-[400px] md:h-[700px]">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              unoptimized
              priority={index === 0}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 100vw"
            />

            <div className="w-[90%] max-w-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-20">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-bold text-xl sm:text-2xl md:text-5xl leading-snug md:leading-[1.4]"
              >
                {slide.text}
              </motion.div>

              {slide.button && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                >
                  <Link
                    href={slide.button.href}
                    className="mt-4 inline-block text-sm sm:text-base md:text-lg font-semibold bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition"
                  >
                    {slide.button.label}
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
