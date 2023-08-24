import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./NavigationTop.css"

export default function NavigationTop() {
  return (
    <div className='app'>
        <nav className='topNav'>
            <div className="logo">
                <img src="logo.png" alt="logo" />
                <p>Foreningen for Dyrevelfærd</p>
            </div>
            <div className="links">
                <Link to="/">Hjem</Link>
                <Link to="/">Om os</Link>
                <Link to="/">Bliv Frivillig</Link>
                <Link to="/">Dyr i nød?</Link>
                <Link to="/">Adopter et dyr</Link>
                <Link to="/Products">Login</Link>
            </div>
        </nav>

        <Outlet />
    </div>
  )
}