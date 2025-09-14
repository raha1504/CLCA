// Dashboard.jsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import WhatIfSimulator from "../components/WhatIfSimulator";
import EnhancedSankey from "../components/EnhancedSankey";

const Dashboard = () => {
  // Load initial scenario from localStorage if available
  const stored = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("inputDataForm") || "null");
    } catch {
      return null;
    }
  }, []);

  // Scenario state
  const initialRecycled = stored?.recycledPercent ?? 30;
  const initialEnergy = stored?.energySource ?? "grid";
  const [scenario, setScenario] = useState({
    recycled: initialRecycled,
    energySource: initialEnergy,
  });

  // Pie chart data
  const pieData = useMemo(() => [
    { name: "Raw", value: 100 - scenario.recycled },
    { name: "Recycled", value: scenario.recycled },
  ], [scenario.recycled]);

  // Bar chart data (dummy linear vs circular emissions)
  const barData = useMemo(() => [
    { name: "Baseline", Linear: 1000, Circular: 700 },
    { 
      name: "Scenario", 
      Linear: 1000 * (1 - scenario.recycled / 200), 
      Circular: 700 * (1 - scenario.recycled / 250) 
    },
  ], [scenario.recycled]);

  const COLORS = ["#94a3b8", "#0ea5e9"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Interactive visualizations and scenario testing for LCA analysis.
        </p>
      </div>

      {/* What-If Simulator */}
      <div className="mb-8">
        <WhatIfSimulator
          recycled={scenario.recycled}
          setRecycled={(val) => setScenario({ ...scenario, recycled: val })}
          energy={scenario.energySource}
          setEnergy={(val) => setScenario({ ...scenario, energySource: val })}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card h-96 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Raw vs Recycled</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ReTooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card h-96 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Emissions: Linear vs Circular</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ReTooltip />
              <Bar dataKey="Linear" fill="#94a3b8" />
              <Bar dataKey="Circular" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Enhanced Sankey */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <EnhancedSankey
          material="aluminium"
          recycledPercent={scenario.recycled}
          energySource={scenario.energySource}
        />
      </motion.div>
    </div>
  );
};

export default Dashboard;
