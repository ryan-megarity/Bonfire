import React from "react";
import { useState } from "react";
import { Connected } from "./Connected";
import { Player } from "./Player";
import { Search } from "./Search";
import { useAuth } from "./useAuth";

export const PartyRoom = ({
  code,
  isRoomOwner,
  setRoomOwner,
  roomCode,
  setRoomCode,
}: any) => {
  const accessToken = useAuth(code);
  const [trackUri, setTrackUri] = useState(
    "spotify:track:7lEptt4wbM0yJTvSG5EBof"
  );
  //console.log(accessToken);
  return (
    <>
      {isRoomOwner && (
        <>
          <Connected accessToken={accessToken}/>
          <Player accessToken={accessToken} trackUri={trackUri}></Player>
          <Search setTrackUri={setTrackUri} accessToken={accessToken} />
        </>
      )}
      {!isRoomOwner}
    </>
  );
};
