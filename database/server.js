const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

const dbstring = process.env.DATABASE_URL;
const port = process.env.PORT;

const pool = new Pool({
  connectionString: dbstring,
});

const generateRandomString = function (length) {
  const text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());

// Set up authorization flow
const stateKey = "spotify_auth_state";
const client_id = process.env.CLIENT_ID;
const redirect_uri = "https://playlist-web-server.onrender.com/callback";
const client_secret = process.env.CLIENT_SECRET;

app.get("/login", async (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scopes = ["user-read-private", "user-read-email"];
  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scopes,
    redirect_uri: redirect_uri,
    state: state,
  });
  const authUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
  window.location.href = authUrl;
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.status(400).send("state_mismatch");
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic" +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    req.post(authOptions, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        res.status(200).json({ access_token, refresh_token });
      } else {
        res.status(400).json("Invalid Token");
      }
    });
  }
});

// Function to handle the access token retrieval from the URL hash
function getAccessTokenFromHash() {
  const hashParams = {};
  const hash = window.location.hash.substring(1);
  const params = hash.split("&");
  for (let i = 0; i < params.length; i++) {
    const param = params[i].split("=");
    hashParams[param[0]] = decodeURIComponent(param[1]);
  }
  return hashParams.access_token;
}

// Example API request to get user's profile
function getUserProfile(accessToken) {
  const apiUrl = "https://api.spotify.com/v1/me";

  fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the API response
      console.log("User Profile:", data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
}

// Authorize the user and retrieve access token
authorizeSpotify();

// Once the user is redirected back to your application with the access token in the URL hash
// Retrieve the access token from the hash
const accessToken = getAccessTokenFromHash();

// Use the access token to make API requests
getUserProfile(accessToken);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
