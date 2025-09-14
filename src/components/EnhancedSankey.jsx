// EnhancedSankey.jsx
import React, { useMemo } from "react";
import { ResponsiveContainer, Sankey, Tooltip } from "recharts";

const EnhancedSankey = ({ material, recycledPercent, energySource }) => {
  const totalFlow = 500; // kg, dummy total
  const recycledFlow = (recycledPercent / 100) * totalFlow;
  const wasteFlow = totalFlow - recycledFlow;

  // Sankey nodes and links
  const sankeyData = useMemo(() => ({
    nodes: [
      { name: "Extraction" },
      { name: "Use" },
      { name: "Waste" },
      { name: "Recovery" },
    ],
    links: [
      { source: 0, target: 1, value: totalFlow },      // Extraction → Use
      { source: 1, target: 2, value: wasteFlow },      // Use → Waste
      { source: 1, target: 3, value: recycledFlow },   // Use → Recovery
    ]
  }), [recycledPercent]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Material Flow Sankey ({material})</h2>
      <ResponsiveContainer width="100%" height={300}>
        <Sankey data={sankeyData} nodePadding={50} nodeWidth={15}>
          <Tooltip />
        </Sankey>
      </ResponsiveContainer>
      <p className="text-gray-600 mt-2">
        Recycled: {recycledPercent}% | Energy: {energySource}
      </p>
    </div>
  );
};

export default EnhancedSankey;
