import React, { useState } from "react";
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation
} from "emoji-picker-react";

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
    <div className="Input">
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder="Type here and press ENTER"
          autoFocus={true}
        />
        <button className="button" type="button" onClick={togglePicker}>😊</button>
        {showEmojiPicker && (
          <EmojiPicker
            onEmojiClick={onSelectEmoji}
            />
        )}
        <button className="button" disabled={!text.trim()}>Send</button>
      </form>
    </div>
  );
};

export default Input;