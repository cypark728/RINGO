import React from "react";
import './SearchBar.css';

function SearchBar() {

    return(
        <section className="search-bar-section">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="원하는 서비스를 검색해보세요"
                    className="search-input"
                />
                <img className="search-button" src="/img/search.png" alt="검색"/>
            </div>
        </section>
    );
}

export default SearchBar;