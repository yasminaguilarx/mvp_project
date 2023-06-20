const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");

const cors = require("cors");

const dbstring = process.env.DATABASE_URL;
// const port = process.env.PORT;
const port = 3400;

const pool = new Pool({
  connectionString: dbstring,
});

app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);
// app.use(cookieParser());

// get all
//music search
app.get("/music_search", async (req, res) => {
  const { song_genre, song_artist } = req.query;

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

//playlist info
app.get("/playlist_info", async (req, res) => {
  const { playlist_type, playlist_downloads } = req.body;

  try {
    let query = `SELECT * FROM playlist_info`;

    if (playlist_type || playlist_downloads) {
      query += ` WHERE`;
    }

    if (playlist_type) {
      query += ` playlist_type = '${playlist_type}'`;
    }

    if (playlist_type && playlist_downloads) {
      query += ` AND`;
    }

    if (playlist_downloads) {
      query += ` song_artist = '${playlist_downloads}'`;
    }
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//user info
app.get("/user_info", async (req, res) => {
  const { user_playlist, user_profile } = req.body;

  try {
    let query = `SELECT * FROM user_info`;

    if (user_playlist || user_profile) {
      query += ` WHERE`;
    }

    if (user_playlist) {
      query += ` song_genre = '${user_playlist}'`;
    }

    if (user_playlist && user_profile) {
      query += ` AND`;
    }

    if (user_profile) {
      query += ` song_artist = '${user_profile}'`;
    }
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//playlist songs
app.get("/playlist_songs", async (req, res) => {
  const { playlist_id, song_id } = req.body;

  try {
    let query = `SELECT * FROM playlist_songs`;

    if (playlist_id || song_id) {
      query += ` WHERE`;
    }

    if (playlist_id) {
      query += ` playlist_id = '${playlist_id}'`;
    }

    if (playlist_id && song_id) {
      query += ` AND`;
    }

    if (song_id) {
      query += ` song_artist = '${song_id}'`;
    }
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//user playlists
app.get("/user_playlists", async (req, res) => {
  const { user_id, playlist_id } = req.body;

  try {
    let query = `SELECT * FROM user_playlists`;

    if (user_id || playlist_id) {
      query += ` WHERE`;
    }

    if (user_id) {
      query += ` song_genre = '${user_id}'`;
    }

    if (user_id && playlist_id) {
      query += ` AND`;
    }

    if (playlist_id) {
      query += ` song_artist = '${playlist_id}'`;
    }
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//get one
//music search
app.get("/music_search/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM music_search WHERE song_id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("Song Not Found");
    } else {
      res.status(201).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//playlist info
app.get("/playlist_info/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM playlist_info WHERE playlist_id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("Playlist Not Found");
    } else {
      res.status(201).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//user info
app.get("/user_info/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM user_info WHERE user_id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("User Not Found");
    } else {
      res.status(201).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//playlist songs
app.get("/playlist_songs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM playlist_songs WHERE playlist_id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("Playlist Not Found");
    } else {
      res.status(201).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//user playlists
app.get("/user_playlists/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM user_playlists WHERE user_id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("Song Not Found");
    } else {
      res.status(201).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//create one
//music search
app.post("/music_search", async (req, res) => {
  const { song_genre, song_artist } = req.query;

  if (!song_genre || !song_artist) {
    return res.status(400).json({ error: "Missing Required Fields" });
  }
  try {
    let values = [song_genre || song_artist];
    const result = await pool.query(
      `INSERT INTO music_search (song_genre, song_artist) VALUES ($1, $2) RETURNING *`,
      values
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
// }

//what im thinking i should do tomorrow: create restful routes for all of MY seeded data, then on the client side i will somehow query the tables and set it equal to for example 'music artist' and such so that the spotify api and my api are both utilized
//create routes on the server side using client credentials to access the data from spotify
//add more to my css base that i've made and hope for the best

//update one

//delete one

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

//DONT DELETE ANYTHING BELOW, WILL USE AT LATER TIME, THIS CODE WORKS ON THE SERVER SIDE, ABLE TO GET ACCESS KEY USING THUNDER CLIENT
//YOU WERE TRYING TO LINK THEIR DATABASE TO YOURS TO PUSH DATA INTO YOUR TABLES, DID NOT HAVE TIME TO FIGURE THAT OUT!
// const axios = require("axios");
//const btoa = require("btoa");
// const querystring = require("querystring");
// const cookieParser = require("cookie-parser");
// app.get("/api/token", async (req, res) => {
//   try {
//     const response = await axios.post(
//       "https://accounts.spotify.com/api/token",
//       "grant_type=client_credentials",
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: "Basic " + btoa(client_id + ":" + client_secret),
//         },
//       }
//     );
//     res.json({ access_token: response.data.access_token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

//client credentials flow
// const client_id = process.env.CLIENT_ID;
// const client_secret = process.env.CLIENT_SECRET;
