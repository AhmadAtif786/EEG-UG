'use client';
import { useRouter } from "next/navigation"; // ✅ App Router
import { useState } from "react";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [status, setStatus] = useState("");
    const router = useRouter();  // ✅ works now

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Logging in...");

        try {
            // fake login request
            await new Promise((resolve) => setTimeout(resolve, 1200));

            if (form.email && form.password) {
                setStatus("✅ Login successful!");
                setForm({ email: "", password: "" });

                // redirect to dashboard
                setTimeout(() => {
                    router.push("/dashboard"); // ✅ App router redirect
                }, 1000);
            } else {
                setStatus("❌ Invalid credentials.");
            }
        } catch (error) {
            setStatus("❌ Error logging in.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 py-12">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">

                <h1 className="text-4xl font-extrabold text-center mb-2 tracking-tight text-black">
                    Welcome Back
                </h1>
                <p className="text-gray-500 text-center mb-8">
                    Please sign in to continue
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-black text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition"
                    >
                        Login
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
