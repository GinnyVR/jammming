import React, {useState, useEffect} from "react";

//To get access token

const client_id = '';
const redirect_uri = '';

//saved generated state to browsers localstorage (security)

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// Define a key for the state in localStorage
var stateKey = 'spotify_auth_state';
// Generate a random state string
let state = generateRandomString(16);
// Store the state in localStorage
//localStorage.setItem(stateKey, state);

//
var scope = 'user-read-private user-read-email';

//Build the URL
var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);



//Response from spotify
//https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123


