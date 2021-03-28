import * as dotenv from "dotenv";
dotenv.config();
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

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   const writeResult = await admin
//     .firestore()
//     .collection("messages")
//     .add({ original: original });
//   // Send back a message that we've successfully written the message
//   res.json({ result: `Message with ID: ${writeResult.id} added.` });
// });

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
          
        }

        const writeKeysResult = await admin
          .firestore()
          .collection("keys")
          .add(accessObject);

        
        res.json({ ...accessObject /* , databaseId: writeResult.id*/ });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  })
);
