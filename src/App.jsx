import './App.css';
import { LogIn } from './components/LogIn';
import ButtonLogIn from './components/LogIn/ButtonLogIn';
import Messages from './components/Messages';
import Input from './components/Input';
import { useDrone } from './utils/DroneStuff/useDrone';
import { useSnapshot } from 'valtio';
import { droneStore } from './store/drone';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const { onSendMessage, onLogIn } = useDrone();
  const { messages, user } = useSnapshot(droneStore);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ButtonLogIn/>}/>
          <Route path="/login" element={!user?.username ? <LogIn onLogIn={onLogIn} /> : <Navigate to="/chat" />} />
          <Route path="/chat" element={user?.username ? (
              <>
                <Messages messages={messages} currentMember={user} />
                <Input onSendMessage={onSendMessage} />
              </>
            ) : (
              <Navigate to="/" />
          )} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;