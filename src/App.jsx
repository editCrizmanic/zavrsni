import './App.css';
import { LogIn } from './components/LogIn';
import Messages from './components/Messages';
import Input from './components/Input';
import { useDrone } from './utils/DroneStuff/useDrone'
import { useSnapshot } from 'valtio';
import { droneStore } from './store/drone';

function App() {
  const { onSendMessage, onLogIn} = useDrone();
  const { messages, user } = useSnapshot(droneStore)


  return (
    <div className="App">
      {!user?.username && 
        <LogIn onLogIn={onLogIn}/>}
      <Messages messages={messages} currentMember={user} />
      {user?.username && 
        <Input onSendMessage={onSendMessage} />}
    </div>
  );
}

export default App;
