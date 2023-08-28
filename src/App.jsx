import React, {useState, useEffect} from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import Home from './pages/Home/Home'
import Admin from './pages/Admin/Admin'
import Details from './pages/Details/Details'
import NavigationTop from './pages/Navigation/NavigationTop'
import Login from './pages/Login/Login'
import UserContext from './components/Context/UserContext'
import Cookies from 'js-cookie'


function App() {

  const [userLogin, setUserLogin] = useState({
    user: false,
    token: false
  });

  useEffect(() => {
    const token = Cookies.get('token')
    const user = Cookies.get('user')
    if (token && user) {
      setUserLogin({
        user: user,
        token: token
      })
    }
    else {
      setUserLogin({
        user: false,
        token: false
      })
    }

    // console.log(typeof userLogin.user)
    // console.log(typeof userLogin.token)
  }, []);

  return (
    <>
      <UserContext.Provider value={{userLogin, setUserLogin}}>
        <Routes>
          <Route path="/" element={<NavigationTop />}>
            <Route index element={<Home />} />
            <Route path="Admin" element={<Admin />} />
            <Route path="Login" element={<Login />} />
            <Route path="Details/:id" element={<Details />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
