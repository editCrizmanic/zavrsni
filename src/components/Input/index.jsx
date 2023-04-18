import React, { useState } from "react";

const Input = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSendMessage(text);
    setText("");
  };

  return (
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Type here and press ENTER"
          autoFocus={true}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Input;