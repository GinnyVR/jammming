import React from "react";
import minusIcon from './resources/minus-sign.png'
import styles from "./SearchBar.module.css";


export default function Playlist({ tracks, onAdd, isReadonly = false }) {
    
    return (
        
        <div>
            {tracks.map((track) => (
                <div key={track.id} className={styles.container2}>
                    <div className={styles.info}>
                        <h3>{track.name}</h3>
                        <p>Artist: {track.artist}</p>
                        <p>Album: {track.album}</p>
                    </div>
                    <div>
                        {!isReadonly && (
                        <button className={styles.button} onClick={() => onAdd(track)}>Add to List</button>
                        )}
                    </div>
                </div>
            ))}
        </div>

    )
}
