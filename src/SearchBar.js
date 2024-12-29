import React from "react";
import searchIcon from './resources/search.png'
import styles from './SearchBar.module.css'
import mockData from './components/mockData.json';

export default function SearchBar() {

    


    return (
        <div className={styles.container}>

            <input className={styles.inputStyle} type="text" placeholder="Search title of song..."></input>

            <button className={styles.button} type="submit">
                <img className={styles.image} src={searchIcon} alt="Search button" />
            </button>
        </div>
    )
}