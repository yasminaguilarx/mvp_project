DROP TABLE IF EXISTS all_data CASCADE;


CREATE TABLE all_data (
    data_id SERIAL PRIMARY KEY,
    playlist_genre varchar(50),
    music_search varchar(50),
    playlist_songs TEXT
);




     playlist_songs      |     music_search     |   playlist_genre   | data_id
-------------------------+----------------------+--------------------+---------
                         |                      | PUMP IT            |       1
                         |                      | FEELIN BLUE        |       2
                         |                      | RED HOT            |       3
                         |                      | PANIC!             |       4
                         |                      | GREEN WITH ENVY    |       5
                         |                      | EUPHORIA EXPRESS   |       6
                         |                      | SOOTHIN SOULS      |       7
                         |                      | LIFE IS A TRIP     |       8
                         |                      | ADRENALINE JUNKIES |       9
                         |                      | JUST A PHASE       |      10
 Bohemian Rhapsody       |                      |                    |      11
 Hey Jude                |                      |                    |      12
 Hotel California        |                      |                    |      13
 Imagine                 |                      |                    |      14
 Thriller                |                      |                    |      15
 Smells Like Teen Spirit |                      |                    |      16
 Sweet Child o' Mine     |                      |                    |      17
 Like a Rolling Stone    |                      |                    |      18
 Billie Jean             |                      |                    |      19
 Stairway to Heaven      |                      |                    |      20
                         | Lainey Wilson        |                    |      21
                         | Kelly Rowland        |                    |      22
                         | Jay-Z                |                    |      23
                         | Ludwig van Beethoven |                    |      24
                         | Wisin Y Yandel       |                    |      25
                         | Sublime              |                    |      26
                         | Ying Yang Twinz      |                    |      27
                         | El Alfa              |                    |      28
                         | Pink                 |                    |      29
                         | JaRule               |                    |      30