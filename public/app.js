console.log("this is workin");

// window.addEventListener("DOMContentLoaded", () => {
//   showDefaultCards();
// });

document.addEventListener("DOMContentLoaded", function () {
  // Add code to show default cards when the page loads
  document.getElementById("search").addEventListener("input", handleSearch);

  // Add event listener for search or playlist creation
  document.getElementById("search").addEventListener("input", handleSearch);
  document
    .getElementById("createPlaylist")
    .addEventListener("click", handlePlaylistCreation);

  showDefaultCards();
});

function showDefaultCards() {
  const artistCard = document.getElementById("artistCard");
  artistCard.style.display = "none";

  var defaultCardContainer = document.getElementById("defaultCardContainer");
  var defaultCard = document.createElement("div");
  defaultCard.classList.add("card");
  defaultCard.textContent = "Default Card Content";
  defaultCardContainer.appendChild(defaultCard);
}

function handleSearch(event) {
  var searchTerm = event.target.value;

  if (searchTerm !== "") {
    removeDefaultCards();
    // Perform the search and display the results
    performSearch(searchTerm);
  } else {
    // If the search term is empty, show the default cards again
    showDefaultCards();
  }
}

function handlePlaylistCreation(event) {
  removeDefaultCards();

  createPlaylist();
}

function removeDefaultCards() {
  var defaultCardContainer = document.getElementById("defaultCardContainer");
  while (defaultCardContainer.firstChild) {
    defaultCardContainer.removeChild(defaultCardContainer.firstChild);
  }
}

function displayDefaultCards() {
  const resultsContainer = document.querySelector("#resultsContainer");
  resultsContainer.innerHTML = "";

  const defaultData = [
    { type: "artist", name: "Artist 1", image: "image1.jpg" },
    { type: "song", name: "Song 1", image: "image2.jpg" },
    { type: "playlist", name: "Playlist 1", image: "image3.jpg" },
    // Add more default data as needed
  ];

  defaultData.forEach((item) => {
    const card = createCard(item);
    resultsContainer.appendChild(card);
  });
}

//search button
const searchBtn = document.querySelector("#submit");
searchBtn.addEventListener("click", async () => {
  const searchBar = document.querySelector("input[id=searchBar]").value;
  await search(searchBar);
});

//search functionality 'get'
async function search(input) {
  try {
    const response = await fetch(
      `https://playlist-web-server.onrender.com/music_search?q=${input}`,
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
    const card = createCard(item);
    ul.appendChild(card);
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

function handleSearch(event) {
  var searchTerm = event.target.value;

  if (searchTerm !== "") {
    removeDefaultCards();
    // Perform the search and display the results
    performSearch(searchTerm);
  } else {
    // If the search term is empty, show the default cards again
    showDefaultCards();
  }
}

//create card
function createCard(item) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardImage = document.createElement("img");
  cardImage.classList.add("card-image");
  cardImage.src = item.image;

  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = item.name;

  const cardType = document.createElement("p");
  cardType.classList.add("card-type");
  cardType.textContent = item.type;

  const cardButton = document.createElement("button");
  cardButton.classList.add("card-button");
  cardButton.textContent = "Save to Playlist";
  cardButton.addEventListener("click", () => {
    saveToPlaylist(item);
  });

  card.appendChild(cardImage);
  card.appendChild(cardTitle);
  card.appendChild(cardType);
  card.appendChild(cardButton);

  const resultsContainer = document.querySelector("#resultsContainer");
  resultsContainer.appendChild(card);

  displayDefaultCards();
}

// Save the search result to the playlist
function saveToPlaylist(result) {
  // Prompt the user for the playlist name
  const playlistName = prompt("Enter playlist name:");

  // Check if the playlist name is provided
  if (!playlistName) {
    console.log("Playlist name is required.");
    return;
  }

  // Create a playlist object
  const playlist = {
    name: playlistName,
    songs: [result],
  };

  // Send the playlist object to the server
  fetch("https://playlist-web-server.onrender.com/playlist_songs/songs_added", {
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
    const response = await fetch(
      `https://playlist-web-server.onrender.com/playlist_info/${genre}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    // Handle the response data
  } catch (error) {
    console.error("Error:", error);
  }
}

//create playlist
async function createPlaylist(playlistType, songIds) {
  try {
    // Create playlist_info entry
    const playlistInfoResponse = await fetch(
      "https://playlist-web-server.onrender.com/playlist_info",
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
      await fetch("https://playlist-web-server.onrender.com/playlist_songs", {
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
    await fetch(
      `https://playlist-web-server.onrender.com/playlist_info/${playlistId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlist_type: playlistType }),
      }
    );

    console.log("Playlist updated successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

//delete playlist
async function deletePlaylist(playlistId) {
  try {
    // Delete playlist_songs entries
    await fetch(
      `https://playlist-web-server.onrender.com/playlist_songs/${playlistId}`,
      {
        method: "DELETE",
      }
    );

    // Delete playlist_info entry
    await fetch(
      `https://playlist-web-server.onrender.com/playlist_info/${playlistId}`,
      {
        method: "DELETE",
      }
    );

    console.log("Playlist deleted successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}

//delete songs from playlist
async function removeSongFromPlaylist(playlistId, songId) {
  try {
    await fetch(
      `https://playlist-web-server.onrender.com/playlist_songs/${playlistId}/${songId}`,
      {
        method: "DELETE",
      }
    );

    console.log("Song removed from playlist successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
}
