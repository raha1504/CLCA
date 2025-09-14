import { useEffect, useMemo, useRef, useState } from 'react'

const STORAGE_KEY = 'chatHistory'

const getInitialHistory = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return [
    { role: 'bot', text: 'Hi! I can help with emissions, recycling, and app guidance.' }
  ]
}

const Chatbot = () => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState(getInitialHistory)
  const listRef = useRef(null)

  const inputData = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('inputDataForm') || 'null') } catch { return null }
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history)) } catch {}
  }, [history])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [history, open])

  const ruleBasedReply = (text) => {
    const q = text.toLowerCase()
    const recycled = inputData?.recycledPercent ?? 30
    const distance = inputData?.transportDistanceKm ?? '—'
    const energy = inputData?.energySource ?? 'Grid mix'

    // Emissions and CO2 questions
    if (q.includes('emission') || q.includes('co2') || q.includes('carbon')) {
      const suggestions = []
      if (recycled < 50) suggestions.push('Increase recycled content to 50%+')
      if (energy === 'Grid mix' || energy === 'Coal') suggestions.push('Switch to renewable energy (Solar/Wind)')
      if (distance > 200) suggestions.push('Optimize transport routes or use local suppliers')
      suggestions.push('Implement waste heat recovery systems')
      
      return `Current CO₂: ~${(25 * (1 - recycled/200)).toFixed(1)} kg/kg. To reduce:\n• ${suggestions.join('\n• ')}\n\nUse the What-if Simulator to test different scenarios!`
    }

    // Recycling questions
    if (q.includes('recycl') || q.includes('circular')) {
      return `Current recycling: ${recycled}%. Benefits of higher recycling:\n• Reduces CO₂ by up to 50%\n• Cuts energy use by 30-40%\n• Extends material life by 2-3x\n• Improves circularity score\n\nTry increasing recycled content in Input Data!`
    }

    // Circularity questions
    if (q.includes('circularity') || q.includes('circular economy')) {
      return `Circularity means keeping materials in use longer through:\n• Design for recycling\n• Extended product life\n• Waste reduction\n• Resource efficiency\n\nYour current circularity score: ${Math.round(60 + recycled/2)}/100. Higher recycling = better circularity!`
    }

    // Dashboard explanations
    if (q.includes('dashboard') || q.includes('chart') || q.includes('graph')) {
      return `Dashboard shows:\n• Pie Chart: Raw vs Recycled content\n• Bar Chart: Linear vs Circular emissions\n• Sankey: Material flow through stages\n• What-if Simulator: Test scenarios\n\nCharts update when you change parameters in Input Data!`
    }

    // Improvement suggestions
    if (q.includes('improve') || q.includes('better') || q.includes('optimize')) {
      const improvements = []
      if (recycled < 70) improvements.push('Increase recycled content to 70%+')
      if (energy !== 'Solar' && energy !== 'Wind') improvements.push('Switch to renewable energy')
      if (distance > 100) improvements.push('Reduce transport distance')
      improvements.push('Implement closed-loop recycling')
      improvements.push('Use waste heat recovery')
      
      return `To improve sustainability:\n• ${improvements.join('\n• ')}\n\nUse the What-if Simulator to see impact of changes!`
    }

    // Help and navigation
    if (q.includes('help') || q.includes('how') || q.includes('navigate')) {
      return `I can help with:\n• Emissions reduction strategies\n• Recycling optimization\n• Circularity improvements\n• Dashboard explanations\n• App navigation\n\nTry asking: "How to reduce CO₂?" or "Explain the dashboard charts"!`
    }

    // Material-specific questions
    if (q.includes('aluminium') || q.includes('aluminum')) {
      return `Aluminium LCA insights:\n• Mining: 2.5 kg CO₂/kg\n• Smelting: 12.8 kg CO₂/kg (highest impact)\n• Recycling: 1.8 kg CO₂/kg (95% less than primary)\n• Use recycled content to cut emissions by 50%+`
    }

    if (q.includes('copper')) {
      return `Copper LCA insights:\n• Mining: 4.2 kg CO₂/kg\n• Smelting: 9.5 kg CO₂/kg\n• Recycling: 1.2 kg CO₂/kg (87% less than primary)\n• High recycling potential due to durability`
    }

    // Default response
    return `I can help with emissions, recycling, circularity, or app features. Try:\n• "How to reduce CO₂?"\n• "Explain circularity"\n• "What's the dashboard showing?"\n• "Suggest improvements"`
  }

  const send = () => {
    const text = input.trim()
    if (!text) return
    const userMsg = { role: 'user', text }
    const botMsg = { role: 'bot', text: ruleBasedReply(text) }
    setHistory((h) => [...h, userMsg, botMsg])
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="h-14 w-14 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg flex items-center justify-center"
          aria-label="Open assistant"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="w-80 sm:w-96 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
              </div>
              <p className="font-semibold">Assistant</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/90 hover:text-white" aria-label="Close">
              ✕
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-auto p-4 space-y-3 bg-gray-50">
            {history.map((m, i) => (
              <div key={i} className={`max-w-[85%] ${m.role === 'user' ? 'ml-auto' : ''}`}>
                <div className={`${m.role === 'user' ? 'bg-primary-600 text-white' : 'bg-white text-gray-800'} rounded-2xl px-4 py-2 shadow border ${m.role === 'user' ? 'border-primary-700' : 'border-gray-200'}`}>
                  <p className="text-sm whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
                placeholder="Ask about emissions, recycling, or help..."
                className="flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button onClick={send} className="btn-primary px-4 py-2">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbot








