import './App.css';
import { useState } from 'react';
import { randomName, randomColor } from './utils/UserInfo/randomNameColor';
import { droneInit } from "./utils/DroneStuff/droneInit"
import Messages from './components/Messages';
import Input from './components/Input';




// ------ the fun part ----------------------------------------------------------------------------------------------------
function App() {

  const [state, setState] = useState({
    messages: [],
    member: {
     username: randomName(),
     color: randomColor()
   }
  });


  droneInit.on("open", error => {
    if (error) {
      return console.error(error)
    }
    setState(prevState => {
      const member = { ...prevState.member };
      member.id = droneInit.clientId;
      return { ...prevState, member };
    });
  });

  const room = droneInit.subscribe("observable-general")
  
  room.on("data", (data, member) => {
    setState(prevState => {
      const messages = [...prevState.messages];
      messages.push({ member, text: data });
      return { ...prevState, messages };
    });
  });

  const onSendMessage = (message) => {
    droneInit.publish({
      room:"observable-general",
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