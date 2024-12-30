import React, {useState} from "react";
import searchIcon from './resources/search.png'
import styles from './SearchBar.module.css'


function SearchBar({onSearch}) {


    const [term, setTerm] = useState('');

    const handleSearch = () => {
        if(term) {
            onSearch(term)
        }
    }    

    const handleChange = (e) => {
        setTerm(e.target.value);
      };

    return (
        <div className={styles.container}>

            <input 
                className={styles.inputStyle}
                type="text" 
                placeholder="Search title of song..."
                onChange={handleChange}
            />
            
            <button 
            className={styles.button} 
            type="submit" 
            onClick={handleSearch} alt="Search">
                <img className={styles.image} src={searchIcon} alt="Search button" />
            </button>
        </div>
    )
}

export default SearchBar;