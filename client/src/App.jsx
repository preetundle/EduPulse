import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Students from './pages/Students'
import Dashboard from './pages/Dashboard'
import Marks from './pages/Marks'
import Attendance from './pages/Attendance'

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
          <Route path= "/Marks"
          element={ 
            <ProtectedRoute>
              <Marks />
            </ProtectedRoute>
           }
           />
           <Route
  path="/Attendance"
  element={
    <ProtectedRoute>
      <Attendance />
    </ProtectedRoute>
  }
/>  
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
