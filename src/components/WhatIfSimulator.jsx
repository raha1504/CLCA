// WhatIfSimulator.jsx
import React from "react";

const WhatIfSimulator = ({ recycled, setRecycled, energy, setEnergy }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Scenario Testing</h2>

      {/* Recycled Slider */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">
          Recycled Aluminium: {recycled}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={recycled}
          onChange={(e) => setRecycled(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Energy Source Selection */}
      <div>
        <label className="block text-gray-700 mb-1">Energy Source</label>
        <div className="flex gap-4">
          {["grid", "renewable", "coal"].map((source) => (
            <button
              key={source}
              className={`px-4 py-2 rounded-lg ${
                energy === source ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setEnergy(source)}
            >
              {source === "grid" ? "Grid Mix" : source === "renewable" ? "Renewable" : "Coal Heavy"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatIfSimulator;
