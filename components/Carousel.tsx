import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ImageCarousel() {
  return (
    <div className="w-full overflow-hidden custom-carousel">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
      >
        <div>
          <img
            src="/carousel/c1.webp"
            alt="img1"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src="/carousel/c2.jpg"
            alt="img2"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src="/carousel/c3.webp"
            alt="img3"
            className="w-full h-full object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
}
