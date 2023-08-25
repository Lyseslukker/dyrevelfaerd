import React, {useState, useEffect} from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./NavigationTop.css"
import { AiOutlineMenu } from 'react-icons/ai';

export default function NavigationTop() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleInnerWidth = () => {
        setWindowWidth(window.innerWidth)
        // window.removeEventListener("resize", handleInnerWidth)
    }


    useEffect(() => {
        window.addEventListener("resize", handleInnerWidth)
    }, []);



    if (windowWidth < 480) {
        return (
            <div className='app'>
                <nav className='topNav'>
                    <div className="logo">
                        <img src="logo.png" alt="logo" />
                        <p>Foreningen for Dyrevelfærd</p>
                    </div>
                    <div className="links">
                        <AiOutlineMenu />
                    </div>
                </nav>
    
                <Outlet />
            </div>
        )
    }

    if (windowWidth > 480) {
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

    
}