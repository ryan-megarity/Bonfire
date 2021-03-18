import React from "react";
import Container from "react-bootstrap/Container";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=8b945ef10ea24755b83ac50cede405a0&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export const Login = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ fontFamily: "Arial" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify{" "}
        <img src="images/Spotify_Icon_RGB_White.png" alt="spotify icon" className="spotify-logo"></img>
      </a>
    </Container>
  );
};
