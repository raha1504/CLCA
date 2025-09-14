import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
        {/* Background Pattern (safe inline CSS, avoids JSX string escaping issues) */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(rgba(14,165,233,0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left side - RGUKT Logo and Content */}
            <div className="flex-1 lg:pr-12 mb-12 lg:mb-0">
              <div className="flex items-start mb-8 gap-4">
                {/* RGUKT Logo */}
                <img src="/rgukt-logo.png" alt="RGUKT" className="w-16 h-16 object-contain flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-800 leading-tight">Rajiv Gandhi University of Knowledge Technologies</h2>
                  <p className="text-sm text-gray-600 mt-1">Leading Innovation in Technology</p>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                AI-Powered LCA Tool for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                  Advancing Circularity
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 to-secondary-800">
                  and Sustainability
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                Revolutionizing metallurgy and mining through advanced Life Cycle Assessment 
                powered by artificial intelligence. Drive sustainable practices and circular 
                economy principles in the industry.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/input-data"
                  className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started
                </Link>
                <Link
                  to="/about-us"
                  className="btn-secondary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Right side - InnoSpark Team Badge */}
            <div className="flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 max-w-sm">
                <div className="text-center">
                  {/* InnoSpark Team Badge */}
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-bold text-xl">IS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">InnoSpark Team</h3>
                  <p className="text-gray-600 mb-4">Innovation & Sustainability</p>
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 font-medium">
                      "Pioneering AI solutions for sustainable metallurgy and mining practices"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools for sustainable metallurgy and mining operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Input & Analysis</h3>
              <p className="text-gray-600">
                Comprehensive data collection and analysis tools for metallurgical processes and mining operations.
              </p>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Predictions</h3>
              <p className="text-gray-600">
                Advanced machine learning models to predict environmental impact and optimize processes.
              </p>
            </div>
            
            <div className="card hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Reports</h3>
              <p className="text-gray-600">
                Detailed sustainability reports and circularity assessments for informed decision making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join the sustainable revolution in metallurgy and mining with our AI-powered LCA tool.
          </p>
          <Link
            to="/input-data"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Your Journey
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

