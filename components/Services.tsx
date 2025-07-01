import Link from 'next/link';

const services = [
  {
    name: 'Aari Embroidery Designing - Customisation',
    slug: 'aari-embroidery-designing-customisation',
    image: '/services/aari.png'
  },
  {
    name: 'Customization - Custom Tailoring',
    slug: 'customization-custom-tailoring',
    image: '/services/tailoring.png'
  },
  {
    name: 'Pre-Pleating',
    slug: 'pre-pleating',
    image: '/services/pleating.png'
  },
  {
    name: 'Mehendi Art',
    slug: 'mehendi-art',
    image: '/services/mehendi.png'
  },
  {
    name: 'Bridal Makeup & Hair Style',
    slug: 'bridal-makeup-hair-style',
    image: '/services/makeup.png'
  },
  {
    name: 'Aari Embroidery Classes',
    slug: 'training',
    image: '/services/training.png'
  }
];

export default function Services() {
  return (
  <section id="our-services" className="my-10 px-4">
  <div className="mx-auto"  style={{ maxWidth: '60rem' }}>
    <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
      {services.map((service) => (
        <Link href={`/gallery/${service.slug}`} key={service.slug}>
          <div className="flex flex-col items-center text-center cursor-pointer">
            <img
              src={service.image}
              alt={service.name}
              className="w-60 h-60 object-cover rounded-full transform transition duration-300 hover:scale-105"
            />
            <p className="mt-4 font-medium">{service.name}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

  );
}
