import React from 'react'
import { Link } from "react-router-dom";

export const ButtonLogIn = () => {
  return (
    <div>
        <h1>Oi</h1>
        <h2>welcome</h2>
        <button><Link to="/login">LogIn</Link></button>
    </div>
  )
}

export const ButtonLogOut = () => {
  return (
    <div>
        <button><Link to="/">LogOut</Link></button>
    </div>
  )
}