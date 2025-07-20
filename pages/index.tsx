import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Services from '../components/Services'
import Collections from '../components/Collections'
import Banner from '../components/Banner'
import {WhatsAppButton} from '../components/WhatsAppButton'
import CustomerDiaries from '../components/CustomerDiaries'
import SmallImageCarousel from '../components/SmallImageCarousel'
import WhatsAppTestimonials from '../components/WhatsAppTestimonials';


export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home" className="overflow-x-hidden">
        <Carousel />
        <Services />
        <Banner />
        <Collections />
        <CustomerDiaries />
        <WhatsAppTestimonials />
        <SmallImageCarousel /> 
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
