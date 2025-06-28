import Link from 'next/link';

const collections = [
  'Silk Sarees',
  'Casual & Party Wear Sarees',
  'Salwar suits Unstitched',
  'Kurtis / Kurti Sets',
  'Bottom Wears',
  'Dupatta',
  'Maxi & Frocks',
  'Accessories',
  'Home Decors',
];

export default function Collections() {
  return (
    <section id="collections" className="my-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">New Collection</h2>
      
      <div  style={{ maxWidth: '70rem' }} className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {collections.map((item, index) => {
          const slug = item
            .toLowerCase()
            .replace(/[\/&]/g, '') // Remove / and &
            .replace(/\s+/g, '-'); // Replace spaces with hyphens

          return (
            <Link href={`/gallery/${slug}`} key={index}>
              <div className="bg-white shadow rounded p-4 text-center cursor-pointer hover:bg-gray-50 transition">
                <div className="overflow-hidden rounded h-64"> {/* Uniform height */}
                  <img
                    src={`/categories/${slug}.png`}
                    alt={item}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
                <p className="font-medium mt-3">{item}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
