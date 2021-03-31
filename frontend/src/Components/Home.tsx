import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import { RoomCodeModal } from "./RoomCodeModal";

export const Home = ({ isRoomOwner, setIsRoomOwner, roomCode, setRoomCode }: any) => {
  const [show, setShow] = useState(false);
  const [roomType, setRoomType] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = useCallback(
    (type) => {
      if (type === "create") {
        setIsRoomOwner(true);
        localStorage.setItem('roomOwner', 'true');
      }
      if (type === "join") {
        setIsRoomOwner(false);
        localStorage.setItem('roomOwner', 'false');  
      }
      setRoomType(type);
      setShow(true);
    },
    [setShow, setRoomType, setIsRoomOwner]
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
          <Button className="btn-danger button" onClick={() => handleShow("create")}>
            START A FIRE
          </Button>
          <Button className="btn-warning button" onClick={() => handleShow("join")}>
            JOIN A FIRE
          </Button>
        </div>
      </Jumbotron>
      <RoomCodeModal show={show} handleClose={handleClose} type={roomType} roomCode={roomCode} setRoomCode={setRoomCode}/>
    </div>
  );
};
