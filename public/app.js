//search button

window.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const inputSearch = searchBar.value;
      await search(inputSearch);
    }
  });

  // const homeButton = document.getElementById("#homebtn");
  // homeButton.addEventListener("click", async (e) => {
  //   const backToHomePage = e.target;

  // });
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
    console.error("No Result Found", err);
  }
}

async function searchResults(data, input) {
  try {
    // const response = await fetch("/all_data");
    const searchInput = input.toLowerCase();
    const filteredCardData = [];

    data.forEach((item) => {
      const lowercaseGenre = item.playlist_genre.toLowerCase();
      const lowercaseSongs = item.playlist_songs.toLowerCase();
      const lowercaseSearch = item.music_search.toLowerCase();

      if (
        lowercaseGenre.includes(searchInput) ||
        lowercaseSongs.includes(searchInput) ||
        lowercaseSearch.includes(searchInput)
      ) {
        filteredCardData.push(item);
      }
    });

    for (let elem of filteredCardData) {
      const newCard = createCard(elem, searchInput);
      const defaultCardContainer = document.querySelector(
        "#defaultCardContainer"
      );
      defaultCardContainer.appendChild(newCard);

      const cardsContainer = document.querySelector("#cardsContainer");
      cardsContainer.appendChild(defaultCardContainer);
    }
  } catch (err) {
    console.error("Unable To Populate Search Results", err);
  }
}

// create cards
function createCard(elem, searchInput) {
  const cardCtn = document.querySelector("#defaultCardContainer");
  cardCtn.innerHTML = "";

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
  cardTitle.textContent = searchInput;
  cardTitle.classList.add("card-title");
  card.appendChild(cardTitle);

  //create save button
  const cardButton = document.createElement("button");
  const saveBtn = document.createElement("img");
  saveBtn.classList.add("saveBtnImg");
  saveBtn.src = "./images/8666749_plus_add_icon.png";
  cardButton.appendChild(saveBtn);
  cardButton.classList.add("card-button");
  cardButton.addEventListener("click", (e) => {
    saveToPlaylist(e.target.value);
  });
  card.appendChild(cardButton);

  return card;
}

function saveToPlaylist(value) {
  const playlistName = prompt("Enter playlist name:");

  if (!playlistName) {
    alert("Playlist name is required.");
    return;
  }

  const playlist = {
    name: playlistName,
    values: [value],
  };

  fetch(`/all_data/playlist_songs/${value}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlist),
  })
    .then((response) => {
      if (response.ok) {
        alert(
          `Saved '${playlist.values.name}' to playlist '${playlist.name.playlistName}' successfully!`
        );
      } else {
        console.error("Failed To Save The Playlist.");
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
