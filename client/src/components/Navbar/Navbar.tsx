import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../../context';
import './style.css'

export default function Navbar() {
  const { dispatch } = React.useContext(Context);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const history = useHistory();
  const logoutHandler = (e: any) => {
    e.preventDefault();
    dispatch({ type: 'LOGOUT'})
    history.push('/login');
  }
  return (
    <div className="navbar-container">
      { isAuthenticated && <Link className="text-link" to="/home">Home</Link>}
      { !isAuthenticated && <Link className="text-link" to="/register">Register</Link>}
      { !isAuthenticated && <Link className="text-link" to="/login">Login</Link>}
      { isAuthenticated && <Link className="text-link" to="/login" onClick={logoutHandler}>Logout</Link>}
    </div>
  )
}
