import React from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import Home from './pages/Home/Home'
import Admin from './pages/Admin/Admin'
import Details from './pages/Details/Details'
import NavigationTop from './components/Navigation/NavigationTop'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<NavigationTop />}>
          <Route index element={<Home />} />
          <Route path="Admin" element={<Admin />} />
          <Route path="Details:id" element={<Details />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
