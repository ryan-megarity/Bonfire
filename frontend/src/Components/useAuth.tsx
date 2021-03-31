import { useState, useEffect } from "react";
import axios from "axios";

export const useAuth = (
  code: any,
  roomCode: any,
  setRoomCode: any,
  isRoomOwner: any,
  setQueue: any
) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState(0);
  const ENDPOINT =
    process.env.NODE_ENV === "development" //create-react-app sets 'development' in npm start and 'production' in build
      ? "http://localhost:5001/bonfire-958c8/us-central1"
      : "https://us-central1-bonfire-958c8.cloudfunctions.net";
  useEffect(() => {
    if (isRoomOwner) {
      axios
        .post(`${ENDPOINT}/login`, {
          code,
        })
        .then((res) => {
          setAccessToken(res.data.accessObject.accessToken);
          setRefreshToken(res.data.accessObject.refreshToken);
          setExpiresIn(res.data.accessObject.expiresIn);
          setRoomCode(res.data.roomId);
          setQueue(res.data.queue)
          localStorage.setItem("roomCode", res.data.roomId);
          window.history.pushState({}, "", "/");
        })
        .catch(() => {
          //window.location.href = "/";
        });
    }
    if (!isRoomOwner) {
      if (roomCode) {
        console.log("running get");
        axios
          .post(`${ENDPOINT}/getRoom`, {
            roomCode,
          })
          .then((res) => {
            setAccessToken(res.data.accessObject.accessToken);
            localStorage.setItem("roomCode", res.data.roomId);
            setRoomCode(res.data.roomId);
            window.history.pushState({}, "", "/");
            setQueue(res.data.queue)
          })
          .catch(() => {
            //window.location.href = "/";
          });
      }
    }
  }, [ENDPOINT, code, isRoomOwner, roomCode, setQueue, setRoomCode]);

  useEffect(() => {
    if (isRoomOwner) {
      if (!refreshToken || !expiresIn) return;
      const interval = setInterval(() => {
        axios
          .post(`${ENDPOINT}/refresh`, {
            refreshToken,
          })
          .then((res) => {
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
          })
          .catch(() => {
            //window.location.href = "/";
          });
      }, (expiresIn - 60) * 1000);

      return () => clearInterval(interval);
    }
  }, [refreshToken, expiresIn, ENDPOINT, isRoomOwner]);

  return accessToken;
};
