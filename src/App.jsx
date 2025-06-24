import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import DetallePlanes from './pages/DetallePlanes'
import CardPlanes from './components/cardplanes/CardPlanes'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CardPlanes />} />
        <Route path="/contratar-plan/:id" element={<DetallePlanes />} />
      </Routes>
    </Router>
  )
}

export default App