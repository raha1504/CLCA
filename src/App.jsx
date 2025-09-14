import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import InputData from './pages/InputData'
import Predictions from './pages/Predictions'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import AboutUs from './pages/AboutUs'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/input-data" element={<InputData />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  )
}

export default App

