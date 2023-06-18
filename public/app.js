// console.log("this is workin");

// var client_id = "cd7f7c4194ae475dbfaceb0b5962ccdf";
// var redirect_uri = "https://playlist-web-server.onrender.com/";

// const express = require("express");
// var app = express();

// app.get("/login", function (req, res) {
//   //   var state = generateRandomString(16);
//   //   var scope = 'user-read-private user-read-email';

//   res.redirect(
//     "https://accounts.spotify.com/authorize?" +
//       querystring.stringify({
//         response_type: "code",
//         client_id: client_id,
//         scope: scope,
//         redirect_uri: redirect_uri,
//         state: state,
//       })
//   );
// });

// window.onSpotifyWebPlaybackSDKReady = () => {
//     const token = '[My access token]';
//     const player = new Spotify.Player({
//         name: 'Web Playback SDK Quick Start Player',
//         getOAuthToken: cb => { cb(token); },
//         volume: 0.5
//     });

//     // Ready
//     player.addListener('ready', ({ device_id }) => {
//         console.log('Ready with Device ID', device_id);
//     });

//     // Not Ready
//     player.addListener('not_ready', ({ device_id }) => {
//         console.log('Device ID has gone offline', device_id);
//     });

//     player.addListener('initialization_error', ({ message }) => {
//         console.error(message);
//     });

//     player.addListener('authentication_error', ({ message }) => {
//         console.error(message);
//     });

//     player.addListener('account_error', ({ message }) => {
//         console.error(message);
//     });

//     document.getElementById('togglePlay').onclick = function() {
//       player.togglePlay();
//     };

//     player.connect();
// }

// start by gaining access to spotify?
// async function fetchWebApi() {
//   const res = await fetch(`https://api.spotify.com/authorize`);
//   const data = await res.json();
//   console.log(data);
// }

// `https://api.spotify.com/${endpoint}`
