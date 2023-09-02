import React, { useEffect, useState } from 'react';
import { loginWithSpotify, getAccessTokenFromUrl, setAccessToken, getTopTracks } from './spotify';
import './topsongs.css'; // Import CSS for styling

const TopSongs = () => {
  const [tracks, setTracks] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = getAccessTokenFromUrl();
    if (token) {
      setAccessToken(token);
      getTopSongs();
      setLoggedIn(true);
    }
  }, []);

  const getTopSongs = async () => {
    const topTracks = await getTopTracks('short_term', 12); // Update to top 12 songs
    setTracks(topTracks);
  };

  return (
    <div className="container">
      <h1 className="title">Your Top Songs of the Month</h1>
      {!loggedIn && (
        <div className="button-container">
          <button className="spotify-button" onClick={loginWithSpotify}>
            Log in with Spotify
          </button>
        </div>
      )}
      {tracks.length > 0 && (
        <div className="pinterest-grid">
          {tracks.map((track) => (
            <div className="pinterest-item" key={track.id}>
              <img className="track-image" src={track.album.images[0].url} alt={track.name} />
              <p className="track-name">{track.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default TopSongs;
