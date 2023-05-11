import "./App.scss";
import { LogIn } from "./components/LogIn/LogIn";
import { ButtonLogIn } from "./components/LogIn/Homepage";
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
import OffCanvasList from "./components/ActiveMembers/ActiveMembers";

function App() {
  const { onSendMessage, onLogIn, onLogOut } = useDrone();
  const { messages, user, room } = useSnapshot(droneStore);

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
                /* header with room name and logout button */
                <div className="chat-div">
                  <div className="chat-header">
                    <h1>{room.name}</h1>
                    <button
                      className="button btn-logout"
                      onClick={() => {
                        onLogOut(room.name, room.instance);
                      }}
                    >
                      Log Out
                    </button>
                  </div>

                  {/* react bootstrap component that lists all active members */}
                  <OffCanvasList />

                  {/* messages component for display*/}
                  <Messages messages={messages} currentMember={user} />

                  {/* input component for sending messages and emojis */}
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
