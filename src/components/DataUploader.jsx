import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'

const DataUploader = ({ onDataProcessed }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const fileInputRef = useRef(null)

  const requiredFields = ['material', 'stage', 'co2', 'energy', 'water']
  const validStages = ['mining', 'refining', 'smelting', 'fabrication', 'use', 'recycling']
  const validMaterials = ['aluminium', 'copper']

  const validateData = (data) => {
    const errors = []
    
    if (!Array.isArray(data) || data.length === 0) {
      errors.push('No data found in file')
      return errors
    }

    // Check required fields
    const headers = Object.keys(data[0])
    const missingFields = requiredFields.filter(field => !headers.includes(field))
    if (missingFields.length > 0) {
      errors.push(`Missing required fields: ${missingFields.join(', ')}`)
    }

    // Validate each row
    data.forEach((row, index) => {
      if (!validMaterials.includes(row.material?.toLowerCase())) {
        errors.push(`Row ${index + 1}: Invalid material '${row.material}'. Must be 'aluminium' or 'copper'`)
      }
      
      if (!validStages.includes(row.stage?.toLowerCase())) {
        errors.push(`Row ${index + 1}: Invalid stage '${row.stage}'. Must be one of: ${validStages.join(', ')}`)
      }

      // Validate numeric fields
      ['co2', 'energy', 'water'].forEach(field => {
        const value = parseFloat(row[field])
        if (isNaN(value) || value < 0) {
          errors.push(`Row ${index + 1}: Invalid ${field} value '${row[field]}'. Must be a positive number`)
        }
      })
    })

    return errors
  }

  const processFile = async (file) => {
    setIsUploading(true)
    setUploadStatus('Processing file...')
    setValidationErrors([])

    try {
      const fileExtension = file.name.split('.').pop().toLowerCase()
      let data = []

      if (fileExtension === 'csv') {
        data = await parseCSV(file)
      } else if (['xlsx', 'xls'].includes(fileExtension)) {
        data = await parseExcel(file)
      } else {
        throw new Error('Unsupported file format. Please use CSV or Excel files.')
      }

      // Validate data
      const errors = validateData(data)
      if (errors.length > 0) {
        setValidationErrors(errors)
        setUploadStatus('Validation failed')
        setIsUploading(false)
        return
      }

      // Process and aggregate data
      const processedData = aggregateData(data)
      
      setUploadStatus('Data processed successfully!')
      onDataProcessed?.(processedData)
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setUploadStatus('')
      }, 3000)

    } catch (error) {
      setUploadStatus(`Error: ${error.message}`)
      setValidationErrors([error.message])
    } finally {
      setIsUploading(false)
    }
  }

  const parseCSV = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error(`CSV parsing error: ${results.errors[0].message}`))
          } else {
            resolve(results.data)
          }
        },
        error: (error) => {
          reject(new Error(`CSV parsing error: ${error.message}`))
        }
      })
    })
  }

  const parseExcel = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(worksheet)
          resolve(jsonData)
        } catch (error) {
          reject(new Error(`Excel parsing error: ${error.message}`))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read Excel file'))
      reader.readAsArrayBuffer(file)
    })
  }

  const aggregateData = (data) => {
    const aggregated = {
      materials: {},
      totalRows: data.length,
      processedAt: new Date().toISOString()
    }

    data.forEach(row => {
      const material = row.material.toLowerCase()
      const stage = row.stage.toLowerCase()
      
      if (!aggregated.materials[material]) {
        aggregated.materials[material] = {}
      }
      
      if (!aggregated.materials[material][stage]) {
        aggregated.materials[material][stage] = {
          co2: 0,
          energy: 0,
          water: 0,
          count: 0
        }
      }

      const stageData = aggregated.materials[material][stage]
      stageData.co2 += parseFloat(row.co2) || 0
      stageData.energy += parseFloat(row.energy) || 0
      stageData.water += parseFloat(row.water) || 0
      stageData.count += 1
    })

    // Calculate averages
    Object.keys(aggregated.materials).forEach(material => {
      Object.keys(aggregated.materials[material]).forEach(stage => {
        const stageData = aggregated.materials[material][stage]
        if (stageData.count > 0) {
          stageData.co2 = stageData.co2 / stageData.count
          stageData.energy = stageData.energy / stageData.count
          stageData.water = stageData.water / stageData.count
        }
      })
    })

    return aggregated
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const downloadSample = () => {
    const sampleData = [
      { material: 'aluminium', stage: 'mining', co2: 2.5, energy: 15, water: 8 },
      { material: 'aluminium', stage: 'refining', co2: 8.2, energy: 45, water: 25 },
      { material: 'aluminium', stage: 'smelting', co2: 12.8, energy: 65, water: 35 },
      { material: 'copper', stage: 'mining', co2: 4.2, energy: 22, water: 15 },
      { material: 'copper', stage: 'refining', co2: 6.8, energy: 35, water: 20 }
    ]

    const csv = Papa.unparse(sampleData)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'lca_sample_data.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Data Upload & Processing</h3>
          <p className="text-sm text-gray-600">Upload CSV/Excel files to auto-generate predictions</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="text-gray-600">Processing file...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div>
                <p className="text-gray-700 font-medium">Click to upload CSV or Excel file</p>
                <p className="text-sm text-gray-500">Supports .csv, .xlsx, .xls formats</p>
              </div>
            </div>
          )}
        </div>

        {/* Required Format */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Required Format</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Columns:</strong> material, stage, co2, energy, water</p>
            <p><strong>Materials:</strong> aluminium, copper</p>
            <p><strong>Stages:</strong> mining, refining, smelting, fabrication, use, recycling</p>
          </div>
        </div>

        {/* Sample Download */}
        <div className="flex items-center justify-between">
          <button
            onClick={downloadSample}
            className="btn-secondary text-sm"
          >
            Download Sample CSV
          </button>
          
          {uploadStatus && (
            <span className={`text-sm ${uploadStatus.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {uploadStatus}
            </span>
          )}
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <h4 className="font-medium text-red-900 mb-2">Validation Errors</h4>
            <ul className="text-sm text-red-700 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default DataUploader


