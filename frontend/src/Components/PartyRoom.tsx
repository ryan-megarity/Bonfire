import React from "react";
import { useState } from "react";
import { Player } from "./Player";
import { useAuth } from "./useAuth";

export const PartyRoom = (code: any) => {
  const accessToken = useAuth(code);
  const [trackUri, setTrackUri] = useState("");
  console.log(accessToken);
  return (
    <>
      <h2>Here's the Party</h2>
      <Player accessToken={accessToken} trackUri={trackUri}></Player>
    </>
  );
};
