// `https://api.spotify.com/${endpoint}`

console.log("this is workin");

//getting access to the token from the cookie
function getTokenFromCookie() {
  const accessCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("access_token="));

  if (accessCookie) {
    return accessCookie.split("=")[1];
  }
  return null;
}

//search button
const searchBtn = document.querySelector("#submit");
searchBtn.addEventListener("click", async () => {
  const searchTarget = document.querySelector("input").value;
  const accessToken = getTokenFromCookie();

  if (!accessToken) {
    console.error("Access Token Not Found");
    return;
  }

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${searchTarget}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

//authorize user make request to server to autheticate user
// async function authorizeUser() {
//   try {
//     const response = await fetch("/callback");
//     const data = await response.json();

//     //get access token from response
//     const accessToken = data.access_token;

//     console.log("Access Token:", accessToken);
//   } catch (err) {
//     console.error("Authorization error", err);
//     res.status(500).send("Internal Server Error");
//   }
// }

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
