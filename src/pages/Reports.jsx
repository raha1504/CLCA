import { useMemo, useRef } from 'react'

const Reports = () => {
  const reportRef = useRef(null)

  const data = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('inputDataForm') || 'null') } catch { return null }
  }, [])

  const hotspots = [
    { name: 'Smelting energy intensity', impact: 'High', action: 'Shift to solar/wind PPA' },
    { name: 'Transport distance', impact: 'Medium', action: 'Optimize logistics and modal shift' },
    { name: 'Virgin material share', impact: 'High', action: 'Increase recycled feedstock' },
  ]

  const recommendations = [
    'Adopt closed-loop recycling for process scrap',
    'Deploy waste heat recovery at furnace stage',
    'Source certified renewable electricity for milling',
  ]

  const revenueItems = [
    { name: 'Recovered metals resale', value: 120000 },
    { name: 'Cost savings from energy efficiency', value: 45000 },
    { name: 'Carbon credit potential', value: 30000 },
  ]

  const handleExport = () => {
    // Simple print-to-PDF via browser
    window.print()
  }

  const totalRevenue = revenueItems.reduce((s, i) => s + i.value, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-2">Hotspot analysis, recommendations, and circular revenue potential.</p>
      </div>

      <div className="card print:shadow-none print:border-0" ref={reportRef}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Report Overview</h2>
            <p className="text-gray-600">Based on your latest inputs.</p>
            <p className="text-sm text-gray-500 mt-1">
              Recycled: {data?.recycledPercent ?? '—'}% • Energy: {data?.energySource ?? '—'} • Distance: {data?.transportDistanceKm ?? '—'} km
            </p>
          </div>
          <div className="flex gap-3 no-print">
            <button className="btn-secondary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Preview</button>
            <button className="btn-primary" onClick={handleExport}>Export PDF</button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Hotspot Analysis</h3>
            <div className="space-y-3">
              {hotspots.map(h => (
                <div key={h.name} className="p-4 border border-gray-200 rounded-lg flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{h.name}</p>
                    <p className="text-sm text-gray-600">Suggested action: {h.action}</p>
                  </div>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${h.impact === 'High' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>{h.impact}</span>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Recommendations</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {recommendations.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Revenue Potential</h3>
            <div className="space-y-3">
              {revenueItems.map(item => (
                <div key={item.name} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                  <p className="text-gray-800">{item.name}</p>
                  <p className="font-semibold text-gray-900">₹{item.value.toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-primary-50 border border-primary-100 rounded-lg flex items-center justify-between">
              <p className="font-medium text-primary-800">Total Potential</p>
              <p className="font-bold text-primary-900">₹{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print styles for clean PDF */}
      <style>{`@media print { .no-print { display: none !important; } body { background: white !important; } }`}</style>
    </div>
  )
}

export default Reports


