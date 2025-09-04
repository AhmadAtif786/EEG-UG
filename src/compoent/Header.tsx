'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion } from 'framer-motion';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div>   <header className="w-full py-4 px-6 border-b shadow-sm flex items-center justify-between relative bg-white text-black">
      <div className="flex items-center gap-2">
        <Image src="/Logo_EEG_UG.png" alt="EEG Logo" width={120} height={40} />
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <Link href="/" className="hover:underline">Start</Link>
        <Link href="/Tarife" className="hover:underline">Tarife</Link>
        <Link href="/BeAMember" className="hover:underline">Mitgliederbereich</Link>
        <Link href="/Contact" className="hover:underline">Kontakt</Link>
        <Link href="/login" className="bg-black text-white px-4 py-1 rounded transition hover:bg-gray-800">Login</Link>
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start p-4 gap-4 z-10 md:hidden"
        >
          <Link href="/" className="hover:underline">Start</Link>
          <Link href="/Tarife" className="hover:underline">Tarife</Link>
          <Link href="/BeAMember" className="hover:underline">Mitgliederbereich</Link>
          <Link href="/Contact" className="hover:underline">Kontakt</Link>
          <Link href="/login" className="bg-black text-white px-4 py-1 rounded">Login</Link>
        </motion.nav>
      )}
    </header></div>
  )
}

export default Header