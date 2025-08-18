'use client';

export default function BeAMember() {
    return (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
            <p className="text-lg text-gray-700 mb-6">
                Bitte übermitteln Sie uns Ihre Daten, damit wir Ihre Teilnahme an der Energiegemeinschaft prüfen können.
            </p>

            <form className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 align-items-end" style={{"alignItems": "end" }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Gemeinde / Firma / Verein / Organisation</label>
                        <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Register-Nr. (Firmenbuch, ZVR-Zahl, Gemeindekennziffer, etc):</label>
                        <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">UID-Nummer</label>
                        <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Nachname</label>
                        <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Vorname</label>
                        <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Geburtsdatum (bei Privatpersonen)</label>
                        <input type="date" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Telefonnummer</label>
                        <input type="tel" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Rechnungsadresse (Straße, Hausnummer)</label>
                        <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">PLZ</label>
                        <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Ort</label>
                        <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                {/* Mail */}
                <div>
                    <label className="block text-sm font-medium text-gray-600">Mail-Adresse (Für die Zusendung von Abrechnungen und generelle Mitgliederinformationen)</label>
                    <input type="email" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="border border-gray-300 p-4 rounded-lg">
                    <div className="mb-4">
                        <b>Informationen zum Bankkonto</b> (abbuchungsrelevante Daten und Lastschriftermächtigung / SEPA-Lastschrift)
                        <br />
                        <b>SEPA - Lastschriftmandat:</b> Ich ermächtige / Wir ermächtigen die Erneuerbare-Energie-Gemeinschaft Unteres Görtschitztal, Zahlungen von meinem / unserem Konto mittels SEPA – Lastschrift einzuziehen. Zugleich weise ich mein / weisen wir unser Kreditinstitut an, die von der Erneuerbare-Energie-Gemeinschaft Unteres Görtschitztal auf mein / unser Konto gezogenen SEPA – Lastschriften einzulösen. Ich kann / Wir können innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrages verlangen. Es gelten dabei die mit meinem / unserem Kreditinstitut vereinbarten Bedingungen.
                        Zahlungsempfänger: Erneuerbare-Energie-Gemeinschaft Unteres Görtschitztal, St. Walburgen 81, 9372 Eberstein, Österreich, CID: AT68ZZZ00000078640, Mandatsreferenz: EEG-UG-(zukünftige) Mitgliedsnummer
                    </div>
                    {/* Bank Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Name Kontoinhaber</label>
                            <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Name Bank / Institut</label>
                            <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">IBAN</label>
                            <input placeholder="AT -- ---- ---- ---- ----" className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">BIC</label>
                            <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    Sollte die Teilnahme an der Energiegemeinschaft aus technischen Gründen nicht möglich sein, wird der eingebrachte Antrag gelöscht. Eine Vereinsmitgliedschaft kommt somit nicht zu Stande.
                </div>
                <div className="border border-gray-300 p-4 rounded-lg">
                    <div className="mb-4">
                        <b>Anlagendaten</b><br />
                        wie auf dem Netzzugangsvertrag des jeweiligen Zählpunkts angegeben. Sollten weitere Zählpunkte hinzugefügt werden, können Sie diese auf der nächsten Seite unter „weitere Anlagen“ als Mitgliedszählpunkte bekanntgeben. Die Anlage(n) muss/müssen sich im Netz der KNG-Kärnten Netz GmbH in der Region mit der Regional-ID 25R1 befinden und mit einem Smart Meter ausgestattet sein.
                    </div>

                    {/* Installation Info */}
                    <div className="grid grid-cols-1 mb-4 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Bezugszählpunkt:
                                (33-stellige Zählpunktnummer)

                            </label>
                            <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Einspeisezählpunkt:
                                (33-stellige Zählpunktnummer)</label>
                            <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Anlagenadresse:
                            (Straße, Hausnummer) </label>
                        <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="grid grid-cols-1 mb-4 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">PLZ</label>
                            <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600">Ort</label>
                            <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Anlagenleistung in kWp (Engpassleistung)</label>
                        <input className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                {/* Consent */}
                <div className="border border-gray-300 p-4 rounded-lg">
                    <div className="mb-4"> 
                        <b>  Zustimmungserklärung – EEG Unteres Görtschitztal</b> <br />
                        Für den Beitritt zur EEG notwendig.
                    </div>
                    <div className="space-y-2 cursor-pointer">
                        <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                            <span><b>Beitritt zur EEG Unteres Görtschitztal</b> – Ich habe die geltenden Statuten im Anhang gelesen und bin damit einverstanden. Die laufend aktualisierten Statuten und weitere Informationen finden sich auf der Seite <a href="https://www.eeg-ug.at/" className="text-blue-700">www.eeg-ug.at</a></span>
                        </label>
                        <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                            <span><b>Mitglieds- und Stromliefervertrag</b>,  als auch die zugehörigen Konditionen und Tarifblätter gelten mit der Unterschrift als verstanden und akzeptiert. Alle gültigen Tarife und Tarifblätter finden sich auch der Seite <a href="https://www.eeg-ug.at/" className="text-blue-700">www.eeg-ug.at</a></span>
                        </label>
                    </div>
                </div>

                {/* File Upload */}
                <div >
                    <label className="cursor-pointer block mb-1 text-sm font-medium text-gray-600">
                        Ausweis hochladen – (upload file – picture of passport, etc.)
                    </label>
                    <input type="file" className="cursor-pointer block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
        file:rounded-lg file:border-0 file:text-sm file:font-semibold 
        file:bg-black-50 file:text-black-700 hover:file:bg-black-100" />
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <button type="submit" className="w-full md:w-auto px-6 py-2 bg-black text-white rounded-lg shadow hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-black-500">
                        Absenden
                    </button>
                </div>
            </form >
        </div >

    );
}
