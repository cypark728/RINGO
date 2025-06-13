import ReactDOM from "react-dom/client";
import React from "react";
import "./LectureInfo.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Category from "../../components/Category/Category";
import SearchBar from "./SearchBar/SearchBar";


function LectureInfo() {

    return (
        <div className="LectureInfo-container">
            <SearchBar/>
            <Category/>

        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Header/>
        <LectureInfo />
        <Footer/>
    </>

);