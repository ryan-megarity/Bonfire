import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

export const Connected = ({ accessToken }: any) => {
  return (
    <div>
      {accessToken && (
        <Jumbotron className="bg-success text-white spotify-banner" fluid>
          <h5>Connected to spotify</h5>
        </Jumbotron>
      )}
      {!accessToken && (
        <Jumbotron className="bg-danger text-white spotify-banner" fluid>
          <h5>Disonnected from spotify</h5>
        </Jumbotron>
      )}
    </div>
  );
};
