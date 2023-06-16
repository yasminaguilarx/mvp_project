const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const port = 3400;

const dbstring = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: dbstring,
});

app.use(express.json());

app.get("/music_search", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM music_search");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
