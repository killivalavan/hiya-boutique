'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const isMediaGallery = router.pathname.includes('/gallery/')
  const isAdminPage = router.pathname.includes('/admin')
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center h-[66px]">
      {/* Logo + Brand */}
       <Link href="/">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden sm:flex space-x-6 text-sm sm:text-base items-center">
       {!isHomePage && ( <Link href="/">
          <span className="hover:text-[#8ac63e] cursor-pointer">Home</span>
        </Link>
      )}
        {!isMediaGallery && !isAdminPage &&
          <>
            <Link href="#our-services">
              <span className="hover:text-[#8ac63e] cursor-pointer">Our Services</span>
            </Link>
          
            <Link href="#collections">
              <span className="hover:text-[#8ac63e] cursor-pointer">All Collection</span>
            </Link>

            <Link href="#customer-diaries">
              <span className="hover:text-[#8ac63e] cursor-pointer">Customer Diaries</span>
            </Link>
          </>
        }
        {!isAdminPage && <Link href="#about">
            <span className="hover:text-[#8ac63e] cursor-pointer">About</span>
          </Link>  
        }
        </div>

      {/* Hamburger Icon */}
      <div className="sm:hidden">
        {menuOpen ? (
          <FiX size={24} onClick={() => setMenuOpen(false)} className="cursor-pointer" />
        ) : (
          <FiMenu size={24} onClick={() => setMenuOpen(true)} className="cursor-pointer" />
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[66px] left-0 w-full bg-black text-white flex flex-col items-start px-6 py-4 space-y-4 sm:hidden z-50 shadow-lg">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <span className="hover:text-[#8ac63e] cursor-pointer">Home</span>
          </Link>
          <Link href="#collections" onClick={() => setMenuOpen(false)}>
            <span className="hover:text-[#8ac63e] cursor-pointer">All Collection</span>
          </Link>
           <Link href="#customer-diaries" onClick={() => setMenuOpen(false)}>
            <span className="hover:text-[#8ac63e] cursor-pointer">Customer Diaries</span>
          </Link>
          <Link href="#about" onClick={() => setMenuOpen(false)}>
            <span className="hover:text-[#8ac63e] cursor-pointer">About</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
