import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { Login } from "./Login";
import Form from "react-bootstrap/Form";

export const RoomCodeModal = ({
  show,
  handleClose,
  type,
  roomCode,
  setRoomCode,
}: any) => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const roomCodeRef = useRef<HTMLInputElement>(null);

  const goToParty = () => {
    setLoading(true);
    setRoomCode(roomCodeRef.current?.value || "null");
    localStorage.setItem("roomCode", roomCodeRef.current?.value || "null");
    setTimeout(() => {
      history.push("/party");
    }, 1500);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        {loading && (
          <>
            <Modal.Header>
              <Modal.Title>CONNECTING YOU...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Hold on... dw it's about to be lit</p>
            </Modal.Body>
          </>
        )}
        {!loading && type === "join" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>JOIN A FIRE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formCode">
                  <Form.Label>Room Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter room code"
                    ref={roomCodeRef}
                  />
                  <Form.Text className="text-muted">
                    Hurry up... music is waiting
                  </Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                CLOSE
              </Button>
              <Button
                variant="success"
                onClick={goToParty}
              >
                JOIN
              </Button>
            </Modal.Footer>
          </>
        )}
        {!loading && type === "create" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>START A FIRE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Login />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                CLOSE
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};
