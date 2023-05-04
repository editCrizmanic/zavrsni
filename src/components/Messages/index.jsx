import React from "react";
import { ButtonLogOut } from "../LogInOut/ButtonLogInOut";

const renderMessage = (id, currentMember, message) => {
  const { member, text } = message;
  console.log({member});
  console.log({currentMember});
  const messageFromMe = member.id === currentMember.id;
  const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";
// CSS na liniji 8 za pozicioniranje

  return (
    <li key={id} className={className}>
      <span className="avatar" style={{ backgroundColor: member.color }} />
      <div className="Message-content">
        <div className="username">{member.username}</div>
        <div className="text">{text}</div>
      </div>
    </li>
  );
};

const Messages = (props) => {
  const { messages, currentMember } = props;
  return (
    <>
      <ButtonLogOut/>
      <ul className="Messages-list">
        {messages.map((m, index) => renderMessage(index, currentMember, m))}
      </ul>
    </>
  );
};

export default Messages;