const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");

const cors = require("cors");

const querystring = require("querystring");

const cookieParser = require("cookie-parser");

const axios = require("axios");

const dbstring = process.env.DATABASE_URL;
const port = process.env.PORT;

const pool = new Pool({
  connectionString: dbstring,
});

// const generateRandomString = function (length) {
//   const text = "";
//   const possible =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };

app.use(express.json());
app.use(express.static("database/public"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());

// // Set up authorization flow
// const stateKey = "spotify_auth_state";
// const client_id = process.env.CLIENT_ID;
// const redirect_uri = "https://playlist-web-server.onrender.com/callback";
// const client_secret = process.env.CLIENT_SECRET;

// app.get("/authorize", async (req, res) => {
//   const state = generateRandomString(16);
//   res.cookie(stateKey, state);

//   const scopes = ["user-read-private", "user-read-email"];
//   const queryParams = new URLSearchParams({
//     response_type: "code",
//     client_id: client_id,
//     scope: scopes,
//     redirect_uri: redirect_uri,
//     state: state,
//   });
//   const authUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
//   window.location.href = authUrl;
// });

// //token exchange request
// app.get("/callback", async (req, res) => {
//   const code = req.query.code || null;
//   const state = req.query.state || null;
//   const storedState = req.cookies ? req.cookies[stateKey] : null;

//   if (state === null || state !== storedState) {
//     res.status(400).send("state_mismatch");
//   } else {
//     res.clearCookie(stateKey);
//     const authOptions = {
//       url: "https://accounts.spotify.com/api/token",
//       method: "post",
//       data: querystring.stringify({
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: "client_credentials",
//       }),
//       headers: {
//         Authorization: `Basic ${Buffer.from(
//           `${client_id}: ${client_secret}`
//         ).toString("base64")}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     };

//     try {
//       const response = await axios(authOptions); //this is the token exchange request

//       if (response.status === 200) {
//         const access_token = response.data.access_token;
//         const refresh_token = response.data.refresh_token;

//         res.cookie("access_token", access_token, { httpOnly: true });
//         res.cookie("refresh_token", refresh_token, { httpOnly: true });

//         res.status(200).json({ access_token, refresh_token });
//       } else {
//         res.status(400).json("Invalid Token");
//       }
//     } catch (err) {
//       console.error("Token Exchange Error:", err);
//       res.status(500).json("Internal Server Error");
//     }
//   }
// });

// get all
app.get("/music_search", async (req, res) => {
  const { song_genre, song_artist } = req.body;

  try {
    let query = `SELECT * FROM music_search`;

    if (song_genre || song_artist) {
      query += ` WHERE`;
    }

    if (song_genre) {
      query += ` song_genre = '${song_genre}'`;
    }

    if (song_genre && song_artist) {
      query += ` AND`;
    }

    if (song_artist) {
      query += ` song_artist = '${song_artist}'`;
    }
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//get one

//create one

//update one

//delete one

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
