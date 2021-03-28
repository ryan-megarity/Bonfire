import { useState, useEffect } from "react";
import axios from "axios";

export const useAuth = (code: any) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState(0);
  const ENDPOINT =
    process.env.NODE_ENV === "development" //create-react-app sets 'development' in npm start and 'production' in build
      ? "http://localhost:3001"
      : "https://us-central1-bonfire-958c8.cloudfunctions.net";
  useEffect(() => {
    axios
      .post(`${ENDPOINT}/login`, {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, "", "/");
      })
      .catch(() => {
        //window.location.href = "/";
      });
  }, [ENDPOINT, code]);

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
