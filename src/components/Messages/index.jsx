import React from "react";

const renderMessage = (id, currentMember, message) => {
    const {member, text} = message;
    const messageFromMe = member.username === currentMember.username;
    const className = messageFromMe ? "Messages-message currentMember" : "Messages-message";

    // check if the current member is the same as the previous member
    if (renderMessage.prevMember && renderMessage.prevMember.username === member.username) {
        return (
            <li key={id} className={className}>
                <div className="Message-content">
                    <div className="text">{text}</div>
                </div>    
            </li>
        );
    }

    // display the member details for a new member
    renderMessage.prevMember = member;
    return (
        <li key={id} className={className}>
            <span
                className="avatar"
                style={{backgroundColor: member.color}}
            />
            <div className="Message-content">
                <div className="username">
                    {member.username}
                </div>
                <div className="text">{text}</div>
            </div>    
        </li>
    );
};

const Messages = (props) => {
    const {messages, currentMember} = props;
    return(
        <ul className="Messages-list">
            {messages.map((m, index) => renderMessage(index, currentMember, m))}
        </ul>
    );
};

renderMessage.prevMember = null;

export default Messages;