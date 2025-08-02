'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="bg-white text-black font-sans">
      {/* Header */}
      <header className="w-full py-4 px-6 border-b shadow-sm flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <Image src="/Logo_EEG_UG.png" alt="EEG Logo" width={120} height={40} />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="hover:underline">Start</a>
          <a href="#" className="hover:underline">Tarife</a>
          <a href="#" className="hover:underline">Mitgliederbereich</a>
          <a href="#" className="hover:underline">Kontakt</a>
          <button className="bg-black text-white px-4 py-1 rounded">Beitreten</button>
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
          <nav className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start p-4 gap-4 z-10 md:hidden">
            <a href="#" className="hover:underline">Start</a>
            <a href="#" className="hover:underline">Tarife</a>
            <a href="#" className="hover:underline">Mitgliederbereich</a>
            <a href="#" className="hover:underline">Kontakt</a>
            <button className="bg-black text-white px-4 py-1 rounded">Beitreten</button>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-10 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">Energie. Gemeinnützig. Regional</h1>
        <p className="text-gray-600 mb-4">
          Die Erneuerbare-Energie-Gemeinschaft Unteres Görtschitztal hat sich <br />
          zum Ziel gesetzt, Energie zu fairen Preisen, einfach und mit geringsten <br />
          Kosten zu teilen.
        </p>
        <button className="bg-black text-white px-6 py-2 rounded">Jetzt Mitglied werden!</button>
        <div className="mt-6 flex justify-center">
          <Image src="/banner.png" alt="Hero Illustration" width={800} height={400} />
        </div>
      </section>

      {/* Members Examples */}
      <section className="py-10 px-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Beispiele unserer Mitglieder</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded shadow p-4">
              <Image src={`/${i}.png`} alt={`Mitglied ${i}`} width={400} height={300} className="rounded" />
              <h3 className="font-semibold mt-2">Subsheading</h3>
              <p className="text-sm text-gray-600">Tap here to add whatever you'd like to say more of.</p>
            </div>
          ))}
        </div>
      </section>

      {/* What is an Energy Community */}
      <section className="bg-gray-50 py-10 px-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Was ist eine <br /> Energiegemeinschaft?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <h3 className="font-semibold">Subsheading</h3>
                <p className="text-sm text-gray-600">Tap here to add whatever you'd like to say more of.</p>
              </div>
            ))}
          </div>
          <div>
            <Image src="/energy.png" alt="Community Diagram" width={600} height={400} />
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-10 px-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">SLIDER - Logos of members</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <Image src="/logo1.png" alt="Logo 1" width={100} height={50} />
          <Image src="/logo2.png" alt="Logo 2" width={100} height={50} />
          <Image src="/logo3.png" alt="Logo 3" width={100} height={50} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} EEG Unteres Görtschitztal. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:underline">Datenschutz</a>
            <a href="#" className="hover:underline">Impressum</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
