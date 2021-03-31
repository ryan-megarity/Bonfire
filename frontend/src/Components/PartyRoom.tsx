import React from "react";
import { useState } from "react";
import { Connected } from "./Connected";
import { Player } from "./Player";
import { Queue } from "./Queue";
import { Search } from "./Search";
import { useAuth } from "./useAuth";

export const PartyRoom = ({
  code,
  isRoomOwner,
  setRoomOwner,
  roomCode,
  setRoomCode,
}: any) => {
  const [queue, setQueue] = useState([]);
  const accessToken = useAuth(
    code,
    roomCode,
    setRoomCode,
    isRoomOwner,
    setQueue
  );
  const [trackUri, setTrackUri] = useState();

  return (
    <>
      {isRoomOwner && (
        <>
          <Connected accessToken={accessToken} />
          <Player
            accessToken={accessToken}
            trackUri={trackUri}
            setTrackUri={setTrackUri}
            queue={queue}
          ></Player>
          <Queue queue={queue} />
          <Search setTrackUri={setTrackUri} accessToken={accessToken} />
        </>
      )}
      {!isRoomOwner && (
        <>
          <Connected accessToken={accessToken} />
          <Queue queue={queue} />
          <Search setTrackUri={setTrackUri} accessToken={accessToken} />
        </>
      )}
    </>
  );
};
