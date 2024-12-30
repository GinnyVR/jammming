import React from "react";
import plusIcon from './resources/plus.png'
import minusIcon from './resources/minus-sign.png'
import styles from "./SearchBar.module.css";


export default function TrackList({ tracks, onAdd, onRemove, preview }) {
    
    return (
        
        <div>
            {tracks.map((track) => (
                <div key={track.id} track={track} className={styles.container2}>
                    <div className={styles.info}>
                        <h3>{track.name}</h3>
                        <p>Artist: {track.artist}</p>
                        <p>Album: {track.album}</p>
                        
                        {preview && (
                        <audio
                        id={track.id}
                        src={track.preview_url}
                        controls
                        onPlay={() => preview(track)}
                        ></audio>)}
                        
                    </div>
                    <div>
                        {/* Show Add button if onAdd prop exists */}
                        {onAdd && (
                        <button className={styles.button} onClick={() => onAdd(track)}>
                            <img src={plusIcon} className={styles.image}></img>
                        </button>
                        )}
                        {onRemove && (
                        <button className={styles.button} onClick={() => onRemove(track)}>
                            <img src={minusIcon} className={styles.image}></img>
                        </button>
                    )}
                    </div>
                </div>
            ))}
        </div>


        
    )
}
