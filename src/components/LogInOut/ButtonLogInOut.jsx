import React from 'react'
import { Link } from "react-router-dom";

export const ButtonLogIn = () => {
  return (
    <div>
        <h1>Welcome to BookChat App!</h1>
        <h2>Join one of the rooms and chat away.</h2>
        <Link to="/login"><button className='button'><span>LogIn</span></button></Link>
        <Link to="https://github.com/editCrizmanic/zavrsni"><button className='button btn-secondary'><span>Check out the source code</span></button></Link>

    </div>
  )
}

// export const ButtonLogOut = () => {
//   return (
//     <div>
//         <button><Link to="/">LogOut</Link></button>
//     </div>
//   )
// }