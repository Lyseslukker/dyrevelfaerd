import React, {useState, useEffect, useContext} from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./NavigationTop.css"
import { AiOutlineMenu } from 'react-icons/ai';
import {RxCross1} from "react-icons/rx"
import UserContext from '../../components/Context/UserContext';

export default function NavigationTop() {

    const { userLogin, setUserLogin } = useContext(UserContext)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [burgermenu, setBurgermenu] = useState(false);


    const handleInnerWidth = () => {
        setWindowWidth(window.innerWidth)
        // window.removeEventListener("resize", handleInnerWidth)
    }


    const handleBurger = () => {
        if (burgermenu) {
            setBurgermenu(false)
        }
        if (!burgermenu) {
            setBurgermenu(true)
        }
    }


    useEffect(() => {
        window.addEventListener("resize", handleInnerWidth)
    }, []);



    if (windowWidth < 480) {
        if (burgermenu) {
            return (
                <div className='app'>
                    <header className='topNav'>
                        <div className="logo">
                            <img src="logo.png" alt="logo" />
                            <p>Foreningen for Dyrevelfærd</p>
                        </div>
                        <nav className="links">
                            <div onClick={handleBurger} className="links__bruger">
                                <RxCross1 />
                            </div>
                            <div className="links__navi">
                                <Link to="/">Hjem</Link>
                                <Link to="/">Om os</Link>
                                <Link to="/">Bliv Frivillig</Link>
                                <Link to="/">Dyr i nød?</Link>
                                <Link to="/">Adopter et dyr</Link>
                                <Link to="/login">Logout</Link>
                            </div>
                        </nav>
                    </header>
        
                    <Outlet />
                </div>
            )
        }
        if (!burgermenu) {
            return (
                <div className='app'>
                    <header className='topNav'>
                        <div className="logo">
                            <img src="logo.png" alt="logo" />
                            <p>Foreningen for Dyrevelfærd</p>
                        </div>
                        <nav className="links">
                            <div onClick={handleBurger} className="links__burger">
                                <AiOutlineMenu />
                            </div>
                        </nav>
                    </header>
        
                    <Outlet />
                </div>
            )
        }
    }

    if (windowWidth > 480) {
        if (userLogin.token && userLogin.user) {
            return (
                <div className='app'>
                    <header className='topNav'>
                        <div className="logo">
                            <img src="logo.png" alt="logo" />
                            <p>Foreningen for Dyrevelfærd</p>
                        </div>
                        <nav className="links">
                            <Link to="/">Hjem</Link>
                            <Link to="/">Om os</Link>
                            <Link to="/">Bliv Frivillig</Link>
                            <Link to="/">Dyr i nød?</Link>
                            <Link to="/">Adopter et dyr</Link>
                            <Link to="/login">Logout</Link>
                        </nav>
                    </header>
    
                    <Outlet />
                </div>
            )
        }
        if (!userLogin.token && !userLogin.user) {
            return (
                <div className='app'>
                    <header className='topNav'>
                        <div className="logo">
                            <img src="logo.png" alt="logo" />
                            <p>Foreningen for Dyrevelfærd</p>
                        </div>
                        <nav className="links">
                            <Link to="/">Hjem</Link>
                            <Link to="/">Om os</Link>
                            <Link to="/">Bliv Frivillig</Link>
                            <Link to="/">Dyr i nød?</Link>
                            <Link to="/">Adopter et dyr</Link>
                            <Link to="/login">Login</Link>
                        </nav>
                    </header>
    
                    <Outlet />
                </div>
            )
        }
    }

    
}