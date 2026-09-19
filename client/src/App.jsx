import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Students from './pages/Students'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard"
           element={
           <ProtectedRoute>
            <Dashboard />
           </ProtectedRoute>
           } />
          <Route path="/Students" 
          element={
          <ProtectedRoute>
          <Students />
          </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
