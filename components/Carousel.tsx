import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ImageCarousel() {
  return (
    <div className="w-full overflow-hidden custom-carousel">
      <Carousel
        autoPlay={false}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
      >
        {/* Carousel Item 1 */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[700px]">
          <img
            src="/carousel/c1.png"
            alt="img1"
            className="w-full h-full object-cover"
          />
          {/* Text above the image */}
          <div className="w-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center font-bold text-xl sm:text-2xl md:text-5xl">
           Crafted with Love. Styled with Purpose.
          </div>
        </div>

        {/* Carousel Item 2 */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[700px]">
          <img
            src="/carousel/c2.png"
            alt="img2"
            className="w-full h-full object-cover"
          />
          {/* Text above the image */}
          <div className="w-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center font-bold text-xl sm:text-2xl md:text-5xl">
            Elegance in Every Thread. Passion in Every Stitch.
          </div>
        </div>

        {/* Carousel Item 3 */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[700px]">
          <img
            src="/carousel/c3.png"
            alt="img3"
            className="w-full h-full object-cover"
          />
          {/* Text above the image */}
          <div className="w-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center font-bold text-xl sm:text-2xl md:text-3xl">
            Where Style Tells a Story. Every Stitch Matters.
          </div>
        </div>
      </Carousel>
    </div>
  );
}
