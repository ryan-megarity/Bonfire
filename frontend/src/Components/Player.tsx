import axios from "axios";
import { useState, useEffect } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import SpotifyPlayer from "react-spotify-web-playback";

export const Player = ({ ENDPOINT, accessToken, trackUri, setTrackUri, queue, roomCode, setQueue }: any) => {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  useEffect(() => {
    if (!play) {
      if (queue && queue.length) {
        const nextTrack = queue[0]
        setTrackUri(nextTrack.uri);
        axios
        .post(`${ENDPOINT}/removeFromQueue`, {
          roomCode,
          accessToken,
          track: nextTrack
        })
        .then((res) => {
          console.log(res.data);
          setQueue(res.data.queue);
          
        })
        .catch(() => {
          console.log("failed to add to queue")
        });
      }
    }
  }, [play, queue, setTrackUri, ENDPOINT, setQueue, roomCode, accessToken]);

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
