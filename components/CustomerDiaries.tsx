import { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiGalleryLine } from 'react-icons/ri';
import { FcPicture } from 'react-icons/fc';
import { motion } from "framer-motion";
import Link from 'next/link';

export default function CustomerDiaries() {
  const diaries = [
    { name: "Durgha Shantha", role: "", image: "/user-icons/user-1.png", rating: 5, text: "Hiya has been my go to place for any saree requirement. Prompt response and the most reliable services one could ask for. Highly recommend Hiya for the best quality, most friendly and trustworthy shopping experience." },
    { name: "Malthy ammu", role: "", image: "/user-icons/user-2.png", rating: 5, text: "I stitched salwar here, it was perfect fit and beautiful and is exactly what I needed. Service is quick and responsive. Super satisfied and so glad that I found a good boutique." },
    { name: "Indu Manian", role: "", image: "/user-icons/user-3.png", rating: 5, text: "Excellent mindblowing service! On time delivery without issues! So humble and customer friendly! Educates the customer about suitable style, design and look! Overall a pleasant experience and 100 percent satisfactory work! I wish them all the best for their future endeavors!" },
    { name: "Jaya Rani", role: "", image: "/user-icons/user-4.png", rating: 5, text: "Hiya Fashion's & Boutique an one stop destination for all our customisation stitching needs.. Recently got a chance to customise my kids dresses from saree to frock. It turned out to be super perfect and also stiched few pattern blouses which suited me also perfectly.... So happy that I chose Hiya Fashion's & Boutique." },
    { name: "Indumathy Rabindranath", role: "", image: "/user-icons/user-5.png", rating: 5, text: "Hiya - I would say Hiya Fashion boutique makes perfect tailored attire with boutique finish at very reasonable cost. She is good at picturing the pattern and making it according to the clients need. Thanks for the awesome customer service dear. Keep growing!" },
    { name: "Uma Maheswari", role: "", image: "/user-icons/user-6.png", rating: 5, text: "Stitched couple of salwar set and fit was just as expected. On time delivery and great customer service. Illakiya was checking for our preference in designing and giving her suggestions for better look and comfort. Budget friendly charges.. Highly recommended!!" },
    { name: "Mahalakshmi Jayaprakash", role: "", image: "/user-icons/user-7.png", rating: 5, text: "My aari blouse designing by Hiya Fashions was amazing. The fines of the work shows how expert they are. The work was very neat and absolutely stunning. I was delighted on opting Hiya Fashions. Also the jewelry received was to the expectation. Ultimate one stop shop for fashion! Keep up the good work Mrs. Ilakiya. Miles to go 👍" },
    { name: "Akhila Thiruneelakandan", role: "", image: "/user-icons/user-8.png", rating: 5, text: "I had given my saree for pre-pleating and also got a blouse stitched. Both were done perfectly and were ready on time. Ilakkiya was very friendly and accommodated visits for measurements and pickup post closing timings too." },  
    { name: "Deepa", role: "", image: "/user-icons/user-9.png", rating: 5, text: "The quality of work is too good and blouses was delivered on time without any delay or repeated follow up. Love the way the blouse designs was customised based on the saree. Thanks Ilakiya." },  
    { name: "Rajeshwari Prabhu", role: "", image: "/user-icons/user-10.png", rating: 5, text: "I saw about Hiya Boutique via google reviews and gave my saree to customize to a salwar and Ilakiya mam made it so nicely and no complaints, I really liked the way it came out and it was delivered on time, mam is so kind and she listens to our requirements clearly and give suggestions as well, I recommend Hiya Boutique to everyone." },  
    { name: "Srilakshmi Paladugu", role: "", image: "/user-icons/user-11.png", rating: 5, text: "Recently I have visited Hiya Fashion's for blouse stiching, in a short span I received blouse which gave perfect look. Thank you so much Hiya for your quick response." },  
    { name: "Jamuna Sasi", role: "", image: "/user-icons/user-12.png", rating: 5, text: "Stitched my wedding anniversary blouse in Hiya. Perfectly stitched, on time delivery and the way she communicated about the cloth and design was amazing. Thank you so much.. Highly recommend 👍" },  
    { name: "Indu Mathi", role: "", image: "/user-icons/user-13.png", rating: 5, text: "Very nice aari work done by Hiya fashion for my wedding. Wedding blouse turn out very well with proper measurements and given few other cuidar for stitching. Everything turn out well. Fast delivery. Tq hiya." },  

];

  const [showCount, setShowCount] = useState(3);
  const [slideIndex, setSlideIndex] = useState(0);
  const singleCardPercent = 100 / diaries.length;

  let touchStartX = 0;

  useEffect(() => {
    const updateShowCount = () => {
      if (window.innerWidth < 640) setShowCount(1);
      else if (window.innerWidth < 1024) setShowCount(2);
      else setShowCount(3);
    };
    updateShowCount();
    window.addEventListener("resize", updateShowCount);
    return () => window.removeEventListener("resize", updateShowCount);
  }, []);

  const slideNext = () => {
    if (slideIndex < diaries.length - showCount) setSlideIndex(slideIndex + 1);
  };
  const slidePrev = () => {
    if (slideIndex > 0) setSlideIndex(slideIndex - 1);
  };

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) slideNext();
    if (touchEndX - touchStartX > 50) slidePrev();
  };

  const getStars = (rating) =>
    Array(5).fill(0).map((_, i) =>
      rating >= i+1 ? <FaStar key={i} className="text-yellow-500"/> :
      rating >= i+0.5 ? <FaStarHalfAlt key={i} className="text-yellow-500"/> :
      <FaRegStar key={i} className="text-yellow-500"/>
    );

  return (
    <div id="customer-diaries" className="w-full px-4 py-10 bg-[#f9f9f9]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="lg:w-[50%] lg:ml-auto text-2xl font-bold">Our Happy Clients</h2>
          <div className="flex gap-4 mr-0 sm:mr-3">
            <button
              onClick={slidePrev}
              disabled={slideIndex === 0}
              className="bg-[#15803d] text-white p-2 rounded-full hover:bg-[#08682b] transition disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={slideNext}
              disabled={slideIndex >= diaries.length - showCount}
              className="bg-[#15803d] text-white p-2 rounded-full hover:bg-[#08682b] transition disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div 
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex sm:gap-6 gap-0"
            animate={{ x: `-${slideIndex * singleCardPercent}%` }}
            transition={{ duration: 0.4 }}
            style={{ width: `${(diaries.length / showCount) * 100}%` }}
          >
            {diaries.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg shadow-sm 
                           w-full sm:w-[90%] md:w-[45%] lg:w-[30%]
                           h-[340px] p-6 flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FcGoogle className="text-2xl" />
                  <span className="text-sm font-semibold text-gray-700">Google Review</span>
                </div>
                <div className="flex gap-1 mb-4">{getStars(item.rating)}</div>
                <p className="text-gray-700 text-sm mb-6 flex-grow">{item.text}</p>
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center mt-10 gap-4 w-full">
            <a
                href="https://www.google.com/search?sca_esv=292556bc86c4e054&sxsrf=AE3TifN8uCf_v4rU4MAvRvULQhqZB0kDtQ:1752406306738&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E0MmBCc3wY133-DJIe5aB2wivCtZ6ArxoSxKYurdVHOf9aCqPUE6vAISjisQQf1CQydbhZ4ZhhYjw7xKoS0vriwYPCXxOz5S0kLSR9FLdxGeOWfNdw%3D%3D&q=Hiya+Fashion%27s+%26+Boutique+Reviews&sa=X&ved=2ahUKEwit9qib3rmOAxVd1jgGHQ87KD8Q0bkNegQIIRAE&biw=1536&bih=695&dpr=1.25#lrd=0x3a525fece8f2d717:0x5a4c9dacae579f79,1,,,,"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
            >
                <FcGoogle className="text-xl" />
                <span>See All Google Reviews</span>
            </a>
        </div>
      </div>
    </div>
  );
}
