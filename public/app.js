// `https://api.spotify.com/${endpoint}`

console.log("this is workin");

//search button
const searchBtn = document.querySelector("#submit");
searchBtn.addEventListener("click", async () => {
  const searchBar = document.querySelector("input[id=searchBar]").value;
  try {
    const token = await accessToken();
    await musicSearch(searchBar, token);
  } catch (err) {
    console.error(err);
  }
});

//pulling access token from server side to client side
async function accessToken() {
  try {
    const response = await fetch("/api/token");
    if (response.ok) {
      const data = await response.json();
      return data.access_token;
    } else {
      throw new Error("Failed To Fetch Access Token");
    }
  } catch (err) {
    console.error(err);
  }
}

async function musicSearch(input, token) {
  try {
    const result = await fetch(`https://api.spotify.com/v1/search?q=${input}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    if (result.ok) {
      const data = await result.json();
      console.log(data);
    } else {
      throw new Error("Failed To Fetch Search Results");
    }
  } catch (err) {
    console.error(err);
  }
}

//get playlist
//update playlist
//create playlist
//delete playlist

//get genres

//get user profile
//get user playlists (follow playlist)
//get user likes (get users top items?)

//get music search (in search section)
