import React from "react";
import { useState } from "react";
import { Connected } from "./Connected";
import { Player } from "./Player";
import { Queue } from "./Queue";
import { Search } from "./Search";
import { useAuth } from "./useAuth";

export const PartyRoom = ({
  ENDPOINT,
  code,
  isRoomOwner,
  setRoomOwner,
  roomCode,
  setRoomCode,
}: any) => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useAuth(
    ENDPOINT,
    code,
    roomCode,
    setRoomCode,
    isRoomOwner,
    setQueue,
    loading,
    setLoading
  );
  const [trackUri, setTrackUri] = useState();

  return (
    <>
      {isRoomOwner && (
        <>
          <Connected accessToken={accessToken} loading={loading} />
          <Player
            ENDPOINT={ENDPOINT}
            accessToken={accessToken}
            trackUri={trackUri}
            setTrackUri={setTrackUri}
            queue={queue}
            setQueue={setQueue}
            roomCode={roomCode}
          ></Player>
          <Queue queue={queue} />
          <Search
            ENDPOINT={ENDPOINT}
            setQueue={setQueue}
            accessToken={accessToken}
            roomCode={roomCode}
          />
        </>
      )}
      {!isRoomOwner && (
        <>
          <Connected accessToken={accessToken} />
          <Queue queue={queue} />
          <Search setQueue={setQueue} accessToken={accessToken} />
        </>
      )}
    </>
  );
};
