import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Login from './pages/Login'
import Students from './pages/Students'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Students" element={<Students />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
