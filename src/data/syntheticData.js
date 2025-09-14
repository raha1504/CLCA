// Synthetic dataset for aluminium and copper LCA analysis
export const syntheticData = {
  aluminium: {
    mining: {
      co2: 2.5, // kg CO2/kg
      energy: 15, // kWh/kg
      water: 8, // L/kg
      waste: 0.3 // kg/kg
    },
    refining: {
      co2: 8.2,
      energy: 45,
      water: 25,
      waste: 0.1
    },
    smelting: {
      co2: 12.8,
      energy: 65,
      water: 35,
      waste: 0.05
    },
    fabrication: {
      co2: 3.2,
      energy: 18,
      water: 12,
      waste: 0.08
    },
    use: {
      co2: 0.5,
      energy: 2,
      water: 1,
      waste: 0.02
    },
    recycling: {
      co2: 1.8,
      energy: 8,
      water: 4,
      waste: 0.01
    }
  },
  copper: {
    mining: {
      co2: 4.2,
      energy: 22,
      water: 15,
      waste: 0.8
    },
    refining: {
      co2: 6.8,
      energy: 35,
      water: 20,
      waste: 0.2
    },
    smelting: {
      co2: 9.5,
      energy: 48,
      water: 28,
      waste: 0.1
    },
    fabrication: {
      co2: 2.8,
      energy: 15,
      water: 8,
      waste: 0.05
    },
    use: {
      co2: 0.3,
      energy: 1.5,
      water: 0.8,
      waste: 0.01
    },
    recycling: {
      co2: 1.2,
      energy: 6,
      water: 3,
      waste: 0.005
    }
  }
}

// Energy source multipliers
export const energyMultipliers = {
  'Solar': 0.3,
  'Wind': 0.2,
  'Hydro': 0.1,
  'Grid mix': 1.0,
  'Coal': 2.2,
  'Natural Gas': 1.4,
  'Diesel': 1.8
}

// Simple ML-like prediction function
export const predictMissingValue = (material, stage, inputType, knownValues) => {
  const baseData = syntheticData[material]?.[stage]
  if (!baseData) return 0

  const baseValue = baseData[inputType] || 0
  const recycledFactor = 1 - (knownValues.recycledPercent || 0) / 200
  const energyFactor = energyMultipliers[knownValues.energySource] || 1
  const transportFactor = 1 + Math.min(0.5, (knownValues.transportDistanceKm || 0) / 2000)

  return Math.max(0, baseValue * recycledFactor * energyFactor * transportFactor)
}

// Calculate circularity metrics
export const calculateCircularityKPIs = (data) => {
  const recycled = data.recycledPercent || 0
  const energySource = data.energySource || 'Grid mix'
  const distance = data.transportDistanceKm || 0

  const recyclingRate = Math.min(100, recycled + (energySource === 'Solar' ? 10 : 0))
  const resourceEfficiency = Math.min(100, 60 + recycled / 2 + (energySource === 'Wind' ? 15 : 0))
  const extendedLife = Math.min(100, 70 + recycled / 3 - distance / 100)

  return {
    recyclingRate: Math.round(recyclingRate),
    resourceEfficiency: Math.round(resourceEfficiency),
    extendedLife: Math.round(extendedLife),
    circularityScore: Math.round((recyclingRate + resourceEfficiency + extendedLife) / 3)
  }
}

