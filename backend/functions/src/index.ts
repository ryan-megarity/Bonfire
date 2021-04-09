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
    const code = req.body.code;
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
          queue: [
            {
              artist: "The Prodigy",
              title: "Firestarter",
              uri: "spotify:track:79CUrU5o2KAVDTNm4x3eGU",
              albumUrl:
                "https://i.scdn.co/image/ab67616d00004851fa0b74121608a007af87a3fe",
            },
          ],
          createdDate: new Date(),
          lastModifiedDate: new Date(),
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

exports.getRoom = functions.https.onRequest(async (req, res) =>
  corsHandler(req, res, () => {
    console.log(req.body);
    const roomCode = req.body.roomCode;
    if (roomCode) {
      const roomObjectRef = admin.firestore().collection("rooms").doc(roomCode);

      roomObjectRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            res.json(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            res.sendStatus(404);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          res.sendStatus(400);
        });
    } else {
      res.sendStatus(500);
    }
  })
);

exports.addToQueue = functions.https.onRequest(async (req, res) =>
  corsHandler(req, res, () => {
    console.log(req.body);
    const roomCode = req.body.roomCode;
    // const accessToken = req.body.accessToken;
    const track = req.body.track;
    if (roomCode) {
      const roomObjectRef = admin.firestore().collection("rooms").doc(roomCode);

      roomObjectRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data() || {};
            console.log("Document data:", data);
            const updatedRoom = {
              ...data,
              queue: [...data.queue, track],
              lastModifiedDate: new Date(),
            };
            roomObjectRef.set(updatedRoom);
            res.json(updatedRoom);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            res.sendStatus(404);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          res.sendStatus(400);
        });
    } else {
      res.sendStatus(500);
    }
  })
);

exports.removeFromQueue = functions.https.onRequest(async (req, res) =>
  corsHandler(req, res, () => {
    console.log(req.body);
    const roomCode = req.body.roomCode;
    // const accessToken = req.body.accessToken;
    const track = req.body.track;
    if (roomCode) {
      const roomObjectRef = admin.firestore().collection("rooms").doc(roomCode);

      roomObjectRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data() || {};
            console.log("Document data:", data);
            console.log(track);
            const updatedRoom = {
              ...data,
              queue: data.queue.filter(
                (t: { uri: string }) => t.uri !== track.uri
              ),
              lastModifiedDate: new Date(),
            };
            roomObjectRef.set(updatedRoom);
            res.json(updatedRoom);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            res.sendStatus(404);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          res.sendStatus(400);
        });
    } else {
      res.sendStatus(500);
    }
  })
);
