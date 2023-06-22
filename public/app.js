//search button

window.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const inputSearch = searchBar.value;
      await search(inputSearch);
    }
  });
});

// //search functionality 'get'
async function search(input) {
  while (resultsContainer.firstChild) {
    resultsContainer.removeChild(resultsContainer.firstChild);
  }

  try {
    const response = await fetch(
      `https://playlist-web-server.onrender.com/all_data?q=${input}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    // const filter = data.filter((elem) => {
    //   return elem.toLowerCase().includes(input.toLowerCase());
    // });
    searchResults(data);
  } catch (err) {
    console.error("No result found", err);
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

// create cards
function createCard(item) {
  const cardCtn = document.getElementById("#cardsContainer");
  cardCtn.innerHTML = "";

  const card = document.createElement("div");
  card.classList.add("card");

  // Create the card image
  const cardImage = document.createElement("img");
  cardImage.src =
    "./public/images/1871847_band_music_social media_songs_radio_icon.png";
  cardImage.alt = item.name;
  cardImage.classList.add("card-image");
  card.appendChild(cardImage);

  // Create the card title
  const cardTitle = document.createElement("h3");
  cardTitle.textContent = item.name;
  cardTitle.classList.add("card-title");
  card.appendChild(cardTitle);

  //create save button
  const cardButton = document.createElement("button");
  cardButton.textContent = "Save to Playlist";
  cardButton.classList.add("card-button");
  cardButton.addEventListener("click", () => {
    saveToPlaylist(item);
  });
  card.appendChild(cardButton);

  const resultsContainer = document.querySelector("#resultsContainer");
  resultsContainer.appendChild(card);

  return card;
}

function saveToPlaylist() {
  const playlistName = prompt("Enter playlist name:");

  if (!playlistName) {
    console.log("Playlist name is required.");
    return;
  }

  const playlist = {
    name: playlistName,
    songs: [result],
  };

  fetch(`https://playlist-web-server.onrender.com/playlist_info/${item}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlist),
  })
    .then((response) => {
      if (response.ok) {
        console.log(
          `Saved '${result.name}' to playlist '${playlistName}' successfully!`
        );
      } else {
        console.error("Failed to save the playlist.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//genre check this one and see if works
async function getPlaylistGenre(genre) {
  try {
    const response = await fetch(`/playlist_info/${genre}`, {
      method: "GET",
    });
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
    const playlistInfoResponse = await fetch("/playlist_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playlist_type: playlistType }),
    });
    const playlistInfoData = await playlistInfoResponse.json();

    const playlistId = playlistInfoData[0].playlist_id;

    // Add songs to playlist_songs table
    for (const songId of songIds) {
      await fetch("/playlist_songs", {
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

// //update playlist
async function updatePlaylist(playlistId, playlistType) {
  try {
    await fetch(`/playlist_info/${playlistId}`, {
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
    await fetch(`/playlist_songs/${playlistId}`, {
      method: "DELETE",
    });

    // Delete playlist_info entry
    await fetch(`/playlist_info/${playlistId}`, {
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
    await fetch(`/playlist_songs/${playlistId}/${songId}`, {
      method: "DELETE",
    });

    console.log("Song removed from playlist successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}
