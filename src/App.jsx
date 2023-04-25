import './App.css';
import { LogIn } from './components/LogIn';
import Messages from './components/Messages';
import Input from './components/Input';
import { useDrone } from './utils/DroneStuff/useDrone'

function App() {
  const { state, onSendMessage, onLogIn} = useDrone();



  return (
    <div className="App">
      {!state.member?.username && 
        <LogIn onLogIn={onLogIn}/>}
      <Messages messages={state.messages} currentMember={state.member} />
      {state.member?.username && 
        <Input onSendMessage={onSendMessage} />}
    </div>
  );
}

export default App;
