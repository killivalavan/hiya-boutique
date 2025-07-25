import { useEffect } from 'react';
import Head from 'next/head';
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

  const siteUrl = 'https://www.hiyaboutique.in'; // Update if different

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hiya Fashions & Boutique",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91 72999 27172",
        "contactType": "Customer Support"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91 86102 03368",
        "contactType": "Customer Support"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No. 21, RKV Avenue Main Road, Zamin Pallavaram",
      "addressLocality": "Chennai",
      "postalCode": "600117",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.instagram.com/hiya_instore/",
      "https://www.facebook.com/ilakkiya2017",
      "https://www.youtube.com/@hiyafashionsandboutique"
    ]
  };

  return (
    <>
      <Head>
        <title>Hiya Boutique – Best Boutique in Chennai for Custom Tailoring & Sarees</title>
        <meta
          name="description"
          content="Hiya Fashions & Boutique offers custom tailoring, Aari embroidery, bridal makeover, and exclusive saree collections in Chennai. Book your style today!"
        />
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </Head>

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
