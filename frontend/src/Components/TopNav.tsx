import React from "react";
import Navbar from "react-bootstrap/Navbar";

export const TopNav = () => {
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
    </Navbar>
  );
};
