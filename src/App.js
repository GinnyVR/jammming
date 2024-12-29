import './App.css';
import React, {useState} from 'react';
import SearchBar from './SearchBar';
import TrackList from './Tracklist';
import mockData from './mockData.json';

function App() {

  // State for search results (mock data)
  const [searchResults, setSearchResult] = useState(mockData);

  // State for the new list (e.g., selected tracks)
  const [selectedTracks, setSelectedTracks] = useState([]);

  // Add track to the selected list
  const addTrack = (track) => {

    if (!selectedTracks.some((t) => t.id === track.id)) {
      setSelectedTracks([...selectedTracks, track]);
    }
  }

  const removeTrack= (track) => {
    setSelectedTracks((prevTracks) => prevTracks.filter((t) => t.id !== track.id));
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
          <TrackList tracks={selectedTracks} onRemove={removeTrack} />
          <button className='button'>Save Playlist</button>
        </div>
      </div>
    </div>
  );
}

export default App;
