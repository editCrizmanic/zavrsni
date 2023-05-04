import React from 'react';
import { useState } from 'react';

export const LogIn = ({ onLogIn }) => {
  const [username, setUserName] = useState('');
  const [chat, setChat] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const onChangeText = (event) => {
    setUserName(event.target.value);
    console.log(event.target.value);
    setIsDisabled(!event.target.value || !chat);
  };

  const onChangeSelect = (event) => {
    setChat(event.target.value);
    console.log(event.target.value);
    setIsDisabled(!event.target.value || !username);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onLogIn(username, chat);
    console.log(username, chat);
    setUserName('');
    setIsDisabled(true);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChangeText}
          value={username}
          type="text"
          placeholder="Type here and press ENTER"
          autoFocus={true}
        />
        <select onChange={onChangeSelect} value={chat} name="rooms" id="rooms">
          <option disabled selected value="">
            Select an option
          </option>
          <option value="general">General</option>
          <option value="fantasy">Fantasy</option>
          <option value="poetry">Poetry</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="crime">Crime</option>
          <option value="travel">Travel</option>
          <option value="how-to">How-to</option>
        </select>
        <button disabled={isDisabled}>Log In</button>
      </form>
    </div>
  );
};
