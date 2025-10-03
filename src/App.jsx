import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PatientManagementSystem from './pages/patients/Patients'
import Simulation from './pages/Summa'
import PrescriptionManager from './pages/Finalize'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/Dashboard' element={<Simulation/>} />
        <Route path='/Patients' element={<PatientManagementSystem />} />
        <Route path='/Finalize' element={<PrescriptionManager />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
