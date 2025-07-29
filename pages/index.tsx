import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';

// Skeletons
import SkeletonServices from '../components/skeletons/SkeletonServices';
import SkeletonCollections from '../components/skeletons/SkeletonCollections';
import SkeletonClientsGallery from '../components/skeletons/SkeletonClientsGallery';
import SkeletonCarousel from '../components/skeletons/SkeletonCarousel';
import SkeletonBanner from '../components/skeletons/SkeletonBanner';
import SkeletonTestimonials from '../components/skeletons/SkeletonWhatsAppTestimonials';
import SkeletonCustomerBanner from '../components/skeletons/SkeletonCustomerBanner';
import SkeletonSmallCarousel from '../components/skeletons/SkeletonSmallImageCarousel';

// Lazy components
const Carousel = dynamic(() => import('../components/Carousel'), {
  ssr: false,
  loading: () => <SkeletonCarousel />,
});
const LazyServices = dynamic(() => import('../components/Services'), {
  ssr: false,
  loading: () => <SkeletonServices />,
});
const LazyCollections = dynamic(() => import('../components/Collections'), {
  ssr: false,
  loading: () => <SkeletonCollections />,
});
const LazyCustomerDiaries = dynamic(() => import('../components/CustomerDiaries'), {
  ssr: false,
  loading: () => <SkeletonClientsGallery />,
});
const LazyBanner = dynamic(() => import('../components/Banner'), {
  ssr: false,
  loading: () => <SkeletonBanner />,
});
const LazyTestimonials = dynamic(() => import('../components/WhatsAppTestimonials'), {
  ssr: false,
  loading: () => <SkeletonTestimonials />,
});
const LazyCustomerBanner = dynamic(() => import('../components/CustomerBanner'), {
  ssr: false,
  loading: () => <SkeletonCustomerBanner />,
});
const LazySmallCarousel = dynamic(() => import('../components/SmallImageCarousel'), {
  ssr: false,
  loading: () => <SkeletonSmallCarousel />,
});
const PopupModal = dynamic(() => import('../components/PopupModal'), { ssr: false });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const slugs = [
      'aari-embroidery-designing-customisation',
      'customization-custom-tailoring',
      'pre-pleating',
      'mehendi-art',
      'bridal-makeup-hair-style',
      'training',
      'silk-sarees',
      'casual-party-wear-sarees',
      'salwar-suits-unstitched',
      'kurtis-kurti-sets',
      'bottom-wears',
      'accessories',
      'maxi-frocks',
      'home-decors',
      'artificial-jewellery',
      'clients-gallery',
      'whatsapp-testimonials'
    ];

    slugs.forEach(slug => {
      router.prefetch(`/gallery/${slug}`);
    });
  }, [router]);

  const siteUrl = 'https://www.hiyaboutique.in';

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
        <LazyServices />
        <LazyBanner />
        <LazyCollections />
        <LazyCustomerDiaries />
        <LazyCustomerBanner />
        <LazyTestimonials />
        <LazySmallCarousel />
      </main>
      <Footer />
      <WhatsAppButton />
      <PopupModal />
    </>
  );
}
