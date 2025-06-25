import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-10 text-sm mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
        {/* Left: Logo */}
        <div className="flex flex-col items-start">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
          <p className="mt-2 font-semibold">Brown Fening Boutique</p>
        </div>

        {/* Center: Address + Social Media */}
        <div className="text-center">
          <h4 className="font-bold mb-2">Address</h4>
          <p>Hiya Fashions & Boutique, No.21,
            RKV Avenue Main Road,
            Zamin Pallavaram,
            Chennai - 600117.
          </p>
          <p className="mt-4 font-bold">Follow us</p>
          <div className="flex justify-center gap-4 mt-2 text-white text-lg">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        {/* Right: Contact */}
        <div className="text-right sm:text-left">
          <h4 className="font-bold mb-2">Contact Us</h4>
          <p>📞 +91-9876543210</p>
          <p>📞 +91-9123456780</p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-xs mt-6 text-gray-400">
        © 2025 Brown Fening Boutique. All rights reserved.
      </div>
    </footer>
  );
}
