import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import { useHistory } from "react-router-dom";
import { RoomCodeModal } from "./RoomCodeModal";

export const Home = () => {
  const [show, setShow] = useState(false);
  const [roomType, setRoomType] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = useCallback(
    (type) => {
      setRoomType(type);
      setShow(true);
    },
    [setShow, setRoomType]
  );

  return (
    <div>
      <Jumbotron fluid className="header">
        <h1>
          <img
            src="images/local_fire_department-24px.svg"
            alt="fire icon"
            className="fire-logo"
          ></img>
          Bonfire
        </h1>
        <p>
          Where the <span className="highlight-slogan">people</span> make the{" "}
          <span className="highlight-slogan">playlist</span>.
        </p>
        <div className="home-buttons">
          <Button className="btn-danger" onClick={() => handleShow("create")}>
            START THE FIRE
          </Button>
          <Button className="btn-warning" onClick={() => handleShow("join")}>
            JOIN A FIRESTARTER
          </Button>
        </div>
      </Jumbotron>
      <RoomCodeModal show={show} handleClose={handleClose} type={roomType} />
    </div>
  );
};
