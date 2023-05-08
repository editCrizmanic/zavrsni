import './App.scss';
import { useState } from 'react';
import { LogIn } from './components/LogInOut/LogIn';
import { ButtonLogIn } from './components/LogInOut/ButtonLogInOut';
import Messages from './components/Messages';
import Input from './components/Input';
import { useDrone } from './utils/DroneStuff/useDrone';
import { useSnapshot } from 'valtio';
import { droneStore } from './store/drone';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  const { onSendMessage, onLogIn, onLogOut} = useDrone();
  const { messages, user, room, members } = useSnapshot(droneStore);
  console.log(room);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ButtonLogIn/>}/>
          <Route path="/login" element={(!user?.username && !room?.name)? <LogIn onLogIn={onLogIn} /> : <Navigate to="/chat" />} />
          <Route path="/chat" element={(user?.username && room?.name) ? (
              <>
              <h1>{room.name}</h1>
              {room?.name && (
                  <div>
                    <p>List of active members:</p>
                    <ul>
                      {members.map((member) => (
                        <li key={member.id}>{member.username}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button className="button" onClick={() => {onLogOut(room.name, room.instance)}}>Log Out</button>
                <Messages messages={messages} currentMember={user} />
                <Input onSendMessage={onSendMessage} />
              </>
            ) : (
              <Navigate to="/" />)} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
