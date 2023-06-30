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
  try {
    const response = await fetch(`/all_data?q=${input}`, {
      method: "GET",
    });
    const data = await response.json();
    searchResults(data);
  } catch (err) {
    console.error("No result found", err);
  }
}

function searchResults(data) {
  const defaultCardContainer = document.querySelector("#defaultCardContainer");
  while (defaultCardContainer.firstChild) {
    defaultCardContainer.removeChild(defaultCardContainer.firstChild);
  }
  if (!data || data.length === 0) {
    defaultCardContainer.textContent = "No result found";
    return;
  }
  console.log(data);
  data.results.map((elem) => {
    createCard(elem);
    let displayText = "";
    if (elem.type === "genre") {
      displayText += elem.playlist_type;
    } else if (elem.type === "playlist") {
      displayText += elem.playlist_songs;
    }
    defaultCardContainer.innerHTML = displayText;
  });
}

// create cards
function createCard(elem) {
  const cardCtn = document.getElementById("#defaultCardContainer");
  cardCtn.innerHTML = "";

  const card = document.createElement("div");
  card.classList.add("card");

  // Create the card image
  const cardImage = document.createElement("img");
  cardImage.src =
    "./public/images/1871847_band_music_social media_songs_radio_icon.png";
  cardImage.alt = elem.name;
  cardImage.classList.add("card-image");
  card.appendChild(cardImage);

  // Create the card title
  const cardTitle = document.createElement("h3");
  cardTitle.textContent = elem.name;
  cardTitle.classList.add("card-title");
  card.appendChild(cardTitle);

  //create save button
  const cardButton = document.createElement("button");
  cardButton.textContent = "Save to Playlist";
  cardButton.classList.add("card-button");
  cardButton.addEventListener("click", () => {
    saveToPlaylist(elem);
  });
  card.appendChild(cardButton);

  const cardsContainer = document.querySelector("#cardsContainer");
  cardsContainer.appendChild(card);

  return card;
}

function saveToPlaylist(elem) {
  const playlistName = prompt("Enter playlist name:");

  if (!playlistName) {
    alert("Playlist name is required.");
    return;
  }

  const playlist = {
    name: playlistName,
    songs: [elem],
  };

  fetch(`/playlist_info/songs_added/${elem}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlist),
  })
    .then((response) => {
      if (response.ok) {
        alert(
          `Saved '${elem.name}' to playlist '${playlistName}' successfully!`
        );
      } else {
        console.error("Failed to save the playlist.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

//genre check this one and see if works
async function getPlaylistGenre(genre) {
  try {
    const response = await fetch(`/playlist_info/playlist_type/${genre}`, {
      method: "GET",
    });
    const data = await response.json();
    //handle the data????
  } catch (error) {
    console.error("Error:", error);
  }
}

//create playlist
async function createPlaylist(playlistType, songsAdded) {
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
      await fetch("/playlist_songs/songs_added", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playlist_id: playlistId,
          songs_added: songsAdded,
        }),
      });
    }

    console.log("Playlist created successfully!");
  } catch (error) {
    console.error(error);
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
async function removeSongFromPlaylist(input) {
  try {
    await fetch(`/playlist_songs/${input}`, {
      method: "DELETE",
    });

    console.log("Song removed from playlist successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}
