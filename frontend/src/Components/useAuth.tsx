import { useState, useEffect } from "react";
import axios from "axios";

export const useAuth = (code: any, setRoomCode: any) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState(0);
  const ENDPOINT =
    process.env.NODE_ENV === "development" //create-react-app sets 'development' in npm start and 'production' in build
      ? "http://localhost:5001/bonfire-958c8/us-central1"
      : "https://us-central1-bonfire-958c8.cloudfunctions.net";
  useEffect(() => {
    axios
      .post(`${ENDPOINT}/login`, {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessObject.accessToken);
        setRefreshToken(res.data.accessObject.refreshToken);
        setExpiresIn(res.data.accessObject.expiresIn);
        setRoomCode(res.data.roomCode);
        localStorage.setItem("roomCode", res.data.roomCode);
        window.history.pushState({}, "", "/");
      })
      .catch(() => {
        //window.location.href = "/";
      });
  }, [ENDPOINT, code, setRoomCode]);

  useEffect(() => {
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
  }, [refreshToken, expiresIn, ENDPOINT]);

  return accessToken;
};
