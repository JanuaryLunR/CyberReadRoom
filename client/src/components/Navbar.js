import React, { useContext } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    navigate('/')
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1">
        <a href="/" className="brand-logo">Bruh, bro...</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/MainLibPage">Library</NavLink></li>
          <li><NavLink to="/LibPage">Your Library</NavLink></li>
          <li><NavLink to="/CreateBook">Create</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}

/*        <Route path="/LibPage" element={<LibPage />} exact />          
<Route path="/MainLibPage" element={<MainLibPage />} exact />
<Route path="/BookPage/:id" element={<BookPage />}/>  
<Route path="/auth"

*/