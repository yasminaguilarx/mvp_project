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
    searchResults(data, input);
  } catch (err) {
    console.error("No result found", err);
  }
}

async function searchResults(data, searchInput) {
  try {
    const response = await fetch("/all_data");
    data = await response.json();

    const lowered = searchInput.toLowerCase();
    const filteredData = data.filter((item) => {
      if (item.type === "genre") {
        return item.playlist_genre.toLowerCase().includes(lowered);
      } else if (item.type === "playlist") {
        return item.playlist_songs.toLowerCase().includes(lowered);
      } else if (item.type === "artist") {
        return item.music_search.toLowerCase().includes(lowered);
      } else {
        return false;
      }
    });

    const cardsContainer = document.querySelector("#cardsContainer");
    cardsContainer.innerHTML = "";

    for (let i = 0; i < filteredData.length; i++) {
      const elem = filteredData[i];

      cardsContainer.appendChild(createCard(elem));
    }
  } catch (err) {
    console.error(err);
  }
}

// create cards
function createCard(elem) {
  const cardCtn = document.querySelector("#defaultCardContainer");
  const cardsContainer = document.querySelector("#cardsContainer");
  while (cardCtn.firstChild) {
    cardCtn.removeChild(cardCtn.firstChild);
  }

  const card = document.createElement("div");
  card.classList.add("card");

  // Create the card image
  const cardImage = document.createElement("img");
  cardImage.src =
    "./images/1871847_band_music_social media_songs_radio_icon.png";
  cardImage.classList.add("card-image");
  card.appendChild(cardImage);

  // Create the card title
  const cardTitle = document.createElement("h3");
  cardTitle.textContent = elem;
  cardTitle.classList.add("card-title");
  card.appendChild(cardTitle);

  //create save button
  const cardButton = document.createElement("button");
  cardButton.textContent = "Save to Playlist";
  cardButton.classList.add("card-button");
  cardButton.addEventListener("click", (e) => {
    saveToPlaylist(e.target.value);
  });
  card.appendChild(cardButton);
  cardCtn.appendChild(card);
  cardsContainer.appendChild(cardCtn);

  return cardsContainer;
}

// async function fetchedData(obj) {
// const response = await fetch(`${obj}/all_data`);
// const data = await response.json();
// return data;
// //then you'll call and await this function in your search results
// }

// if (!data || data.length === 0) {
//   defaultCardContainer.textContent = "No result found";
//   return;
// }

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

// //create playlist
// async function createPlaylist(playlistType, songsAdded) {
//   try {
//     // Create playlist_info entry
//     const playlistInfoResponse = await fetch("/playlist_info", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ playlist_type: playlistType }),
//     });
//     const playlistInfoData = await playlistInfoResponse.json();

//     const playlistId = playlistInfoData[0].playlist_id;

//     // Add songs to playlist_songs table
//     for (const songId of songIds) {
//       await fetch("/playlist_songs/songs_added", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           playlist_id: playlistId,
//           songs_added: songsAdded,
//         }),
//       });
//     }

//     console.log("Playlist created successfully!");
//   } catch (error) {
//     console.error(error);
//   }
// }

// // //update playlist
// async function updatePlaylist(playlistId, playlistType) {
//   try {
//     await fetch(`/playlist_info/${playlistId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ playlist_type: playlistType }),
//     });

//     console.log("Playlist updated successfully!");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// //delete playlist
// async function deletePlaylist(playlistId) {
//   try {
//     // Delete playlist_songs entries
//     await fetch(`/playlist_songs/${playlistId}`, {
//       method: "DELETE",
//     });

//     // Delete playlist_info entry
//     await fetch(`/playlist_info/${playlistId}`, {
//       method: "DELETE",
//     });

//     console.log("Playlist deleted successfully!");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// //delete songs from playlist
// async function removeSongFromPlaylist(input) {
//   try {
//     await fetch(`/playlist_songs/${input}`, {
//       method: "DELETE",
//     });

//     console.log("Song removed from playlist successfully!");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
