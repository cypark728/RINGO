import ReactDOM from "react-dom/client";
import React from "react";
import "./LectureInfo.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Category from "../../components/Category/Category";
import SearchBar from "./SearchBar/SearchBar";
import Lectures from "./Lectures/Lectures";


function LectureInfo() {



    return (
        <div className="LectureInfo-container">
            <SearchBar/>
            <Category/>
            <Lectures/>
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