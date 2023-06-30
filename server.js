const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");

const cors = require("cors");

const dbstring = process.env.DATABASE_URL;
const port = process.env.PORT;
// const port = 3400;

const pool = new Pool({
  connectionString: dbstring,
});

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

//get all data
app.get("/all_data", async (req, res) => {
  try {
    const playlistInfoResult = await pool.query(`SELECT * FROM playlist_genre`);
    const playlistSongsResult = await pool.query(
      `SELECT * FROM playlist_songs`
    );
    const musicSearchResult = await pool.query(`SELECT * FROM music_search`);

    const playlistInfo = playlistInfoResult.rows.map((item) => ({
      ...item,
      type: "genre",
    }));

    const playlistSongs = playlistSongsResult.rows.map((item) => ({
      ...item,
      type: "playlist",
    }));

    const musicSearch = musicSearchResult.rows;

    const allData = {
      playlistInfo,
      playlistSongs,
      musicSearch,
    };

    if (playlistInfo || playlistSongs || musicSearch) {
      res.status(200).json(allData);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//get one
//music search WORKS
app.get("/all_data/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM all_data WHERE data_id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      res.status(404).send("Not Found");
    } else {
      res.status(201).json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//playlist info WORKS
// app.get("/playlist_info/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await pool.query(
//       `SELECT * FROM playlist_info WHERE playlist_id = $1`,
//       [id]
//     );
//     if (result.rowCount === 0) {
//       res.status(404).send("Playlist Not Found");
//     } else {
//       res.status(201).json(result.rows[0]);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

//playlist songs WORKS
// app.get("/playlist_songs/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await pool.query(
//       `SELECT * FROM playlist_songs WHERE playlist_id = $1`,
//       [id]
//     );
//     if (result.rowCount === 0) {
//       res.status(404).send("Playlist Not Found");
//     } else {
//       res.status(201).json(result.rows[0]);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

//create one
//music search WORKS
app.post("/all_data", async (req, res) => {
  const { playlist_genre, playlist_songs, music_search } = req.body;
  if (!playlist_genre || !playlist_songs || !music_search) {
    return res.status(400).json({ error: "Missing Required Field" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO all_data ('${playlist_genre}') || ('${playlist_songs}') || ('${music_search}') RETURNING *`,
      [playlist_genre, playlist_songs, music_search]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//playlist info WORKS
// app.post("/playlist_info", async (req, res) => {
//   const { playlist_type } = req.body;
//   if (!playlist_type) {
//     return res.status(400).json({ error: "Missing Required Field" });
//   }

//   try {
//     const result = await pool.query(
//       `INSERT INTO playlist_info (playlist_type) VALUES ($1) RETURNING *`,
//       [playlist_type]
//     );
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

//playlist songs WORKS
// app.post("/playlist_songs/songs_added", async (req, res) => {
//   const { playlist_id, song_id } = req.body;
//   if (!playlist_id || !song_id) {
//     return res.status(400).json({ error: "Missing Required Field" });
//   }

//   try {
//     const result = await pool.query(
//       `INSERT INTO playlist_songs (playlist_id, song_id) VALUES ($1, $2) RETURNING *`,
//       [playlist_id, song_id]
//     );
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

//update one
//music search
app.put("/music_search/:id", async (req, res) => {
  const { id } = req.params;
  const { song_artist } = req.body;

  try {
    const result = await pool.query(
      `UPDATE music_search SET song_artist = $1 WHERE song_id = $2 RETURNING *`,
      [song_artist, id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//playlist info WORKS
app.put("/playlist_info/:id", async (req, res) => {
  const { id } = req.params;
  const { playlist_type } = req.body;

  try {
    const result = await pool.query(
      `UPDATE playlist_info SET playlist_type = $1 WHERE playlist_id = $2 RETURNING *`,
      [playlist_type, id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//playlist songs WORKS
app.put("/playlist_songs/:id", async (req, res) => {
  const { id } = req.params;
  const { song_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE playlist_songs SET song_id = $1 WHERE playlist_id = $2 RETURNING *`,
      [song_id, id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//delete one
//music search WORKS
app.delete("/music_search/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM music_search WHERE song_id = $1`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//playlist info
app.delete("/playlist_info/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM playlist_info WHERE playlist_type = $1`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//playlist songs
app.delete("/playlist_songs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM playlist_songs WHERE playlist_id = $1`,
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
