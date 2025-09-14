const members = [
  { name: 'Member 1', role: 'Lead', initials: 'M1' },
  { name: 'Member 2', role: 'ML Engineer', initials: 'M2' },
  { name: 'Member 3', role: 'Data Scientist', initials: 'M3' },
  { name: 'Member 4', role: 'Frontend Dev', initials: 'M4' },
  { name: 'Member 5', role: 'Backend Dev', initials: 'M5' },
  { name: 'Member 6', role: 'UX Designer', initials: 'M6' },
]

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
          <p className="text-gray-700 mt-2 max-w-3xl">
            AI-Powered LCA Tool for Advancing Circularity and Sustainability in Metallurgy & Mining.
            Our mission is to make sustainability decisions data-driven and actionable.
          </p>
        </div>
        {/* RGUKT Logo */}
        <div className="hidden sm:flex items-center">
          <img src="/rgukt-logo.png" alt="RGUKT" className="w-16 h-16 object-contain" />
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Project</h2>
        <p className="text-gray-700">
          This tool leverages AI models and Life Cycle Assessment methodologies to evaluate and
          optimize environmental performance across extraction, processing, use, and end-of-life stages.
        </p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Team InnoSpark</h2>
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow">
            <span className="text-white font-bold">IS</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m) => (
            <div key={m.name} className="p-5 border border-gray-200 rounded-xl flex items-center gap-4 hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                {m.initials}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{m.name}</p>
                <p className="text-sm text-gray-600">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutUs


