import './App.css';
import React, {useState, useCallback} from 'react';
import SearchBar from './SearchBar';
import TrackList from './Tracklist';
import Playlist from './Playlist';
import Spotify from './spotify';

function App() {

  // State for search results (mock data)
  const [searchResults, setSearchResults] = useState([]);

  // State for the new list (e.g., selected tracks)
  const [selectedTracks, setSelectedTracks] = useState([]);

  //State to manage playlist name
  const [playlistName, setPlaylistName] = useState('My Playlist');

  // Add track to the selected list
  const addTrack = (track) => {

    if (!selectedTracks.some((t) => t.id === track.id)) {
      setSelectedTracks([...selectedTracks, track]);
    }
  }

  //Funciton to remove tracks from playlist
  const removeTrack= (track) => {
    setSelectedTracks((prevTracks) => prevTracks.filter((t) => t.id !== track.id));
  };
  
  // Function to update the playlist name
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  //Function to save a playlist
  const savePlaylist = useCallback(() => {
    const trackUris = selectedTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setSelectedTracks([]);
    });
  }, [playlistName, selectedTracks]);

  // API search 
  const search = (term) => {
    Spotify.search(term).then(setSearchResults);
    console.log({searchResults})
  };

  console.log(searchResults);
  //Function to display preview sample
  const preview = (track) => {
    console.log(`Previewing track: ${track.name}, id: ${track.id}`);
    const audioElement = document.getElementById(track.id);
   
    // Toggle play/pause for the selected track
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Jammming</h1>
      </header>
      <div>
        <SearchBar onSearch={search} />
      </div>
      <div className='inline'>
        <div className='hh'>
          <h2 className='h1'>Search Results</h2>
          <TrackList tracks={searchResults} onAdd={addTrack} preview={preview} />
        </div>
        <div className='hh'>
          <h2 className='h1'>Personal Playlist</h2>
          <Playlist onNameChange={updatePlaylistName} />
          <TrackList tracks={selectedTracks} onRemove={removeTrack} />
          <button onClick={savePlaylist} className='button'>Save Playlist</button>
        </div>
      </div>
    </div>
  );
}

export default App;
