import React from 'react'
import { useState } from 'react'

export const LogIn = ({onLogIn}) => {
    const [username, setUserName] = useState("")

    const onChange = (event) => {
        setUserName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        onLogIn(username)
        setUserName("")
    }

  return (
    <div>
    <form onSubmit={onSubmit} >
      <input
        onChange={onChange}
        value={username}
        type="text"
        placeholder="Type here and press ENTER"
        autoFocus={true}
      />
      <button>Log In</button>
    </form>
  </div>
  )
}
