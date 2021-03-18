import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { Login } from "./Login";
import Form from "react-bootstrap/Form";

export const RoomCodeModal = (props: {
  show: any;
  handleClose: any;
  type: any;
}) => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const goToParty = () => {
    setLoading(true);
    setTimeout(() => {
      history.push("/party");
    }, 1500);
  };
  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        {loading && (
          <>
            <Modal.Header>
              <Modal.Title>CONNECTING YOU...</Modal.Title>
            </Modal.Header>
            <Modal.Body><p>Hold on... dw it's about to be lit</p></Modal.Body>
          </>
        )}
        {!loading && props.type === "join" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>JOIN A FIRESTARTER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formCode">
                  <Form.Label>Room Code</Form.Label>
                  <Form.Control type="text" placeholder="Enter room code" />
                  <Form.Text className="text-muted">
                    Hurry up... music is waiting
                  </Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleClose}>
                CLOSE
              </Button>
              <Button variant="success" onClick={goToParty}>
                JOIN
              </Button>
            </Modal.Footer>
          </>
        )}
        {!loading && props.type === "create" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>START THE FIRE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Login />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleClose}>
                CLOSE
              </Button>
              <Button variant="primary" onClick={goToParty}>
                START
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};
