"use client";

import { useEffect, useState } from "react";
import {
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// 🔹 normalize API response
function normalizeApiResponse(apiRes: any) {
  const result: any[] = [];

  Object.entries(apiRes.data).forEach(([meteringPoint, mpData]: any) => {
    const { direction, data } = mpData;
    data.forEach((row: any) => {
      result.push({
        meteringPoint,
        direction,
        time: row.ts,
        consumption: row.value[0],
        peak: row.value[1],
      });
    });
  });

  return result;
}

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [agg, setAgg] = useState("1h");

  const fetchEnergy = async (aggValue: string) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found, please login again");

      const cpsRes = await fetch("/api/userpoints", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cpsJson = await cpsRes.json();
      if (!cpsJson.success) throw new Error(cpsJson.error || "No points found");

      const now = Date.now();
      const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

      const res = await fetch("/api/energy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ecId: "AT00700009020RC101905000000689941",
          cps: cpsJson.cps,
          start: oneWeekAgo,
          end: now,
          agg: aggValue,
        }),
      });

      const result = await res.json();

      if (result.success) {
        const formatted = normalizeApiResponse(result).map((row) => ({
          ...row,
          time:
            aggValue === "1h"
              ? new Date(row.time).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                })
              : new Date(row.time).toLocaleDateString("en-GB", {
                  timeZone: "UTC",
                }),
        }));

        setData(formatted);
      } else {
        alert("Failed: " + JSON.stringify(result.error));
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching energy data");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchEnergy(agg);
  }, [agg]);

  const handleComingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2000);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg bg-white shadow-md p-3 border border-gray-200">
          <p className="text-sm font-semibold text-gray-600">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm text-gray-800">
              {item.name}: <span className="font-bold">{item.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // 🔹 Combine CONSUMPTION + GENERATION per time key
  const combinedData = Object.values(
    data.reduce((acc: any, curr: any) => {
      const { time, direction, consumption, peak } = curr;
      if (!acc[time])
        acc[time] = { time, consumptionValue: null, generationValue: null, consumptionPeak: null, generationPeak: null };
      if (direction === "CONSUMPTION") {
        acc[time].consumptionValue = consumption;
        acc[time].consumptionPeak = peak;
      } else if (direction === "GENERATION") {
        acc[time].generationValue = consumption;
        acc[time].generationPeak = peak;
      }
      return acc;
    }, {})
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-black">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 250 }}
        className="border-r border-gray-200 bg-white/80 backdrop-blur-md flex flex-col justify-between sticky left-0 top-0 h-screen z-10 shadow-lg"
      >
        <div className="p-4">
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

      {/* Main */}
      <main className="flex-1 px-8 py-8 overflow-y-auto">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Overview of energy consumption & generation
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mr-2">
              Interval:
            </label>
            <select
              value={agg}
              onChange={(e) => setAgg(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-300"
            >
              <option value="1h">Hourly</option>
              <option value="1d">Daily</option>
            </select>
          </div>
        </header>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Bar Chart 1: Energy Trends */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Energy Trends ({agg === "1h" ? "Hourly" : "Daily"})
              </h2>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  <span className="text-gray-600">Consumption</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  <span className="text-gray-600">Generation</span>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-[300px]">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={combinedData}
                  barCategoryGap="30%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="consumptionValue"
                    fill="#f97316"
                    name="Consumption"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="generationValue"
                    fill="#2563eb"
                    name="Generation"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Bar Chart 2: Peak Usage */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Peak Usage ({agg === "1h" ? "Hourly" : "Daily"})
              </h2>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  <span className="text-gray-600">Consumption</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  <span className="text-gray-600">Generation</span>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-[300px]">
                <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={combinedData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="consumptionPeak"
                    fill="#f97316"
                    name="Consumption Peak"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="generationPeak"
                    fill="#2563eb"
                    name="Generation Peak"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </main>

      {/* Coming Soon */}
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
              <p className="text-gray-300">
                This feature is under development.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
