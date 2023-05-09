import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const Input = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const onChange = (e) => {
    setText(e.target.value);
  };

  const togglePicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSendMessage(text);
    setText("");
    console.log("Submitted text:", text);
  };
  
  const onSelectEmoji = (emojiData) => {
    setText((text) => text + emojiData.emoji);
    console.log("Selected emoji:", emojiData);
  };
  
  return (
    <div className="div-input-msg">
      <form onSubmit={onSubmit}>
        <input className="input-msg"
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Type here and press ENTER"
          autoFocus={true}
        />
        <button className="button btn-msg btn-emoji" type="button" onClick={togglePicker}>😊</button>
        {showEmojiPicker && (
          <EmojiPicker className="emojipicker"
            onEmojiClick={onSelectEmoji}
            />
        )}
        <button className="button btn-msg" disabled={!text.trim()}>Send</button>
      </form>
    </div>
  );
};

export default Input;