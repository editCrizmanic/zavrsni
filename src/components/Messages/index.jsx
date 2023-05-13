import React, { useEffect, useRef } from "react";

/* ----------------------------- Message component  ----------------------------- */

/* ----------------------------- Render message  ----------------------------- */
const renderMessage = (id, currentMember, message) => {
  const { member, text } = message;
  const messageFromMe = member.id === currentMember.id;
  const className = messageFromMe
    ? "Messages-message currentUser"
    : "Messages-message";

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

/* ----------------------------- Map messages  ----------------------------- */
const Messages = (props) => {
  const { messages, currentMember } = props;
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <ul className="Messages-list" ref={containerRef}>
      {messages.map((m, index) => renderMessage(index, currentMember, m))}
    </ul>
  );
};

export default Messages;
