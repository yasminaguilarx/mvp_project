DROP TABLE IF EXISTS music_search CASCADE;
DROP TABLE IF EXISTS playlist_songs CASCADE;
DROP TABLE IF EXISTS playlist_info CASCADE;
DROP TABLE IF EXISTS user_playlists CASCADE;
DROP TABLE IF EXISTS user_info CASCADE;

CREATE TABLE music_search (
    song_id SERIAL PRIMARY KEY,
    song_genre varchar(50),
    song_artist varchar(50)
);

CREATE TABLE playlist_info (
    playlist_id SERIAL PRIMARY KEY,
    playlist_type varchar(50) --genre
);


--deleted from render database woohoo
-- CREATE TABLE user_info (
--     user_id SERIAL PRIMARY KEY,
--     user_playlist TEXT,
--     user_profile varchar(50) UNIQUE
-- );

CREATE TABLE playlist_songs (
    playlist_id INT NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES playlist_info(playlist_id),
    song_id INT NOT NULL,
    FOREIGN KEY (song_id) REFERENCES music_search(song_id),
    songs_added TEXT
);


--deleted from database woohoo
-- CREATE TABLE user_playlists (
--     user_id INT NOT NULL, 
--     FOREIGN KEY (user_id) REFERENCES user_info(user_id),
--     playlist_id INT NOT NULL,
--     FOREIGN KEY (playlist_id) REFERENCES playlist_info(playlist_id)
-- );

INSERT INTO music_search
(song_artist)
VALUES 
    ('Lainey Wilson'),
    ('Kelly Rowland'),
    ('Jay-Z'),
    ('Ludwig van Beethoven'),
    ('Wisin Y Yandel'),
    ('Sublime'),
    ('Ying Yang Twinz'),
    ('El Alfa'),
    ('Pink'),
    ('JaRule');

INSERT INTO playlist_info
(playlist_type)
VALUES
    ('PUMP IT'),
    ('FEELIN BLUE'),
    ('RED HOT'),
    ('PANIC!'),
    ('GREEN WITH ENVY'),
    ('EUPHORIA EXPRESS'),
    ('SOOTHIN SOULS'),
    ('LIFE IS A TRIP'),
    ('ADRENALINE JUNKIES'),
    ('JUST A PHASE');

-- INSERT INTO user_info
-- (user_playlist, user_profile)
-- VALUES
--     ('RED HOT', 'User Profile 1'),
--     ('FEELIN BLUE', 'User Profile 2'),
--     ('GREEN WITH ENVY', 'User Profile 3'),
--     ('PUMP IT', 'User Profile 4'),
--     ('PANIC!', 'User Profile 5'),
--     ('Euphoria express', 'User Profile 6'),
--     ('Soothing souls', 'User Profile 7'),
--     ('Life is a trip', 'User Profile 8'),
--     ('Adrenaline junkies', 'User Profile 9'),
--     ('Just a phase', 'User Profile 10');


-- INSERT INTO user_playlists
--     (user_id, playlist_id)
-- VALUES
--     (1, 6),
--     (5, 10),
--     (7, 8),
--     (4, 9),
--     (2, 3);

INSERT INTO playlist_songs
    (playlist_id, song_id, songs_added)
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

