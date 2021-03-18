import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

export const Home = () => {
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
          <Button className="btn-danger">START THE FIRE</Button>
          <Button className="btn-warning">JOIN A FIRESTARTER</Button>
        </div>
      </Jumbotron>
    </div>
  );
};
