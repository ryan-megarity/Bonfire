import { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import SpotifyPlayer from "react-spotify-web-playback";

export const Player = ({ accessToken, trackUri, setTrackUri, queue }: any) => {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  useEffect(() => {
    if (!play) {
      if (queue.length) {
        setTrackUri(queue[0]);
        queue.pop();
      }
    }
  }, [play, queue, setTrackUri]);

  if (!accessToken) return null;
  return (
    <>
      <Jumbotron fluid className="search-box">
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
