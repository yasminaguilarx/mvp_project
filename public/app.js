// `https://api.spotify.com/${endpoint}`

console.log("this is workin");

//client credentials flow
const apiControler = () => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const accessToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic" + btoa(client_id + ":" + client_secret),
      },
      body: "grant_type=client_credentials",
    });
    const data = await result.json();
    return data.access_token;
  };
};

//search button
const searchBtn = document.querySelector("#submit");
searchBtn.addEventListener("click", async (token) => {
  const searchTarget = document.querySelector("input").value;
  //   const accessToken = apiControler;

  //   if (!accessToken) {
  //     console.error("Access Token Not Found");
  //     return;
  //   }

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${searchTarget}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Search Request Failed");
    }

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Search Error", err);
  }
});

//use access token to continue to using paths and such
// async function utilizeToken() {
//   const response = await authorizeUser();
//   const { accessToken } = await response.json();
//   return accessToken;
// }

// async function searchRoute() {
//   const token = await utilizeToken();
//   const res = await fetch(`https://api.spotify.com/v1/search`);
//   const data = await res.json();
//   console.log(data);
// }

//get playlist
//update playlist
//create playlist
//delete playlist

//get genres

//get user profile
//get user playlists (follow playlist)
//get user likes (get users top items?)

//get music search (in search section)
