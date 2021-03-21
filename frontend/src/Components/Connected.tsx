import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

export const Connected = ({ accessToken }: any) => {
  return (
    <div>
      {accessToken && (
        <Jumbotron className="bg-success text-white spotify-banner" fluid>
          <h4>Connected to spotify</h4>
        </Jumbotron>
      )}
      {!accessToken && (
        <Jumbotron className="bg-danger text-white spotify-banner" fluid>
          <h4>Disonnected from spotify</h4>
        </Jumbotron>
      )}
    </div>
  );
};
