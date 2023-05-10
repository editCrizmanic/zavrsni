import "./App.scss";
import { LogIn } from "./components/LogInOut/LogIn";
import { ButtonLogIn } from "./components/LogInOut/ButtonLogInOut";
import Messages from "./components/Messages";
import Input from "./components/Input";
import { useDrone } from "./utils/DroneStuff/useDrone";
import { useSnapshot } from "valtio";
import { droneStore } from "./store/drone";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const { onSendMessage, onLogIn, onLogOut } = useDrone();
  const { messages, user, room, members } = useSnapshot(droneStore);
  console.log(room);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* -------------------------------------- Homepage -------------------------------------- */}
          <Route path="/" element={<ButtonLogIn />} />
          {/* -------------------------------------- Login page -------------------------------------- */}
          <Route
            path="/login"
            element={
              !user?.username && !room?.name ? (
                <LogIn onLogIn={onLogIn} />
              ) : (
                <Navigate to="/chat" />
              )
            }
          />
          {/* -------------------------------------- Chat page -------------------------------------- */}
          <Route
            path="/chat"
            element={
              user?.username && room?.name ? (
                <div className="chat-div">
                  <h1>{room.name}</h1>
                  {room?.name && (
                    <div>
                      <p className="list">List of active members:</p>
                      <ul className="list">
                        {members.map((member) => (
                          <li key={member.id}>{member.username}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button
                    className="button"
                    onClick={() => {
                      onLogOut(room.name, room.instance);
                    }}
                  >
                    Log Out
                  </button>
                  <Messages messages={messages} currentMember={user} />
                  <Input onSendMessage={onSendMessage} />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
