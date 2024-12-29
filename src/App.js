import './App.css';
import React, {useState} from 'react';
import SearchBar from './SearchBar';
import TrackList from './Tracklist';
import mockData from './mockData.json';
import Playlist from './Playlist';

function App() {

  // State for search results (mock data)
  const [searchResults, setSearchResult] = useState(mockData);

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
  function playlistFile() {
    const playlistFile = selectedTracks.map(track => track.uri);
    setSelectedTracks([]);
  };


  return (
    <div className="container">
      <header className="header">
        <h1>Jammming</h1>
      </header>
      <div>
        <SearchBar />
      </div>
      <div className='inline'>
        <div className='hh'>
          <h2 className='h1'>Search Results</h2>
          <TrackList tracks={searchResults} onAdd={addTrack} />
        </div>
        <div className='hh'>
          <h2 className='h1'>Personal Playlist</h2>
          <Playlist onNameChange={updatePlaylistName} />
          <TrackList tracks={selectedTracks} onRemove={removeTrack} />
          <button onClick={playlistFile} className='button'>Save Playlist</button>
        </div>
      </div>
    </div>
  );
}

export default App;
