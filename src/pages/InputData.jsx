import { useState } from 'react'
import { Link } from 'react-router-dom'

const InputData = () => {
  const [formData, setFormData] = useState({
    recycledPercent: 30,
    energySource: 'Grid',
    transportDistanceKm: 100,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    localStorage.setItem('inputDataForm', JSON.stringify({ ...formData, [name]: value }))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Input Data</h1>

      {/* Recycled Percent */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Recycled %</label>
        <input
          type="number"
          name="recycledPercent"
          value={formData.recycledPercent}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
      </div>

      {/* Energy Source */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Energy Source</label>
        <select
          name="energySource"
          value={formData.energySource}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option>Grid</option>
          <option>Solar</option>
          <option>Wind</option>
        </select>
      </div>

      {/* Transport Distance */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Transport Distance (km)</label>
        <input
          type="number"
          name="transportDistanceKm"
          value={formData.transportDistanceKm}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
      </div>

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
  )
}

export default InputData
