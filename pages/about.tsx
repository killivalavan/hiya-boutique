import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-800 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">Our Story</h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-[#8bc63e] mb-6">
            HiYa Fashions & Boutique
          </h2>
          <p className="text-center italic text-lg mb-10">Crafted with Love. Styled with Purpose.</p>

          <div className="space-y-6 text-justify text-base sm:text-lg leading-relaxed">
            <p>
              HiYa began not with capital, but with <strong>courage</strong>.
            </p>
            <p>
              Back in 2017, it was just one woman’s unwavering belief — that with <strong>effort, trust, and honesty</strong>, something beautiful could bloom from nothing. With zero financial backing, HiYa took its first steps as a humble reselling venture. No shopfront, no inventory — just time, consistency, and a deep passion to make fashion both <strong>accessible and personal</strong>.
            </p>
            <p>
              Each milestone we’ve crossed speaks of quiet growth — not just in numbers, but in <strong>purpose and vision</strong>. What began with a few trusted suppliers grew, slowly but surely, into a loyal circle of customers who believed in us.
            </p>
            <p>
              In <strong>2020</strong>, HiYa took its first bold leap: <strong>direct sales via WhatsApp</strong>, with carefully curated ready-to-wear collections. It was still simple, still intimate — and it resonated deeply, especially in uncertain times.
            </p>
            <p>
              By <strong>2022</strong>, we expanded into <strong>customization</strong> — offering stitching, aari embroidery, and saree pre-pleating. These weren’t just services; they were thoughtful additions to make <strong>every woman feel seen, styled, and celebrated</strong>.
            </p>
            <p>
              Then came our biggest transformation.
            </p>
            <p>
              In <strong>2023</strong>, HiYa evolved from an online journey into a <strong>full-fledged fashion unit</strong>. What started as a passion project became a <strong>brand</strong>. With a boutique setup in <strong>Pallavaram</strong>, HiYa became a home for creativity, community, and craftsmanship.
            </p>
            <p>
              Today, HiYa Boutique stands as a reflection of years of perseverance and love — now with our <strong>own brand label</strong>, fulfilling <strong>international orders</strong>, and a growing <strong>online presence</strong>.
            </p>
            <p>
              HiYa is not just a boutique.<br />
              It’s a <strong>journey</strong>.<br />
              A <strong>dream</strong>.<br />
              My <strong>third child</strong>.
            </p>
            <p className="italic">
              Born from faith. Raised by hard work. Nurtured with love.
            </p>
            <p className="text-center text-lg font-semibold mt-6">
              Step into <span className="text-[#8bc63e]">HiYa</span> — where every thread tells a story, and every design is made just for you.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
