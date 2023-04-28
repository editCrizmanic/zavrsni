import React from 'react'
import { Link } from "react-router-dom";

const ButtonLogIn = () => {
  return (
    <div>
        <h1>Oi</h1>
        <h2>welcome</h2>
        <button><Link to="/login">LogIn</Link></button>
    </div>
  )
}

export default ButtonLogIn