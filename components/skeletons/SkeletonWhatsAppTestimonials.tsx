export default function SkeletonWhatsAppTestimonials() {
  return (
    <section className="bg-white py-12 px-4 text-center" id="wa-testimonials">
      <div className="max-w-6xl mx-auto">
        <div className="h-6 w-2/3 sm:w-1/3 bg-gray-300 rounded mb-4 mx-auto animate-pulse" />
        <div className="h-4 w-3/4 sm:w-1/2 bg-gray-200 rounded mb-8 mx-auto animate-pulse" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="w-full h-40 sm:h-48 md:h-64 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>

        <div className="w-56 h-10 bg-gray-300 rounded-full mx-auto mt-8 animate-pulse" />
      </div>
    </section>
  );
}
