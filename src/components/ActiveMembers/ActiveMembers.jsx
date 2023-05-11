import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { droneStore } from "../../store/drone";
import { useSnapshot } from "valtio";

/* ----------------------------- React Bootstrap component that displays the list of active members  ----------------------------- */

const options = [
  {
    name: "Enable both scrolling & backdrop",
    scroll: true,
    backdrop: true,
  },
];

function OffCanvasList({ name, ...props }) {
  const { room, members } = useSnapshot(droneStore);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow}>List of active members</button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="h2">
            List of active members:
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {room?.name && (
            <div>
              <ul>
                {members.map((member) => (
                  <li key={member.id}>{member.username}</li>
                ))}
              </ul>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default function Example() {
  return (
    <>
      {options.map((props, idx) => (
        <OffCanvasList key={idx} {...props} />
      ))}
    </>
  );
}
