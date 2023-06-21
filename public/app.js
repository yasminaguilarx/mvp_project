console.log("this is workin");

window.addEventListener("DOMContentLoaded", displayDefaultCards);

function displayDefaultCards() {
  const defaultCard = document.querySelector("#defaultCardContainer");
  defaultCard.remove();

  const newCardContainer = document.createElement("div");
  newCardContainer.id = "defaultCardContainer";

  const defaultData = [
    {
      type: "playlist",
      name: "Playlist 1",
      image: "images/1871847_band_music_social media_songs_radio_icon.png",
    },
    {
      type: "playlist",
      name: "Playlist 1",
      image: "images/1871847_band_music_social media_songs_radio_icon.png",
    },
    {
      type: "playlist",
      name: "Playlist 1",
      image: "images/1871847_band_music_social media_songs_radio_icon.png",
    },
    {
      type: "playlist",
      name: "Playlist 1",
      image: "images/1871847_band_music_social media_songs_radio_icon.png",
    },
    {
      type: "playlist",
      name: "Playlist 1",
      image: "images/1871847_band_music_social media_songs_radio_icon.png",
    },
    {
      type: "playlist",
      name: "Playlist 1",
      image: "images/1871847_band_music_social media_songs_radio_icon.png",
    },
  ];

  defaultData.forEach((item) => {
    const card = createCard(item, "card", "card-image", "card-title");
    newCardContainer.appendChild(card);
  });

  const cardDiv = document.querySelector("#cardsContainer");
  cardDiv.appendChild(newCardContainer);
}

//search button
const searchBtn = document.querySelector("#submit");
searchBtn.addEventListener("click", async () => {
  const searchBar = document.querySelector("input[id=searchBar]").value;
  await search(searchBar);
});

//create cards
function createCard(item) {
  const cardDiv = document.getElementsByClassName("card");

  // Create the card content
  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  // Create the card image
  const cardImage = document.createElement("img");
  cardImage.src = item.image;
  cardImage.alt = item.name;
  cardImage.classList.add("card-image");
  cardContent.appendChild(cardImage);

  // Create the card title
  const cardTitle = document.createElement("h2");
  cardTitle.textContent = item.name;
  cardTitle.classList.add("card-title");
  cardContent.appendChild(cardTitle);

  // Append the card content to the card element
  cardDiv.appendChild(cardContent);

  return cardDiv;
}

//search functionality 'get'
async function search(input) {
  try {
    const response = await fetch(
      `http://localhost:3400/music_search?q=${input}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    const filter = data.filter((elem) => {
      return elem.song_artist.toLowerCase().includes(input.toLowerCase());
    });
    searchResults(filter);
  } catch {
    console.error("No result found");
  }
}

function searchResults(data) {
  const resultsContainer = document.querySelector("#resultsContainer");
  resultsContainer.innerHTML = "";

  if (data.length === 0) {
    resultsContainer.textContent = "No result found";
    return;
  }

  const ul = document.createElement("ul");
  ul.classList.add("results-list");

  data.forEach((item) => {
    const li = document.createElement("li");
    let displayText = "";

    if (item.type === "genre") {
      displayText = item.playlist_type;
    } else if (item.type === "artist" || "song") {
      displayText = item.song_artist;
    } else if (item.type === "playlist") {
      displayText = item.playlist_songs;
    }

    li.textContent = displayText;
    ul.appendChild(li);
  });
  resultsContainer.appendChild(ul);
}

//genre check this one and see if works
async function getPlaylistGenre(genre) {
  try {
    const response = await fetch(
      `http://localhost:3400/playlist_info/${genre}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    //handle the data????
  } catch (error) {
    console.error("Error:", error);
  }
}

//create playlist
async function createPlaylist(playlistType, songIds) {
  try {
    // Create playlist_info entry
    const playlistInfoResponse = await fetch(
      "http://localhost:3400/playlist_info",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlist_type: playlistType }),
      }
    );
    const playlistInfoData = await playlistInfoResponse.json();

    const playlistId = playlistInfoData[0].playlist_id;

    // Add songs to playlist_songs table
    for (const songId of songIds) {
      await fetch("http://localhost:3400/playlist_songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlist_id: playlistId, song_id: songId }),
      });
    }

    console.log("Playlist created successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

//update playlist
async function updatePlaylist(playlistId, playlistType) {
  try {
    await fetch(`http://localhost:3400/playlist_info/${playlistId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playlist_type: playlistType }),
    });

    console.log("Playlist updated successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

//delete playlist
async function deletePlaylist(playlistId) {
  try {
    // Delete playlist_songs entries
    await fetch(`http://localhost:3400/playlist_songs/${playlistId}`, {
      method: "DELETE",
    });

    // Delete playlist_info entry
    await fetch(`http://localhost:3400/playlist_info/${playlistId}`, {
      method: "DELETE",
    });

    console.log("Playlist deleted successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

//delete songs from playlist
async function removeSongFromPlaylist(playlistId, songId) {
  try {
    await fetch(
      `http://localhost:3400/playlist_songs/${playlistId}/${songId}`,
      {
        method: "DELETE",
      }
    );

    console.log("Song removed from playlist successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}
