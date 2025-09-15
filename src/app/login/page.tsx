"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [stage, setStage] = useState<"email" | "login" | "signup">("email");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let body: any = { step: "", email };

      if (stage === "email") {
        body.step = "emailCheck";
      } else if (stage === "login") {
        body = { step: "login", email, password };
      } else if (stage === "signup") {
        body = { step: "createPassword", email, createPassword };
      }

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      // handle responses
      if (data.mode === "login") {
        setStage("login");
        toast.success("Email found. Please enter your password.");
      } else if (data.mode === "createPassword") {
        setStage("signup");
        toast("Member found. Please create a password.", { icon: "⚠️" });
      } else {
        // Login or signup completed
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        toast.success(data.message || "Success!");
        setTimeout(() => router.push("/dashboard"), 1000);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center mb-2 tracking-tight text-black">
          {stage === "email" && "Welcome"}
          {stage === "login" && "Enter Password"}
          {stage === "signup" && "Complete Signup"}
        </h1>
        <p className="text-gray-500 text-center mb-8">
          {stage === "email" && "Enter your email to continue"}
          {stage === "login" &&
            "We found your email. Please enter your password."}
          {stage === "signup" &&
            "We found your email in members. Please create a password."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {stage === "email" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              />
            </div>
          )}

          {stage === "login" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              />
            </div>
          )}

          {stage === "signup" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Create Password
              </label>
              <input
                type="password"
                value={createPassword}
                disabled={loading}
                onChange={(e) => setCreatePassword(e.target.value)}
                required
                placeholder="Choose a strong password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : stage === "email"
              ? "Continue"
              : stage === "login"
              ? "Login"
              : "Create Account & Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
