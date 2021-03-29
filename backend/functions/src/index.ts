import * as dotenv from "dotenv";
process.env.STAGE?.trim() == "development"
  ? dotenv.config({ path: ".env.development" })
  : dotenv.config({});
import * as functions from "firebase-functions";
import SpotifyWebApi = require("spotify-web-api-node");
import * as cors from "cors";
const corsHandler = cors({ origin: true });
// The Firebase Admin SDK to access Firestore.
import admin = require("firebase-admin");
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

exports.refresh = functions.https.onRequest(async (req, res) =>
  corsHandler(req, res, () => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken,
    });

    spotifyApi
      .refreshAccessToken()
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expires_in,
        });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  })
);

exports.login = functions.https.onRequest(async (req, res) =>
  corsHandler(req, res, () => {
    console.log(req.body);
    const code = req.body.code;
    console.log({ code: code });
    console.log({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    spotifyApi
      .authorizationCodeGrant(code)
      .then(async (data) => {
        const accessObject = {
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        };
        const roomObject = {
          accessObject,
          roomCode: "0069",
        };
        const writeRoomResult = await admin
          .firestore()
          .collection("rooms")
          .add(roomObject);
        res.json({ roomId: writeRoomResult.id, ...roomObject });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  })
);
