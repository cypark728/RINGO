import React from "react";
import "./Hero.css";

const heroCategories = ["블로그", "PPT", "코딩", "로고 디자인", "PPT", "코딩", "로고 디자인"];

function Hero() {

    return(
        <section className="hero-section">
            <div>
                <p className="sub-heading">지금 인기 있는 고수</p>
                <h1 className="main-heading">
                    더 나은 내일을 위한 선택,<br />지금
                    <span className="highlight-text"> 연결</span>하세요
                </h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="원하는 서비스를 검색해보세요"
                        className="search-input"
                    />
                    <img className="search-button" src="/img/search.png" alt="검색"/>
                </div>
                <div className="hero-categories">
                    {heroCategories.map((cat, i) => (
                        <span key={i} className="category">{cat}</span>
                    ))}
                </div>
            </div>
            <img src="/img/hero.png" alt="영웅이미지"/>
        </section>
    )
}

export default Hero;