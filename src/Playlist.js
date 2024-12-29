import React from "react";
import minusIcon from './resources/minus-sign.png'
import styles from "./SearchBar.module.css";


export default function Playlist({ name, onNameChange}) {
    
    return (
        
        <div>
            <input className={styles.playlist}
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Enter playlist name"
            />
        </div>

    )
}
