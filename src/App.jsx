import './App.css';
import Messages from './components/Messages';
import Input from './components/Input';
import { useState } from 'react';


const randomName = () => {
  const firstParts = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const secondParts = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  const firstPart = firstParts[Math.floor(Math.random() * firstParts.length)];
  const secondPart = secondParts[Math.floor(Math.random() * secondParts.length)];
  return firstPart + secondPart;
}

const randomColor = () => {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}


function App() {
  const [state, setState] = useState({
    messages: [
      {
        text: "test test test",
        member: {
          color: "black",
          username: "pero"
        }
      }
    ],
    member: {
      username: randomName(),
      color: randomColor()
    }
  });

  const onSendMessage = (message) => {
    const newMessage = {
      text: message,
      member: state.member
    };
    const newMessages = [...state.messages, newMessage];
    setState({
      ...state,
      messages: newMessages
    });
  };

  return (
    <div className="App">
      <Messages messages={state.messages} currentMember={state.member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}

export default App