import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export function WhatsAppButton() {
  // Replace this with your actual number
  const phoneNumber = '7299927172'; // No + or spaces

  // Your pre-filled message
  const message = encodeURIComponent(
    "Hi there, I'm interested in your boutique collections!"
  );

  return (
    <Link
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="fixed bottom-4 left-4 bg-green-500 text-white p-3 rounded-full shadow-lg z-50 hover:bg-green-600 transition-all">
        <FaWhatsapp size={24} />
      </div>
    </Link>
  );
}
