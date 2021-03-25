import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export const TopNav = ({ isRoomOwner, roomCode }: any) => {
  let peopleInRoom = ["(You)", "Rob", "Drinky", "Louis"];
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
        <NavDropdown title={`Room: ${roomCode}`} id="collasible-nav-dropdown">
          {peopleInRoom.map((person) => {
            return <NavDropdown.Item key={person}>{person}</NavDropdown.Item>;
          })}
        </NavDropdown>
      </Navbar.Brand>
    </Navbar>
  );
};
