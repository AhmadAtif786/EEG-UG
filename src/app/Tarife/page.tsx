'use client';
import img13 from '../../../public/image_13.svg';
import img14 from '../../../public/image_14.svg';
import img15 from '../../../public/image_15.svg';
import Image from "next/image";

export default function Tarife() {
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center px-6 py-12">
            <div className="max-w-4xl w-full space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        EEG Entgeltbestimmungen
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Übersicht zu Bezugstarif, Abgaben und Einsparungen
                    </p>
                </div>

                {/* Allgemeines */}
                <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-black-700">
                        Allgemeines zu den Entgeltbestimmungen
                    </h2>
                    <p className="text-gray-700">
                        Der Bezugstarif richtet sich prinzipiell nach den gängigen Marktpreisen der großen heimischen Energieanbieter.
                        Die Preisgestaltung soll jedoch ungeachtet einer Bindung an diese, eine Win-Win-Situation für Verbraucher und Erzeuger schaffen.
                        Verbraucher sollen einen günstigeren Gesamtpreis erhalten, als es am Markt der Fall ist und Erzeuger sollen ein faires Entgelt erhalten,
                        welches auch deutlich über dem Markt liegt und zum weiteren Ausbau der erneuerbaren Energien beiträgt.
                    </p>
                    <p className="text-gray-700">
                        Die Aufteilung der zur Verfügung stehenden Energie erfolgt dynamisch
                        (keine fix zugewiesenen Kontingente, bei zu geringer Stromerzeugung erfolgt die Stromzuteilung aliquot anhand
                        der bezogenen Anteile der belieferten Bezugszählpunkte).
                    </p>
                    <p className="text-gray-700">
                        In der regionalen EEG werden <span className="font-semibold">28%</span> auf den Arbeitspreis des Netzbetreibers eingespart
                        und die Elektrizitätsabgabe sowie der Erneuerbaren-Förderbeitrag für jede Kilowattstunde Strom, der aus der EEG bezogen wird,
                        entfallen gänzlich.
                    </p>
                </div>

                {/* Hinweis */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-blue-800 font-medium">
                    Dies bedeutet für das Gebiet der EEG Unteres Görtschitztal (Kärnten Netz GmbH):
                </div>

                {/* Cards */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Netznutzungsentgelt */}
                    <div className="bg-white shadow-md rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Netznutzungsentgelt</h3>
                        <p className="mt-2 text-gray-700">
                            Kärnten Netz GmbH 2025: <strong>9,76 c/kWh exkl. 20% USt.</strong>
                        </p>
                        <p className="mt-1 text-gray-700">
                            → 28% regionale EEG Ersparnis: 9,76 c/kWh -28% (2,73 c/kWh) ={" "}
                            <strong>7,03 c/kWh exkl. USt.</strong>
                        </p>
                    </div>

                    {/* Elektrizitätsabgabe */}
                    <div className="bg-white shadow-md rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Elektrizitätsabgabe</h3>
                        <p className="mt-2 text-gray-700">
                            <strong>1,5 c/kWh</strong>
                        </p>
                        <p className="mt-1 text-gray-700">
                            Für die über die EEG bezogene Energie entfällt diese komplett.
                        </p>
                    </div>

                    {/* Erneuerbaren Förderbeitrag */}
                    <div className="bg-white shadow-md rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Erneuerbaren Förderbeitrag</h3>
                        <p className="mt-2 text-gray-700">
                            <strong>0,796 c/kWh</strong>
                        </p>
                        <p className="mt-1 text-gray-700">
                            Für die über die EEG bezogene Energie entfällt dieser komplett.
                        </p>
                    </div>

                    {/* Umsatzsteuerersparnis */}
                    <div className="bg-white shadow-md rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Umsatzsteuerersparnis</h3>
                        <p className="mt-2 text-gray-700">
                            Solange die EEG in die Kleinunternehmerregelung fällt (Umsatz &lt;55.000€ brutto),
                            wird der Nettobetrag der Tarife eingehoben.
                        </p>
                    </div>
                </div>

                {/* Beispiel Verbraucher */}
                <h3 className="text-lg font-semibold text-black-800">Beispiel Verbraucher
                    <span className="text-gray-700">
                        (Vergleich mit KELAG Vorteilstarif)
                    </span>
                </h3>
                <Image src={img13} alt=''/>            
                <Image src={img14} alt=''/>            
                <Image src={img15} alt=''/>            
                </div>
        </div>
    );
}
