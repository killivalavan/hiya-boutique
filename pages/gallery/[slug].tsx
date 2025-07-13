import fs from 'fs';
import path from 'path';
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
};

export default function DynamicGalleryPage({
  slug,
  images,
}: {
  slug: string;
  images: string[];
}) {
  const title =
    categoryTitles[slug] ||
    slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <>
      <Navbar />
      <GalleryPage
        title={title}
        imageFolder={slug}
        images={images}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;
  const folderPath = path.join(process.cwd(), 'public', slug);

  let images: string[] = [];
  try {
    images = fs
      .readdirSync(folderPath)
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
      .sort((a, b) => {
        const aTime = fs.statSync(path.join(folderPath, a)).mtime.getTime();
        const bTime = fs.statSync(path.join(folderPath, b)).mtime.getTime();
        return bTime - aTime; // newest first
      });
  } catch (err) {
    console.error(`Error reading folder /public/${slug}`, err);
  }

  return {
    props: {
      slug,
      images,
    },
  };
};
