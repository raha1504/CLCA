import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { predictMissingValue, syntheticData } from '../data/syntheticData'

const AIEstimator = ({ material = 'aluminium', onPredictions }) => {
  const [predictions, setPredictions] = useState({})
  const [isCalculating, setIsCalculating] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const stages = ['mining', 'refining', 'smelting', 'fabrication', 'use', 'recycling']
  const metrics = ['co2', 'energy', 'water', 'waste']

  useEffect(() => {
    calculatePredictions()
  }, [material])

  const calculatePredictions = async () => {
    setIsCalculating(true)
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newPredictions = {}
    const knownValues = {
      recycledPercent: 30,
      energySource: 'Grid mix',
      transportDistanceKm: 100
    }

    stages.forEach(stage => {
      newPredictions[stage] = {}
      metrics.forEach(metric => {
        const predicted = predictMissingValue(material, stage, metric, knownValues)
        const actual = syntheticData[material]?.[stage]?.[metric] || 0
        const variance = Math.abs(predicted - actual) / actual * 100
        
        newPredictions[stage][metric] = {
          predicted: Math.round(predicted * 100) / 100,
          actual: Math.round(actual * 100) / 100,
          variance: Math.round(variance),
          confidence: Math.max(60, 100 - variance)
        }
      })
    })

    setPredictions(newPredictions)
    setIsCalculating(false)
    onPredictions?.(newPredictions)
  }

  const getMetricLabel = (metric) => {
    const labels = {
      co2: 'CO₂ (kg/kg)',
      energy: 'Energy (kWh/kg)',
      water: 'Water (L/kg)',
      waste: 'Waste (kg/kg)'
    }
    return labels[metric] || metric
  }

  const getStageLabel = (stage) => {
    return stage.charAt(0).toUpperCase() + stage.slice(1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI/ML Estimator</h3>
            <p className="text-sm text-gray-600">Predicting missing LCA values for {material}</p>
          </div>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="btn-secondary text-sm"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {isCalculating ? (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <span className="text-gray-600">AI is analyzing data...</span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['co2', 'energy', 'water'].map(metric => {
              const totalPredicted = stages.reduce((sum, stage) => 
                sum + (predictions[stage]?.[metric]?.predicted || 0), 0
              )
              return (
                <motion.div
                  key={metric}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{getMetricLabel(metric)}</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">AI Estimated</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {Math.round(totalPredicted * 100) / 100}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Detailed Breakdown */}
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <h4 className="font-medium text-gray-900">Stage-wise Predictions</h4>
              <div className="space-y-2">
                {stages.map(stage => (
                  <div key={stage} className="bg-gray-50 rounded-lg p-3">
                    <h5 className="font-medium text-gray-800 mb-2">{getStageLabel(stage)}</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {metrics.map(metric => {
                        const data = predictions[stage]?.[metric]
                        if (!data) return null
                        return (
                          <div key={metric} className="text-center">
                            <div className="text-xs text-gray-600">{getMetricLabel(metric)}</div>
                            <div className="text-sm font-semibold text-gray-900">{data.predicted}</div>
                            <div className="text-xs text-gray-500">±{data.variance}%</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <button
            onClick={calculatePredictions}
            className="w-full btn-primary"
            disabled={isCalculating}
          >
            {isCalculating ? 'Calculating...' : 'Re-run AI Analysis'}
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default AIEstimator

