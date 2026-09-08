import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login  from "./pages/login"
import Students from './pages/Students'
import Dashboard from "./pages/Dashboard"

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Dashboard' element={<Dashboard />} />
      <Route path='/Students' element={<Students />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App