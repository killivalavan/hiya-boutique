import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Services from '../components/Services';
import Collections from '../components/Collections';
import Banner from '../components/Banner';
import { WhatsAppButton } from '../components/WhatsAppButton';
import CustomerDiaries from '../components/CustomerDiaries';
import SmallImageCarousel from '../components/SmallImageCarousel';
import WhatsAppTestimonials from '../components/WhatsAppTestimonials';
import CustomerBanner from '../components/CustomerBanner';
import PopupModal from '../components/PopupModal';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const slugs = [
      // Services
      'aari-embroidery-designing-customisation',
      'customization-custom-tailoring',
      'pre-pleating',
      'mehendi-art',
      'bridal-makeup-hair-style',
      'training',
      // Collections
      'silk-sarees',
      'casual-party-wear-sarees',
      'salwar-suits-unstitched',
      'kurtis-kurti-sets',
      'bottom-wears',
      'accessories',
      'maxi-frocks',
      'home-decors',
      'artificial-jewellery',
      // Client Gallery
      'clients-gallery',
      'whatsapp-testimonials'
    ];

    slugs.forEach(slug => {
      router.prefetch(`/gallery/${slug}`);
    });
  }, [router]);

  return (
    <>
      <Navbar />
      <main id="home" className="overflow-x-hidden">
        <Carousel />
        <Services />
        <Banner />
        <Collections />
        <CustomerDiaries />
        <CustomerBanner />
        <WhatsAppTestimonials />
        <SmallImageCarousel />
      </main>
      <Footer />
      <WhatsAppButton />
      <PopupModal />
    </>
  );
}
