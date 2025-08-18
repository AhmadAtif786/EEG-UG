'use client';
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (error) {
      setStatus("❌ Error sending message.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-4xl font-extrabold text-center  mb-6">
          Contact Us
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Have questions or feedback? Fill out the form and we’ll get back to you soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Write your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p
            className={`mt-6 text-center text-sm font-medium ${
              status.startsWith("✅")
                ? "text-green-600"
                : status.startsWith("❌")
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
