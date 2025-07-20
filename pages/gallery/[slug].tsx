import { GetServerSideProps } from 'next';
import GalleryPage from '../../components/GalleryPage';
import Navbar from '../../components/Navbar';

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
  'whatsapp-testimonials': 'Words From WhatsApp'
};

type CloudinaryFile = {
  url: string;
  public_id: string;
};

export default function DynamicGalleryPage({
  slug,
  images,
}: {
  slug: string;
  images: CloudinaryFile[];
}) {
  const title =
    categoryTitles[slug] ||
    slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <>
      <Navbar />
      <GalleryPage
        title={title}
        images={images}
        slug={slug}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/list?category=${slug}`);
  const data = await res.json();

  return {
    props: {
      slug,
      images: data.files || [],
    },
  };
};
