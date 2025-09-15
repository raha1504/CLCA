import React, { useState, useEffect } from "react";

const InputData = () => {
  // State for inputs
  const [material, setMaterial] = useState("Aluminium");
  const [quantity, setQuantity] = useState(1000);
  const [unit, setUnit] = useState("kg");
  const [productionRoute, setProductionRoute] = useState("Primary");
  const [recycledPercent, setRecycledPercent] = useState(50);
  const [energySource, setEnergySource] = useState("Coal");
  const [transport, setTransport] = useState({ distance: 100, mode: "Truck" });
  const [wasteStreams, setWasteStreams] = useState([]);
  const [endOfLife, setEndOfLife] = useState([]);
  const [file, setFile] = useState(null);
  const [aiAssist, setAiAssist] = useState(true);

  // Save to localStorage automatically
  useEffect(() => {
    localStorage.setItem(
      "inputData",
      JSON.stringify({
        material,
        quantity,
        unit,
        productionRoute,
        recycledPercent,
        energySource,
        transport,
        wasteStreams,
        endOfLife,
        aiAssist,
      })
    );
  }, [material, quantity, unit, productionRoute, recycledPercent, energySource, transport, wasteStreams, endOfLife, aiAssist]);

  // Handlers
  const handleCheckboxChange = (setter, prevValues, value, checked) => {
    setter(checked ? [...prevValues, value] : prevValues.filter((v) => v !== value));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          🌍 Input Data for AI-Powered LCA
        </h2>
        <p className="text-center text-gray-600">
          Provide details of your process. Missing data? Our AI will help fill the gaps.
        </p>

        {/* Material + Quantity */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Material</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring focus:ring-green-200"
          >
            <option>Aluminium</option>
            <option>Copper</option>
            <option>Lithium</option>
            <option>Rare Earths</option>
            <option>Nickel</option>
          </select>

          <div className="flex gap-4 mt-4">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-lg p-3 w-2/3 focus:ring focus:ring-green-200"
              placeholder="Enter quantity"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="border rounded-lg p-3 w-1/3 focus:ring focus:ring-green-200"
            >
              <option>kg</option>
              <option>tonne</option>
              <option>pieces</option>
            </select>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Functional unit: {quantity} {unit} of {material}
          </p>
        </div>

        {/* Production Route */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Production Route</label>
          <select
            value={productionRoute}
            onChange={(e) => setProductionRoute(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring focus:ring-green-200"
          >
            <option>Primary (Smelting/Mining)</option>
            <option>Secondary (Recycling)</option>
            <option>Hybrid</option>
          </select>
        </div>

        {/* Recycled Content */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Recycled Input (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={recycledPercent}
            onChange={(e) => setRecycledPercent(Number(e.target.value))}
            className="w-full border rounded-lg p-3 focus:ring focus:ring-green-200"
            placeholder="Enter % recycled"
          />
          <p className="text-sm text-gray-500 mt-1">
            Raw = {100 - recycledPercent}% | Recycled = {recycledPercent}%
          </p>
        </div>

        {/* Energy Source */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Energy Source</label>
          <select
            value={energySource}
            onChange={(e) => setEnergySource(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring focus:ring-green-200"
          >
            <option>Coal</option>
            <option>Natural Gas</option>
            <option>Renewable</option>
            <option>Hydrogen</option>
            <option>Grid Mix</option>
          </select>
        </div>

        {/* Transport */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Transport</label>
          <div className="flex gap-4">
            <input
              type="number"
              value={transport.distance}
              onChange={(e) => setTransport({ ...transport, distance: Number(e.target.value) })}
              className="border rounded-lg p-3 w-1/2 focus:ring focus:ring-green-200"
              placeholder="Distance (km)"
            />
            <select
              value={transport.mode}
              onChange={(e) => setTransport({ ...transport, mode: e.target.value })}
              className="border rounded-lg p-3 w-1/2 focus:ring focus:ring-green-200"
            >
              <option>Truck</option>
              <option>Rail</option>
              <option>Ship</option>
            </select>
          </div>
        </div>

        {/* Waste Streams */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Waste Streams</label>
          <div className="flex flex-wrap gap-4">
            {["Red Mud", "Dross", "Tailings", "Spent Pot Lining", "Slag"].map((w) => (
              <label key={w} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={w}
                  checked={wasteStreams.includes(w)}
                  onChange={(e) =>
                    handleCheckboxChange(setWasteStreams, wasteStreams, w, e.target.checked)
                  }
                />
                <span>{w}</span>
              </label>
            ))}
          </div>
        </div>

        {/* End-of-life Options */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">End-of-Life Pathways</label>
          <div className="flex flex-wrap gap-4">
            {["Reuse", "Recycling", "Landfill", "Recovery"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={opt}
                  checked={endOfLife.includes(opt)}
                  onChange={(e) =>
                    handleCheckboxChange(setEndOfLife, endOfLife, opt, e.target.checked)
                  }
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Upload CSV/Excel</label>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full"
          />
          {file && <p className="text-sm text-gray-500 mt-1">Uploaded: {file.name}</p>}
        </div>

        {/* AI Assist */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={aiAssist}
            onChange={() => setAiAssist(!aiAssist)}
          />
          <span className="text-gray-700">Enable AI Assistance (Fill missing data)</span>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={() => alert("Inputs saved!")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Save Scenario
          </button>
          {/* ✅ Predict Button at Bottom */}
      <div className="mt-8 flex justify-center">
        <Link
          to="/predictions"
          className="btn-primary text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Predict
        </Link>
      </div>
        </div>
      </div>
    </div>
  );
};

export default InputData;
