// pages/gallery/[slug].tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import SkeletonGalleryPage from '../../components/skeletons/SkeletonGalleryPage';

const GalleryPage = dynamic(() => import('../../components/GalleryPage'), {
  ssr: false,
});

const categoryTitles: Record<string, string> = {
  'silk-sarees': 'Silk Sarees',
  'casual-party-wear-sarees': 'Casual & Party Wear Sarees',
  'salwar-suits-unstitched': 'Salwar suits Unstitched',
  'kurtis-kurti-sets': 'Kurtis / Kurti Sets',
  'bottom-wears': 'Bottom Wears',
  'accessories': 'Accessories',
  'maxi-frocks': 'Maxi & Frocks',
  'home-decors': 'Home Decors',
  'artificial-jewellery': 'Artificial Jewellery',
  'aari-embroidery-designing-customisation': 'Aari Embroidery Designing - Customisation',
  'customization-custom-tailoring': 'Customization - Custom Tailoring',
  'pre-pleating': 'Pre-Pleating',
  'mehendi-art': 'Mehendi Art',
  'bridal-makeup-hair-style': 'Bridal Makeup & Hair Style',
  'training': 'Training',
  'clients-gallery': 'Clients Gallery',
  'whatsapp-testimonials': 'Words From WhatsApp',
};

type CloudinaryFile = {
  url: string;
  public_id: string;
  badge?: string | null;
};

export default function DynamicGalleryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [images, setImages] = useState<CloudinaryFile[] | null>(null);
  const [loading, setLoading] = useState(true);

  const title =
    typeof slug === 'string'
      ? categoryTitles[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
      : '';

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    fetch(`/api/list?category=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data.files || []);
        setLoading(false);
      })
      .catch(() => {
        setImages([]);
        setLoading(false);
      });
  }, [slug]);

  const pageTitle = `Hiya Boutique – ${title}`;
  const pageDescription = `Browse the latest ${title.toLowerCase()} at Hiya Boutique. Discover elegance, customization, and handcrafted perfection.`;
  const ogImage = images?.[0]?.url || '/default-og-image.jpg';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Hiya Boutique" />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* Canonical URL */}
        {slug && <link rel="canonical" href={`https://hiyaboutique.in/gallery/${slug}`} />}
      </Head>

      <Navbar />

      <main>
        <section aria-labelledby="gallery-heading">
          <h1 id="gallery-heading" className="sr-only">
            {title}
          </h1>
          {loading || !images ? (
            <SkeletonGalleryPage />
          ) : (
            <GalleryPage title={title} images={images} slug={slug as string} />
          )}
        </section>
      </main>
    </>
  );
}
