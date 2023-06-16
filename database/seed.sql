DROP TABLE IF EXISTS music_search CASCADE;
DROP TABLE IF EXISTS playlist_songs CASCADE;
DROP TABLE IF EXISTS playlist_info CASCADE;
DROP TABLE IF EXISTS user_playlists CASCADE;
DROP TABLE IF EXISTS user_info CASCADE;

CREATE TABLE music_search (
    song_id SERIAL PRIMARY KEY UNIQUE,
    song_genre varchar(50),
    song_artist varchar(50)
);

CREATE TABLE playlist_info (
    playlist_id SERIAL PRIMARY KEY UNIQUE,
    playlist_type varchar(50),
    playlist_downloads INT NOT NULL
);

CREATE TABLE user_info (
    user_id SERIAL PRIMARY KEY UNIQUE,
    user_playlist TEXT,
    user_profile varchar(50) UNIQUE,
    user_likes INT
);

CREATE TABLE playlist_songs (
    playlist_id INT NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES playlist_info(playlist_id),
    song_id INT NOT NULL,
    FOREIGN KEY (song_id) REFERENCES music_search(song_id)
);

CREATE TABLE user_playlists (
    user_id INT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES user_info(user_id),
    playlist_id INT NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES playlist_info(playlist_id)
);


INSERT INTO music_search
    (song_id, song_genre, song_artist)
VALUES 
    (1, 'Country', 'Lainey Wilson'),
    (2, 'R&B', 'Kelly Rowland'),
    (3, 'Hip Hop', 'Jay-Z'),
    (4, 'Classical', 'Ludwig van Beethoven'),
    (5, 'Reggaeton', 'Wisin Y Yandel'),
    (6, 'Ska', 'Sublime'),
    (7, 'Rap', 'Ying Yang Twinz'),
    (8, 'Dembow', 'El Alfa'),
    (9, 'Pop', 'Pink'),
    (10, 'R&B', 'JaRule');

INSERT INTO playlist_info 
    (playlist_id, playlist_type, playlist_downloads)
VALUES
    (1, 'PUMP IT', '2509'),
    (2, 'FEELIN BLUE', '130'),
    (3, 'RED HOT', '13078'),
    (4, 'PANIC!', '780'),
    (5, 'GREEN WITH ENVY', '330'),
    (6, 'EUPHORIA EXPRESS', '89780'),
    (7, 'SOOTHIN SOULS', '15759'),
    (8, 'LIFE IS A TRIP', '1100'),
    (9, 'ADRENALINE JUNKIES', '14509'),
    (10, 'JUST A PHASE', '1000');

INSERT INTO user_info
    (user_id, user_playlist, user_profile, user_likes)
VALUES 
    (1, 'RED HOT', 'User Profile 1', 500),
    (2, 'FEELIN BLUE', 'User Profile 2', 250),
    (3, 'GREEN WITH ENVY', 'User Profile 3', 400),
    (4, 'PUMP IT', 'User Profile 4', 800),
    (5, 'PANIC!', 'User Profile 5', 300),
    (6, 'Euphoria express', 'User Profile 6', 600),
    (7, 'Soothing souls', 'User Profile 7', 450),
    (8, 'Life is a trip', 'User Profile 8', 700),
    (9, 'Adrenaline junkies', 'User Profile 9', 550),
    (10, 'Just a phase', 'User Profile 10', 350);

INSERT INTO playlist_songs (playlist_id, song_id)
SELECT pl.playlist_id, ms.song_id
FROM playlist_info AS pl
JOIN music_search AS ms ON pl.playlist_type = ms.song_genre;


INSERT INTO user_playlists (user_id, playlist_id)
SELECT ui.user_id, pi.playlist_id
FROM user_info AS ui
JOIN playlist_info AS pi ON ui.user_profile = pi.playlist_type;


INSERT INTO user_playlists
    (user_id, playlist_id)
VALUES
    (1, 6),
    (5, 10),
    (7, 8),
    (4, 9),
    (2, 3);

INSERT INTO playlist_songs
    (playlist_id, song_id)
VALUES 
    (1, 3),
    (1, 7),
    (2, 2),
    (3, 1),
    (3, 5),
    (4, 7),
    (5, 8),
    (6, 9),
    (7, 4),
    (7, 6);

