'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const [year, setYear] = useState<any>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (year === null) return null; // Or return a loading skeleton/spinner


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
          <button className="bg-black text-white px-4 py-1 rounded transition hover:bg-gray-800">Beitreten</button>
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
            <a href="#" className="hover:underline">Start</a>
            <a href="#" className="hover:underline">Tarife</a>
            <a href="#" className="hover:underline">Mitgliederbereich</a>
            <a href="#" className="hover:underline">Kontakt</a>
            <button className="bg-black text-white px-4 py-1 rounded">Beitreten</button>
          </motion.nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-10 px-6 text-center">
        <motion.h1
          className="text-3xl md:text-4xl font-semibold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Energie. Gemeinnützig. Regional
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Die Erneuerbare-Energie-Gemeinschaft Unteres Görtschitztal hat sich <br />
          zum Ziel gesetzt, Energie zu fairen Preisen, einfach und mit geringsten <br />
          Kosten zu teilen.
        </motion.p>
        <motion.button
        initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-black text-white cursor-pointer px-6 py-2 rounded hover:bg-gray-800 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Jetzt Mitglied werden!
        </motion.button>
        <motion.div className="mt-6 flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <Image src="/banner.png" alt="Hero Illustration" width={800} height={400} />
        </motion.div>
      </section>

      {/* Members Examples */}
      <section className="py-10 px-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Beispiele unserer Mitglieder</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="bg-white rounded shadow p-4"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Image src={`/1.png`} alt={`Mitglied ${i}`} width={400} height={300} className="rounded" />
              <h3 className="font-semibold mt-2">SITES GmbH - 162 kWp</h3>
              <p className="text-sm text-gray-600">Auf Grund der Höhenlage ist die PV-Anlage der SITES GmbH gerade in den Übergansmonaten ein Garant für Lieferung bis Sonnenuntergang.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What is an Energy Community */}
      <section className="bg-gray-50 py-10 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <motion.div className="space-y-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div>
              <h2 className="text-xl md:text-5xl font-bold mb-4">Was ist eine Energiegemeinschaft?</h2>
              <p className="text-lg leading-relaxed">Einfach gesagt, ist eine Energiegemeinschaft der Zusammenschluss von mindestens zwei Teilnehmer:innen zur gemeinsamen Produktion und Verwertung von Energie.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Gemeinschaftliche Erzeugungsanlagen (GEA)</h3>
              <p className="text-base leading-relaxed">Gemeinschaftlichen Erzeugungsanlagen – kurz GEA genannt – können in Österreich seit 2017 umgesetzt werden und gelten als kleine Vorläufer der Energiegemeinschaften. Im Rahmen einer GEA kann der selbst erzeugte Strom (z.B. von der PV-Anlage am Dach einer Wohnanlage) direkt von mehreren Teilnehmer:innen genutzt werden. Bereits über 3.000 aktive GEAs existieren derzeit in Österreich.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Erneuerbare-Energie-Gemeinschaften (EEG)</h3>
              <p className="text-base leading-relaxed">Einfach gesagt, bezeichnet eine Erneuerbare-Energie-Gemeinschaft den Zusammenschluss von mindestens zwei Teilnehmer:innen zur gemeinsamen Produktion und Verwertung von Energie aus erneuerbaren Quellen. Wenn das Modell auch in erster Linie für die Nutzung von erneuerbarem Strom geschaffen wurde, so ist es auch für erneuerbare Wärme oder erneuerbares Gas offen.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Bürgerenergiegemeinschaften (BEG)</h3>
              <p className="text-base leading-relaxed">Die Bürgerenergiegemeinschaft darf sich – im Vergleich zur EEG – über die Konzessionsgebiete mehrerer Netzbetreiber in ganz Österreich erstrecken, sie ist aber auf Strom beschränkt und es entfallen die finanziellen Vergünstigungen.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }}>
            <Image src="/energy.png" alt="Community Diagram" width={600} height={400} />
            <Image src="/energy2.png" alt="Community Diagram" width={600} height={400} className="mt-4" />
          </motion.div>
        </div>
      </section>

      {/* Chart */}
      <div className="my-10">
        <Image src="/chart.png" className="m-auto" alt="Logo 1" width={600} height={50} />
      </div>

      {/* Logos */}
      <section className="py-10 px-6 bg-white overflow-hidden">
        <h2 className="text-xl font-semibold mb-6 text-center">Mitglieder Logos</h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-infinite-scroll gap-12">
            {[...Array(2)].flatMap((_, i) =>
              [1, 2, 3, 4].map((n, j) => (
                <Image
                  key={`${i}-${j}`}
                  src={`/slider${n}.png`}
                  alt={`Logo ${n}`}
                  width={200}
                  height={100}
                  className="inline-block"
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 px-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {year} EEG Unteres Görtschitztal. Alle Rechte vorbehalten.</p>
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:underline">Datenschutz</a>
          <a href="#" className="hover:underline">Impressum</a>
        </div>
      </div>
    </footer>
    </main>
  );
}