import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    name: 'Aari Embroidery Designing - Customisation',
    slug: 'aari-embroidery-designing-customisation',
    image: '/services/aari.png',
    blurDataURL: '/services/aari-blur.webp'
  },
  {
    name: 'Customization - Custom Tailoring',
    slug: 'customization-custom-tailoring',
    image: '/services/tailoring.png',
    blurDataURL: '/services/tailoring-blur.webp'
  },
  {
    name: 'Pre-Pleating',
    slug: 'pre-pleating',
    image: '/services/pleating.png',
    blurDataURL: '/services/pleating-blur.webp'
  },
  {
    name: 'Mehendi Art',
    slug: 'mehendi-art',
    image: '/services/mehendi.png',
    blurDataURL: '/services/mehendi-blur.webp'
  },
  {
    name: 'Bridal Makeup & Hair Style',
    slug: 'bridal-makeup-hair-style',
    image: '/services/makeup.png',
    blurDataURL: '/services/makeup-blur.webp'
  },
  {
    name: 'Aari Embroidery Classes',
    slug: 'training',
    image: '/services/training.png',
    blurDataURL: '/services/training-blur.webp'
  }
];

export default function Services() {
  return (
    <section id="our-services" className="my-10 px-4">
      <div className="mx-auto" style={{ maxWidth: '60rem' }}>
        <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
          {services.map((service) => (
            <Link href={`/gallery/${service.slug}`} key={service.slug}>
              <div className="flex flex-col items-center text-center cursor-pointer">
                <div className="relative w-60 h-60">
                  {/* Shimmer layer */}
                  <div className="absolute inset-0 rounded-full bg-gray-300 animate-pulse z-0" />
                  
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover rounded-full transition-transform duration-300 hover:scale-105 z-10"
                    sizes="(max-width: 768px) 100vw, 240px"
                    priority
                    placeholder="blur"
                    blurDataURL={service.blurDataURL}
                    onLoad={(e) => {
                      const shimmer = (e.target as HTMLImageElement).previousSibling as HTMLElement;
                      if (shimmer) shimmer.style.display = 'none';
                    }}
                  />
                </div>
                <p className="mt-4 font-medium">{service.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
