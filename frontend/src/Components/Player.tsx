import { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import SpotifyPlayer from "react-spotify-web-playback";

export const Player = ({ accessToken, trackUri }: any) => {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  return (
    <>
      <Jumbotron fluid className="search-box">
        <h4>Player</h4>
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          callback={(state: any) => {
            if (!state.isPlaying) setPlay(false);
          }}
          play={play}
          uris={trackUri ? [trackUri] : []}
        />
      </Jumbotron>
    </>
  );
};
