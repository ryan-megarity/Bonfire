import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export const RoomCodeModal = (props: {
  show: any;
  handleClose: any;
  type: any;
}) => {
  let history = useHistory();
  const goToParty = () => {
    history.push("/party");
  };
  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        {props.type === "join" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>JOIN A FIRESTARTER</Modal.Title>
            </Modal.Header>
            <Modal.Body>ENTER THE ROOM CODE</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleClose}>
                CLOSE
              </Button>
              <Button variant="primary" onClick={goToParty}>
                JOIN
              </Button>
            </Modal.Footer>
          </>
        )}
        {props.type === "create" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>START THE FIRE</Modal.Title>
            </Modal.Header>
            <Modal.Body>SELECT OPTIONS</Modal.Body>
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
