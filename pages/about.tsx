import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Head>
        <title>Hiya Boutique – Our Story | Women's Fashion & Customization</title>
        <meta
          name="description"
          content="Discover the inspiring journey of Hiya Boutique – from a humble reselling start in 2017 to a full-fledged fashion unit offering women's fashion, custom stitching, aari work, and more."
        />
        <meta
          name="keywords"
          content="Hiya Boutique, women's fashion, custom stitching, aari embroidery, Pallavaram boutique, saree pre-pleating, boutique Chennai"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Hiya Boutique – Our Story" />
        <meta
          property="og:description"
          content="Explore how Hiya Boutique grew from a passion project into a fashion brand offering personalized designs and traditional craftsmanship."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://yourdomain.com/about" />
        <meta property="og:type" content="website" />

        {/* Favicons & Apple Touch Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Navbar />

      <main className="bg-white text-gray-800 px-6 py-12">
        <article className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Our Story</h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#8bc63e] mb-2">
              HiYa Fashions & Boutique
            </h2>
            <p className="italic text-lg">Crafted with Love. Styled with Purpose.</p>
          </header>

          <section className="space-y-6 text-justify text-base sm:text-lg leading-relaxed">
            <p>
              HiYa began not with capital, but with <strong>courage</strong>.
            </p>
            <p>
              Back in 2017, it was just one woman’s unwavering belief — that with{' '}
              <strong>effort, trust, and honesty</strong>, something beautiful could bloom from
              nothing. With zero financial backing, HiYa took its first steps as a humble reselling
              venture. No shopfront, no inventory — just time, consistency, and a deep passion to
              make fashion both <strong>accessible and personal</strong>.
            </p>
            <p>
              Each milestone we’ve crossed speaks of quiet growth — not just in numbers, but in{' '}
              <strong>purpose and vision</strong>. What began with a few trusted suppliers grew,
              slowly but surely, into a loyal circle of customers who believed in us.
            </p>
            <p>
              In <strong>2020</strong>, HiYa took its first bold leap:{' '}
              <strong>direct sales via WhatsApp</strong>, with carefully curated ready-to-wear
              collections. It was still simple, still intimate — and it resonated deeply, especially
              in uncertain times.
            </p>
            <p>
              By <strong>2022</strong>, we expanded into <strong>customization</strong> — offering
              stitching, aari embroidery, and saree pre-pleating. These weren’t just services; they
              were thoughtful additions to make{' '}
              <strong>every woman feel seen, styled, and celebrated</strong>.
            </p>
            <p>Then came our biggest transformation.</p>
            <p>
              In <strong>2023</strong>, HiYa evolved from an online journey into a{' '}
              <strong>full-fledged fashion unit</strong>. What started as a passion project became a{' '}
              <strong>brand</strong>. With a boutique setup in <strong>Pallavaram</strong>, HiYa
              became a home for creativity, community, and craftsmanship.
            </p>
            <p>
              Today, HiYa Boutique stands as a reflection of years of perseverance and love — now
              with our <strong>own brand label</strong>, fulfilling{' '}
              <strong>international orders</strong>, and a growing <strong>online presence</strong>.
            </p>
            <p>
              HiYa is not just a boutique.
              <br />
              It’s a <strong>journey</strong>.
              <br />
              A <strong>dream</strong>.
              <br />
              My <strong>third child</strong>.
            </p>
            <p className="italic">Born from faith. Raised by hard work. Nurtured with love.</p>

            <p className="text-center text-lg font-semibold mt-6">
              Step into <span className="text-[#8bc63e]">HiYa</span> — where every thread tells a
              story, and every design is made just for you.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </>
  )
}
