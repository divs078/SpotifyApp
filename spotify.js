import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/'; // Update with your actual redirect URI
const clientId = '78749ec1a37c4406bf3d96988fcd40bc'; // Update with your actual client ID

// Set access token in the Spotify API wrapper
export const setAccessToken = (token) => {
  spotifyApi.setAccessToken(token);
};

// Retrieve access token from the URL hash
export const getAccessTokenFromUrl = () => {
  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      if (item) {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});

  window.location.hash = '';

  return hash.access_token;
};

// Redirect the user to Spotify's authentication page
export const loginWithSpotify = () => {
  const scopes = ['user-top-read'];
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    '%20'
  )}&response_type=token&show_dialog=true`;
};

// Fetch the user's top tracks
export const getTopTracks = async (timeRange = 'short_term', limit = 20) => {
  try {
    const response = await spotifyApi.getMyTopTracks({
      limit: limit,
      time_range: timeRange,
    });
    return response.items;
  } catch (error) {
    console.error('Error fetching top tracks:', error);
  }
};