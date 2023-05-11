import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

/* ----------------------------- Input component for sending messages  ----------------------------- */

const Input = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  {
    /* ----------------------------- functions that control the input  ----------------------------- */
  }

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
  };

  const onSelectEmoji = (emojiData) => {
    setText((text) => text + emojiData.emoji);
  };

  {
    /* ----------------------------- closing emoji picker on outside click  ----------------------------- */
  }
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="div-input-msg">
      <form onSubmit={onSubmit}>
        {/* ----------------------------- Text input ----------------------------- */}
        <input
          className="input-msg"
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Type here and press ENTER"
          autoFocus={true}
        />
        {/* ----------------------------- Emoji picker ----------------------------- */}
        <button
          className="button btn-msg btn-emoji"
          type="button"
          onClick={togglePicker}
        >
          😊
        </button>
        {showEmojiPicker && (
          <div ref={emojiPickerRef}>
            <EmojiPicker onEmojiClick={onSelectEmoji} />
          </div>
        )}
        {/* ----------------------------- Send button  ----------------------------- */}
        <button className="button btn-msg" disabled={!text.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Input;
