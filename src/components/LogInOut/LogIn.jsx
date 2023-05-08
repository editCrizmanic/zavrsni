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
        <input className="inputField"
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
          <option value="&#x1F4D6; General">&#x1F4D6; General</option>
          <option value="&#x1F9DA; Fantasy">&#x1F9DA; Fantasy</option>
          <option value="&#x1F4D8; Poetry">&#x1F4D8; Poetry</option>
          <option value="&#x1F6F8; Sci-Fi">&#x1F6F8; Sci-Fi</option>
          <option value="&#x1F575; Crime">&#x1F575; Crime</option>
          <option value="&#x1F30D; Travel">&#x1F30D; Travel</option>
          <option value="&#x1F527; How-to">&#x1F527; How-to</option>
        </select>
        <button className="button" disabled={isDisabled}>Log In</button>
      </form>
    </div>
  );
};
