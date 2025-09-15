import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'   // ✅ Import Link
import AIEstimator from '../components/AIEstimator'
import CircularityKPIs from '../components/CircularityKPIs'

const AnimatedNumber = ({ value, suffix = '', duration = 800 }) => {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const start = performance.now()
    const init = display
    const delta = value - init
    let raf
    const step = (ts) => {
      const p = Math.min(1, (ts - start) / duration)
      setDisplay(init + delta * p)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return <span>{display.toFixed(1)}{suffix}</span>
}

const Predictions = () => {
  const stored = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('inputDataForm') || 'null') } catch { return null }
  }, [])

  const recycled = stored?.recycledPercent ?? 30
  const raw = 100 - recycled

  // Basic illustrative model
  const metrics = useMemo(() => {
    const baseCO2 = 1000 // kg CO2e
    const baseWater = 500 // m3
    const baseEnergy = 200 // MWh
    const resourceEff = 50 // %

    const energyFactor = (stored?.energySource === 'Solar' || stored?.energySource === 'Wind') ? 0.6 : 1
    const recycleFactor = 1 - recycled / 200 // up to -50%
    const transportFactor = stored?.transportDistanceKm ? 1 + Math.min(0.5, stored.transportDistanceKm / 2000) : 1

    const co2 = baseCO2 * energyFactor * recycleFactor * transportFactor
    const water = baseWater * recycleFactor
    const energy = baseEnergy * energyFactor * recycleFactor
    const sustainIndex = Math.max(0, Math.min(100, 70 + recycled / 3 - (transportFactor - 1) * 40))

    return {
      co2,
      water,
      energy,
      resource: resourceEff + recycled / 3,
      index: sustainIndex,
    }
  }, [recycled, stored])

  const cards = [
    { title: 'CO₂ emissions', value: metrics.co2, unit: ' kg CO₂e', color: 'from-red-500 to-rose-600' },
    { title: 'Water usage', value: metrics.water, unit: ' m³', color: 'from-blue-500 to-cyan-600' },
    { title: 'Energy use', value: metrics.energy, unit: ' MWh', color: 'from-amber-500 to-orange-600' },
    { title: 'Resource efficiency', value: metrics.resource, unit: ' %', color: 'from-emerald-500 to-green-600' },
    { title: 'Sustainability index', value: metrics.index, unit: ' /100', color: 'from-indigo-500 to-violet-600' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Predictions</h1>
        <p className="text-gray-600 mt-2">
          AI-powered estimates and circularity analysis based on your inputs.
        </p>
      </div>

      {/* AI Estimator */}
      <div className="mb-8">
        <AIEstimator material="aluminium" />
      </div>

      {/* Circularity KPIs */}
      <div className="mb-8">
        <CircularityKPIs inputData={stored} />
      </div>

      {/* Animated Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {cards.map((c, index) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${c.color}`} />
            <div className="p-6">
              <p className="text-sm text-gray-600">{c.title}</p>
              <div className="mt-2 text-3xl font-bold text-gray-900">
                <AnimatedNumber value={c.value} suffix={c.unit} />
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-2 bg-primary-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.max(5, (c.value / (c.title === 'Sustainability index' ? 100 : c.value + 1)) * 100))}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-gray-900">Current Context</h2>
        <p className="text-gray-600 mt-1 text-sm">
          Recycled share: {recycled}% • Raw: {raw}% • Energy: {stored?.energySource ?? 'Grid mix'} • Distance: {stored?.transportDistanceKm ?? '—'} km
        </p>
      </motion.div>

      {/* ✅ Dashboard Button */}
      <div className="mt-8 flex justify-center">
        <Link
          to="/dashboard"
          className="btn-primary text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Visualize
        </Link>
      </div>
    </div>
  )
}

export default Predictions
