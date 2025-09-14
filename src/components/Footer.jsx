import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 text-white mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/rgukt-logo.png" alt="RGUKT" className="w-10 h-10 object-contain" />
              <div>
                <h3 className="text-xl font-bold">AILCA</h3>
                <p className="text-sm text-gray-400">AI-Powered LCA Tool</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Advancing Circularity and Sustainability in Metallurgy & Mining through AI-driven Life Cycle Assessment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#input-data" className="text-gray-400 hover:text-white transition-colors">Input Data</a></li>
              <li><a href="#predictions" className="text-gray-400 hover:text-white transition-colors">AI Predictions</a></li>
              <li><a href="#dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#reports" className="text-gray-400 hover:text-white transition-colors">Reports</a></li>
            </ul>
          </div>

          {/* Team Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Team InnoSpark</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Rajiv Gandhi University of Knowledge Technologies</p>
              <p>Innovation & Sustainability Research</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IS</span>
                </div>
                <span className="text-xs">Pioneering AI solutions for sustainable metallurgy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 RGUKT InnoSpark Team. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-xs text-gray-500">Powered by AI & Machine Learning</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">Live Demo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer




