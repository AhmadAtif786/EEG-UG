"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

interface SupplyPoint {
  value: string;
}

interface FeedPoint {
  value: string;
}

interface MemberFormData {
  organisation: string;
  registerNr: string;
  uid: string;
  lastName: string;
  firstName: string;
  birthDate: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  email: string;
  accountHolder: string;
  bankName: string;
  iban: string;
  bic: string;
  supplyPoint: { value: string }[]; // ✅ match backend
  feedPoint: { value: string }[];   // ✅ match backend
  installationAddress: string;
  installationZip: string;
  installationCity: string;
  installationPower: string;
  consentEEG: boolean;
  consentContract: boolean;
  document?: File | null;
}

export default function BeAMember() {
  const [formData, setFormData] = useState<MemberFormData>({
    organisation: "",
    registerNr: "",
    uid: "",
    lastName: "",
    firstName: "",
    birthDate: "",
    phone: "",
    address: "",
    zip: "",
    city: "",
    email: "",
    accountHolder: "",
    bankName: "",
    iban: "",
    bic: "",
   supplyPoint: [{ value: "" }], // ✅
  feedPoint: [{ value: "" }],   // ✅
    installationAddress: "",
    installationZip: "",
    installationCity: "",
    installationPower: "",
    consentEEG: false,
    consentContract: false,
    document: null,
  });
 const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
 setLoading(true);
  try {
    const formToSend = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
  if (value !== null && value !== undefined) {
    if (Array.isArray(value)) {
      formToSend.append(key, JSON.stringify(value)); // ✅ both supplyPoint/feedPoint
    } else {
      formToSend.append(key, value as any);
    }
  }
});


    const res = await fetch("/api/member", {
      method: "POST",
      body: formToSend,
    });

    if (!res.ok) throw new Error("Failed to submit");
   
      toast.success("Formular erfolgreich übermittelt!");
  } catch (error:any) {
      toast.error(error.message || "Fehler beim Absenden des Formulars.");
  }
  finally {
      setLoading(false);
    }
};


 const handleArrayChange = (
  e: ChangeEvent<HTMLInputElement>,
  type: "supplyPoint" | "feedPoint", // ✅ match backend
  index: number
) => {
  const { value } = e.target;
  setFormData((prev) => {
    const updated = [...prev[type]];
    updated[index] = { value };
    return { ...prev, [type]: updated };
  });
};

const addField = (type: "supplyPoint" | "feedPoint") => {
  setFormData((prev) => ({
    ...prev,
    [type]: [...prev[type], { value: "" }],
  }));
};

const removeField = (type: "supplyPoint" | "feedPoint", index: number) => {
  setFormData((prev) => {
    const updated = [...prev[type]];
    updated.splice(index, 1);
    return { ...prev, [type]: updated };
  });
};


  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
      <p className="text-lg text-gray-700 mb-6">
        Bitte übermitteln Sie uns Ihre Daten, damit wir Ihre Teilnahme an der
        Energiegemeinschaft prüfen können.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 align-items-end"
          style={{ alignItems: "end" }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Gemeinde / Firma / Verein / Organisation
            </label>
            <input
              name="organisation"
              value={formData.organisation}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Register-Nr. (Firmenbuch, ZVR-Zahl, Gemeindekennziffer, etc):
            </label>
            <input
              name="registerNr"
              value={formData.registerNr}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              UID-Nummer
            </label>
            <input
              name="uid"
              value={formData.uid}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Nachname
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Vorname
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Geburtsdatum (bei Privatpersonen)
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Telefonnummer
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Rechnungsadresse (Straße, Hausnummer)
            </label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              PLZ
            </label>
            <input
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Ort
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Mail */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Mail-Adresse
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Bank Info */}
        <div className="border border-gray-300 p-4 rounded-lg">
          <b>Informationen zum Bankkonto</b>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Name Kontoinhaber
              </label>
              <input
                name="accountHolder"
                value={formData.accountHolder}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Name Bank / Institut
              </label>
              <input
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                IBAN
              </label>
              <input
                name="iban"
                value={formData.iban}
                onChange={handleChange}
                placeholder="AT -- ---- ---- ---- ----"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                BIC
              </label>
              <input
                name="bic"
                value={formData.bic}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Installation Info */}
       <div className="border border-gray-300 p-4 rounded-lg">
  <b>Anlagendaten</b>

  {/* Supply Points */}
  <div className="mt-4">
    <label className="block text-sm font-medium text-gray-600">
      Bezugszählpunkte
    </label>
    {formData.supplyPoint.map((sp, i) => (
      <div key={i} className="flex gap-2 mt-2">
        <input
          value={sp.value}
          onChange={(e) => handleArrayChange(e, "supplyPoint", i)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
        />
        {formData.supplyPoint.length > 1 && (
          <button
            type="button"
            onClick={() => removeField("supplyPoint", i)}
            className="px-3 py-1 bg-red-500 text-white rounded-lg"
          >
            ✕
          </button>
        )}
      </div>
    ))}
    <button
      type="button"
      onClick={() => addField("supplyPoint")}
      className="mt-2 text-blue-600 text-sm"
    >
      + Add Bezugszählpunkt
    </button>
  </div>

  {/* Feed Points */}
  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-600">
      Einspeisezählpunkte
    </label>
    {formData.feedPoint.map((fp, i) => (
      <div key={i} className="flex gap-2 mt-2">
        <input
          value={fp.value}
          onChange={(e) => handleArrayChange(e, "feedPoint", i)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
        />
        {formData.feedPoint.length > 1 && (
          <button
            type="button"
            onClick={() => removeField("feedPoint", i)}
            className="px-3 py-1 bg-red-500 text-white rounded-lg"
          >
            ✕
          </button>
        )}
      </div>
    ))}
    <button
      type="button"
      onClick={() => addField("feedPoint")}
      className="mt-2 text-blue-600 text-sm"
    >
      + Add Einspeisezählpunkt
    </button>
  </div>
</div>


        {/* Consent */}
        <div className="border border-gray-300 p-4 rounded-lg">
          <b>Zustimmungserklärung – EEG Unteres Görtschitztal</b>
          <div className="space-y-2 mt-4">
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="consentEEG"
                checked={formData.consentEEG}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span>Beitritt zur EEG Unteres Görtschitztal</span>
            </label>
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="consentContract"
                checked={formData.consentContract}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span>Mitglieds- und Stromliefervertrag akzeptiert</span>
            </label>
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Ausweis hochladen
          </label>
          <input
            type="file"
            name="document"
            onChange={handleChange}
            className="cursor-pointer block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg"
          />
        </div>

        {/* Submit */}
       <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-auto px-6 py-2 rounded-lg shadow text-white cursor-pointer transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Wird gesendet..." : "Absenden"}
          </button>
        </div>
      </form>
    </div>
  );
}
