import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

type WhatsAppButtonProps = {
  message?: string;
  phoneNumber?: string;
  text?: string;
  large?: boolean;
};

export function WhatsAppButton({
  message = "Hi there, I'm interested in your boutique collections!",
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER as string,
  text,
  large = false,
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
console.log("WhatsApp number:", phoneNumber);
  return (
    <Link
      href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {large ? (
        <button className="flex bg-green-600 text-white px-6 py-3 rounded-lg mx-auto mt-4 hover:bg-green-700 transition">
          <FaWhatsapp className="inline-block mr-2 text-2xl" />
          {text || "Chat on WhatsApp"}
        </button>
      ) : (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white p-3 rounded-full shadow-lg z-50 hover:bg-green-600 transition-all">
          <FaWhatsapp size={24} />
        </div>
      )}
    </Link>
  );
}
