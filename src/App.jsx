import './index.css'
import './App.css'
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/Auth/Login'
import Home from './components/Home/Home'

import { useState } from 'react'

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const handleToggleSidebar = () => {
    setIsSidebarVisible((prevIsSidebarVisible) => !prevIsSidebarVisible)
  }

  const isLogged = localStorage.getItem('firstLogin')

  return (
    <Router>
      <Routes>
        <Route path="*" element={isLogged === 'true' ? <Home handleToggleSidebar={handleToggleSidebar} isSidebarVisible={isSidebarVisible} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        whiteSpace="nowrap"
        style={{
          width: 'fit-content',
          maxWidth: '30rem',
          whiteSpace: 'nowrap',
        }}
      />
    </Router>
  )
}

export default App
