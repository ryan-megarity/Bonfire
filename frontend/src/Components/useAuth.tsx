import { useState, useEffect } from "react";
import axios from "axios";

export const useAuth = (
  ENDPOINT: any,
  code: any,
  roomCode: any,
  setRoomCode: any,
  isRoomOwner: any,
  setQueue: any,
  loading: any,
  setLoading: any
) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState(0);

  useEffect(() => {
    if (isRoomOwner && !accessToken) {
      setLoading(true);
      axios
        .post(`${ENDPOINT}/login`, {
          code,
        })
        .then((res) => {
          console.log(res.data);
          setAccessToken(res.data.accessObject.accessToken);
          setRefreshToken(res.data.accessObject.refreshToken);
          setExpiresIn(res.data.accessObject.expiresIn);
          setRoomCode(res.data.roomId);
          setQueue(res.data.queue);
          localStorage.setItem("roomCode", res.data.roomId);
          window.history.pushState({}, "", "/");
          setLoading(false);
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
            setQueue(res.data.queue);
          })
          .catch(() => {
            //window.location.href = "/";
          });
      }
    }
  }, [
    ENDPOINT,
    code,
    isRoomOwner,
    roomCode,
    setQueue,
    setRoomCode,
    accessToken,
    setLoading
  ]);

  useEffect(() => {
    if (isRoomOwner) {
      if (!refreshToken || !expiresIn) return;
      const interval = setInterval(() => {
        setLoading(true);
        axios
          .post(`${ENDPOINT}/refresh`, {
            refreshToken,
          })
          .then((res) => {
            setAccessToken(res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
            setLoading(false);
          })
          .catch(() => {
            //window.location.href = "/";
          });
      }, (expiresIn - 60) * 1000);

      return () => clearInterval(interval);
    }
  }, [refreshToken, expiresIn, ENDPOINT, isRoomOwner, setLoading]);

  return accessToken;
};
