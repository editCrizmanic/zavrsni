import './App.css';
import { useState } from 'react';
import { randomName, randomColor, id } from './utils/UserInfo/randomInfo';
import { droneInit } from "./utils/DroneStuff/droneInit"
import Messages from './components/Messages';
import Input from './components/Input';

// ------ the fun part ----------------------------------------------------------------------------------------------------
function App() {
  const [state, setState] = useState({
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
      id
    }
  });

  const room = droneInit.subscribe("observable-books")

  room.on("data", (data, member) => {
    setState(prevState => {
      const messages = [...prevState.messages];
      messages.push({ member, text: data });
      return { ...prevState, messages };
    });
  });

  const onSendMessage = (message) => {
    droneInit.publish({
      room: "observable-books",
      message
    })
  };

  return (
    <div className="App">
      <Messages messages={state.messages} currentMember={state.member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}

export default App;