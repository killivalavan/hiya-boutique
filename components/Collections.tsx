import Link from 'next/link';
import Image from 'next/image';

const collections = [
  'Silk Sarees',
  'Artificial Jewellery',
];

export default function Collections() {
  return (
    <section id="collections" className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Collections</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Explore our carefully curated collections designed to celebrate your style</p>

        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
            {collections.map((item, index) => {
              const slug = item
                .toLowerCase()
                .replace(/[\/&]/g, '') // Remove / and &
                .replace(/\s+/g, '-'); // Replace spaces with hyphens

              return (
                <Link href={`/gallery/${slug}`} key={index}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
                    <div className="overflow-hidden rounded-t-lg h-72 relative">
                      {/* Shimmer layer */}
                      <div className="absolute inset-0 bg-gray-300 animate-pulse z-0" />

                      <Image
                        width={400}
                        height={400}
                        src={`/categories/${slug}.png`}
                        alt={item}
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 z-10"
                        onLoad={(e) => {
                          const shimmer = (e.target as HTMLImageElement).previousSibling as HTMLElement;
                          if (shimmer) shimmer.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="p-6 text-center">
                      <p className="font-semibold text-lg text-gray-800 group-hover:text-pink-500 transition-colors">{item}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
