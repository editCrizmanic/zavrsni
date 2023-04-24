import './App.css';
import Messages from './components/Messages';
import Input from './components/Input';
import { useDrone } from './utils/DroneStuff/useDrone'

function App() {
  const { state, onSendMessage } = useDrone();

  return (
    <div className="App">
      <Messages messages={state.messages} currentMember={state.member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}

export default App;
