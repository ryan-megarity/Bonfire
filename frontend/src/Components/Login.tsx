import React from "react";
import Container from "react-bootstrap/Container";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=b3c80b8e496045b2a67d3e1441303f34&response_type=code&redirect_uri=https://bonfire-jet.vercel.app/party&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export const Login = () => {
  return (
    <Container
      style={{ fontFamily: "Arial" }}
    >
      <p>To start a fire, connect your spotify:</p>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify{" "}
        <img src="images/Spotify_Icon_RGB_White.png" alt="spotify icon" className="spotify-logo"></img>
      </a>
    </Container>
  );
};
