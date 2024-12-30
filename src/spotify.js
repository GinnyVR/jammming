import React, {useEffect} from "react";
const clientId = '92da12443dfa4a73a62b3b6dcaa94555'; // Insert client ID here.
const redirectUri = 'http://localhost:3000/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;
let tokenExpirationTime; // Variable to store the exact expiration timestamp


const Spotify = { //Spotify is an object with methods
  getAccessToken() { //method to get access token
    // Check if token is available and valid
    if (accessToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
        return accessToken; // Return valid token
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    //Explanation: 
        //window.location.href: This retrieves the full URL of the current webpage, including the query string and fragment (if present).

    //Regular Expressions (/access_token=([^&]*)/ and /expires_in=([^&]*)/):
        //These patterns are used to search for specific parameters in the URL.
        //access_token=([^&]*):
            //Looks for a parameter named access_token followed by an = sign. Captures everything after = until it encounters an & (or the end of the string).
        //expires_in=([^&]*):
            //Similar to the above, but searches for the expires_in parameter.
    
    if (accessTokenMatch && expiresInMatch) { //Ensures both accessTokenMatch and expiresInMatch contain valid matches (i.e., the URL contains access_token and expires_in parameters). If either is null, the code inside the block does not execute.
      accessToken = accessTokenMatch[1]; //Assigns the actual value of the access_token parameter (captured by the regular expression) to the accessToken variable.
      const expiresIn = Number(expiresInMatch[1]); //Converts the value of the expires_in parameter to a number (interpreted as seconds until the token expires).
      window.setTimeout(() => accessToken = '', expiresIn * 1000); //Handles expiration: Sets a timeout to clear the token after the given duration.
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires. Reason: This improves security and usability by ensuring sensitive data (like the token) is not visible in the URL after it's been processed.
      console.log("URL after clearing parameters:", window.location.href); // Debugging
      return accessToken;
    } else { //Redirects for authorization: If no token is found, redirects the user to Spotify's authorization page.
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }

  },

  
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      } //Fetches tracks: Sends a GET request to Spotify's search endpoint using the provided search term.
    }).then(response => {
      return response.json(); //Fetches tracks: Sends a GET request to Spotify's search endpoint using the provided search term.
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({ //Maps track data: Transforms the track information into a structured array of objects (id, name, artist, album, and uri).
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        preview_url: track.preview_url
      }));
    })
    .catch((error) => {
        console.error("Error searching Spotify:", error);
    });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) { //If name is falsy (e.g., null or an empty string) or trackUris is an empty array, the method logs an error and exits early without executing further.
        console.error("Playlist name or tracks missing");
      return;
    }
    localStorage.setItem('playlistName', name);
    localStorage.setItem('trackUris', JSON.stringify(trackUris));

    const accessToken = Spotify.getAccessToken(); //Retrieves an access token from a Spotify object, which is required to authenticate API requests.
    const headers = { Authorization: `Bearer ${accessToken}` }; //Constructs an HTTP header with the Authorization field, containing the token (Bearer access_token), needed for authentication with Spotify's Web API.
    let userId;  //Gets user ID: Fetches the current user's Spotify ID using the access token.

    return fetch('https://api.spotify.com/v1/me', {headers: headers} //Makes a GET request to the Spotify API endpoint /v1/me to retrieve the current user's Spotify profile data.
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;  //The user's Spotify ID is extracted from the JSON response (jsonResponse.id) and stored in the userId variable.
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {  //Makes a POST request to the /v1/users/{user_id}/playlists endpoint to create a new playlist for the user.
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})  //The request body includes the name parameter (the name of the playlist) as JSON.
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id; //The playlist ID of the newly created playlist is extracted from the response (jsonResponse.id) and stored in the playlistId variable.
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, { //Makes another POST request to the /v1/users/{user_id}/playlists/{playlist_id}/tracks endpoint to add tracks to the newly created playlist.
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris}) //The request body includes the array of trackUris as JSON ({uris: trackUris}).
        }).then(() => {
            // Clear localStorage after successful save
            localStorage.removeItem('playlistName');
            localStorage.removeItem('trackUris');
        })
      });
    });
  }
};

export default Spotify;