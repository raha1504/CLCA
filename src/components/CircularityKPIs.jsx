import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { calculateCircularityKPIs } from '../data/syntheticData'

const CircularityKPIs = ({ inputData }) => {
  const [kpis, setKpis] = useState({})
  const [linearVsCircular, setLinearVsCircular] = useState({})

  useEffect(() => {
    if (inputData) {
      const calculated = calculateCircularityKPIs(inputData)
      setKpis(calculated)
      
      // Calculate linear vs circular comparison
      const recycled = inputData.recycledPercent || 0
      const energySource = inputData.energySource || 'Grid mix'
      
      const linearEmissions = 25 // kg CO2/kg
      const circularEmissions = linearEmissions * (1 - recycled / 200)
      
      const linearEnergy = 120 // kWh/kg
      const circularEnergy = linearEnergy * (1 - recycled / 200)
      
      setLinearVsCircular({
        linear: {
          emissions: linearEmissions,
          energy: linearEnergy,
          waste: 15,
          cost: 100
        },
        circular: {
          emissions: circularEmissions,
          energy: circularEnergy,
          waste: 15 * (1 - recycled / 100),
          cost: 100 * (1 - recycled / 200)
        }
      })
    }
  }, [inputData])

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Improvement'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { key: 'recyclingRate', label: 'Recycling Rate', icon: '♻️', unit: '%' },
          { key: 'resourceEfficiency', label: 'Resource Efficiency', icon: '⚡', unit: '%' },
          { key: 'extendedLife', label: 'Extended Life', icon: '⏱️', unit: '%' },
          { key: 'circularityScore', label: 'Circularity Score', icon: '🔄', unit: '/100' }
        ].map(({ key, label, icon, unit }) => (
          <motion.div
            key={key}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 * (['recyclingRate', 'resourceEfficiency', 'extendedLife', 'circularityScore'].indexOf(key)) }}
            className={`card ${getScoreColor(kpis[key] || 0)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{icon}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${getScoreColor(kpis[key] || 0)}`}>
                {getScoreLabel(kpis[key] || 0)}
              </span>
            </div>
            <div className="text-3xl font-bold mb-1">{kpis[key] || 0}{unit}</div>
            <div className="text-sm opacity-75">{label}</div>
            <div className="mt-3 h-2 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-2 bg-current rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${kpis[key] || 0}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Linear vs Circular Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Linear vs Circular Pathway</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Linear Pathway */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h4 className="font-medium text-gray-900">Linear Pathway</h4>
            </div>
            {[
              { label: 'CO₂ Emissions', value: linearVsCircular.linear?.emissions, unit: 'kg/kg', color: 'text-red-600' },
              { label: 'Energy Use', value: linearVsCircular.linear?.energy, unit: 'kWh/kg', color: 'text-amber-600' },
              { label: 'Waste Generated', value: linearVsCircular.linear?.waste, unit: 'kg/kg', color: 'text-gray-600' },
              { label: 'Cost Index', value: linearVsCircular.linear?.cost, unit: '%', color: 'text-blue-600' }
            ].map(({ label, value, unit, color }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{label}</span>
                <span className={`text-sm font-medium ${color}`}>
                  {value?.toFixed(1)}{unit}
                </span>
              </div>
            ))}
          </div>

          {/* Circular Pathway */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h4 className="font-medium text-gray-900">Circular Pathway</h4>
            </div>
            {[
              { label: 'CO₂ Emissions', value: linearVsCircular.circular?.emissions, unit: 'kg/kg', color: 'text-red-600' },
              { label: 'Energy Use', value: linearVsCircular.circular?.energy, unit: 'kWh/kg', color: 'text-amber-600' },
              { label: 'Waste Generated', value: linearVsCircular.circular?.waste, unit: 'kg/kg', color: 'text-gray-600' },
              { label: 'Cost Index', value: linearVsCircular.circular?.cost, unit: '%', color: 'text-blue-600' }
            ].map(({ label, value, unit, color }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{label}</span>
                <span className={`text-sm font-medium ${color}`}>
                  {value?.toFixed(1)}{unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-2">Circularity Benefits</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">
                {(((linearVsCircular.linear?.emissions - linearVsCircular.circular?.emissions) / linearVsCircular.linear?.emissions) * 100)?.toFixed(0)}%
              </div>
              <div className="text-xs text-gray-600">CO₂ Reduction</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">
                {(((linearVsCircular.linear?.energy - linearVsCircular.circular?.energy) / linearVsCircular.linear?.energy) * 100)?.toFixed(0)}%
              </div>
              <div className="text-xs text-gray-600">Energy Savings</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">
                {(((linearVsCircular.linear?.waste - linearVsCircular.circular?.waste) / linearVsCircular.linear?.waste) * 100)?.toFixed(0)}%
              </div>
              <div className="text-xs text-gray-600">Waste Reduction</div>
            </div>
            <div>
              <div className="text-lg font-bold text-amber-600">
                {(((linearVsCircular.linear?.cost - linearVsCircular.circular?.cost) / linearVsCircular.linear?.cost) * 100)?.toFixed(0)}%
              </div>
              <div className="text-xs text-gray-600">Cost Savings</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CircularityKPIs


