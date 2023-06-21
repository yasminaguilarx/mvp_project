console.log("this is workin");

//search button
const searchBtn = document.querySelector("#submit");
searchBtn.addEventListener("click", async () => {
  const searchBar = document.querySelector("input[id=searchBar]").value;
  await search(searchBar);
});

//get playlist
async function search(input) {
  try {
    const response = await fetch("/database/music_search");
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
    li.textContent = `${item.song_artist}`;
    ul.appendChild(li);
  });
  resultsContainer.appendChild(ul);
}

//get one playlist

//create playlist
//update playlist
//delete playlist

//get genres

//get user profile
//get user playlists (follow playlist)
//get user likes (get users top items?)

//get music search (in search section)
