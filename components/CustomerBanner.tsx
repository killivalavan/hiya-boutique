import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function CustomerBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [clients, setClients] = useState(0);
  const [years, setYears] = useState(0);
  const [satisfaction, setSatisfaction] = useState(90);

  useEffect(() => {
    if (isInView) {
      let c = 0;
      const clientsInterval = setInterval(() => {
        c += 5;
        if (c >= 1000) {
          c = 1000;
          clearInterval(clientsInterval);
        }
        setClients(c);
      }, 20);

      let y = 0;
      const yearsInterval = setInterval(() => {
        y += 1;
        if (y >= 7) {
          y = 7;
          clearInterval(yearsInterval);
        }
        setYears(y);
      }, 300);

      let s = 90;
      const satisfactionInterval = setInterval(() => {
        s += 1;
        if (s >= 100) {
          s = 100;
          clearInterval(satisfactionInterval);
        }
        setSatisfaction(s);
      }, 300);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      aria-label="Customer Trust Statistics"
      className="w-full bg-gray-100 py-10 px-6 sm:px-0"

    >
      <div className="bg-white shadow-xl px-4 sm:px-8 py-10 sm:py-14 rounded-lg max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-gray-800">
          <div>
            <p className="text-4xl sm:text-5xl font-bold">{clients.toLocaleString()}+</p>
            <p className="text-lg sm:text-xl mt-2">Happy Clients</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-bold">{years}+</p>
            <p className="text-lg sm:text-xl mt-2">Years of Experience</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-bold">{satisfaction}%</p>
            <p className="text-lg sm:text-xl mt-2">Satisfaction Guaranteed</p>
          </div>
        </div>
      </div>
    </section>
  );
}
