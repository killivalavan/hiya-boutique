import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative w-full h-[200px] sm:h-[200px] md:h-[200px] lg:h-[200px]">
      {/* Background Image */}
       <Image
        src="/banner.jpg"
        alt="Bridal Offer Background"
        fill
        priority={false}
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4 text-center">
        <h2 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-3xl font-bold leading-snug">
          ✨ Your Dream Day, Our Special Gift! –{" "}
          <span className="text-pink-400">Flat 10% OFF</span> on bridal blouse when
          you book saree blouse/lehenga worth{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 bg-clip-text text-transparent font-extrabold">
            ₹25,000+
          </span>{" "}
          each.
        </h2>
      </div>
    </div>
  );
}
