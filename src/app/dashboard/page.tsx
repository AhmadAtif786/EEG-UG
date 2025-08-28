"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  LogOut,
  Home,
  Settings,
  BarChart3,
  Menu,
  ChevronLeft,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const energyData = [
  { day: "Mon", consumption: 120, peak: 80 },
  { day: "Tue", consumption: 200, peak: 130 },
  { day: "Wed", consumption: 150, peak: 100 },
  { day: "Thu", consumption: 180, peak: 90 },
  { day: "Fri", consumption: 220, peak: 140 },
  { day: "Sat", consumption: 160, peak: 110 },
  { day: "Sun", consumption: 190, peak: 120 },
];

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleComingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2000); // Auto-close after 2s
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-black">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 250 }}
        className="border-r border-gray-200 bg-white/80 backdrop-blur-md flex flex-col justify-between sticky left-0 top-0 h-screen z-10 shadow-lg"
      >
        <div className="p-4">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between">
            {!collapsed && (
              <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent">
                ⚡ Energie
              </h2>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          {/* Nav */}
          <nav className="mt-8 flex flex-col gap-3">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium"
            >
              <Home size={20} />
              {!collapsed && <span>Home</span>}
            </a>

            <button
              onClick={handleComingSoon}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium text-left"
            >
              <BarChart3 size={20} />
              {!collapsed && <span>Reports</span>}
            </button>

            <button
              onClick={handleComingSoon}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium text-left"
            >
              <Settings size={20} />
              {!collapsed && <span>Settings</span>}
            </button>
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl bg-gradient-to-r from-black to-gray-600 text-white hover:opacity-90 transition"
          >
            <LogOut size={18} />
            {!collapsed && "Logout"}
          </Link>
        </div>
      </motion.aside>

      {/* Main Content (Scrollable) */}
      <main className="flex-1 px-8 py-8 overflow-y-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Overview of energy consumption & usage
          </p>
        </header>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              label: "Total Consumption",
              value: "1220 kWh",
              change: "↑ 12% vs last week",
              color: "bg-green-100 text-green-700",
            },
            {
              label: "Peak Usage",
              value: "140 kWh",
              change: "↓ 4% vs last week",
              color: "bg-red-100 text-red-700",
            },
            {
              label: "Efficiency",
              value: "92%",
              change: "↑ Stable",
              color: "bg-blue-100 text-blue-700",
            },
          ].map((metric, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl border border-gray-200 shadow-lg bg-white transition"
            >
              <h2 className="text-sm text-gray-500">{metric.label}</h2>
              <p className="text-3xl font-bold mt-2">{metric.value}</p>
              <span
                className={`${metric.color} px-2 py-1 text-xs rounded-lg mt-2 inline-block`}
              >
                {metric.change}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl border border-gray-200 shadow-lg bg-white"
          >
            <h2 className="text-xl font-semibold mb-4">Weekly Consumption</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="day" stroke="#555" />
                <YAxis stroke="#555" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="consumption"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#2563eb" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl border border-gray-200 shadow-lg bg-white"
          >
            <h2 className="text-xl font-semibold mb-4">Peak Usage</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="day" stroke="#555" />
                <YAxis stroke="#555" />
                <Tooltip />
                <Bar dataKey="peak" fill="#16a34a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Insights */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="p-6 rounded-2xl border border-gray-200 shadow-lg bg-white"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Insights</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>⚡ Highest consumption recorded on <b>Friday</b> (220 kWh)</li>
            <li>🌙 Peak usage dropped by <b>4%</b> compared to last week</li>
            <li>✅ Efficiency remained stable at <b>92%</b></li>
          </ul>
        </motion.div>

        {/* Footer */}
        <footer className="mt-10 text-center text-gray-400 text-sm">
          © 2025 EEG Unteres Görtschitztal. Alle Rechte vorbehalten.
        </footer>
      </main>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-black/70 text-white px-8 py-6 rounded-2xl shadow-2xl text-center">
              <h2 className="text-2xl font-bold mb-2">🚧 Coming Soon</h2>
              <p className="text-gray-300">This feature is under development.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
