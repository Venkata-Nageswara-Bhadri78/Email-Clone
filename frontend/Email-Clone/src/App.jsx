import { useState } from 'react'
import Authentication from './components/Authentication'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import MailDetails from './components/MailDetails'
import Compose from './components/Compose'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/emails/:id" element={<MailDetails />} />
        <Route path='/compose' element={<Compose />} />
      </Routes>
    </Router>
  )
}

export default App
