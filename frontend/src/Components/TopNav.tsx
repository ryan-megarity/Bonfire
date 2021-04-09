import React from "react";
import Navbar from "react-bootstrap/Navbar";

export const TopNav = ({ isRoomOwner, roomCode }: any) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">
        <img
          src="images/local_fire_department-24px.svg"
          alt="fire icon"
          className="fire-nav-logo"
        ></img>
        Bonfire
      </Navbar.Brand>
      <Navbar.Brand style={{ fontSize: "0.75em" }}>
        {roomCode ? roomCode : "Room Not Found"}
      </Navbar.Brand>
    </Navbar>
  );
};
