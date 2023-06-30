DROP TABLE IF EXISTS all_data CASCADE;


CREATE TABLE all_data (
    data_id SERIAL PRIMARY KEY,
    playlist_genre TEXT,
    music_search TEXT,
    playlist_songs TEXT
);
         

INSERT INTO all_data (data_id, playlist_genre, playlist_songs, music_search)
VALUES
  (1, 'PUMP IT', 'Bohemian Rhapsody', 'Lainey Wilson'),
  (2, 'FEELIN BLUE', 'Hey Jude', 'Kelly Rowland'),
  (3, 'RED HOT', 'Hotel California', 'Jay-Z'),
  (4, 'PANIC!', 'Imagine', 'Ludwig van Beethoven'),
  (5, 'GREEN WITH ENVY', 'Thriller', 'Wisin Y Yandel'),
  (6, 'EUPHORIA EXPRESS', 'Smells Like Teen Spirit', 'Sublime'),
  (7, 'SOOTHIN SOULS', 'My Girl', 'Ying Yang Twinz'),
  (8, 'ADRENALINE JUNKIES', 'Like a Rolling Stone', 'El Alfa'),
  (9, 'LIFE IS A TRIP', 'Billie Jean', 'Pink'),
  (10, 'JUST A PHASE', 'Stairway to Heaven', 'JaRule');