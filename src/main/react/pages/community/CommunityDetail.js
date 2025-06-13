import React, { useState, useRef, useEffect } from "react";
import '../first.css';
import "./CommunityDetail.css";
import ReactDOM from "react-dom/client";
import MyHeader from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const categories = ["자유", "질문", "홍보"];

// ul/li로 만든 커스텀 셀렉트 박스 컴포넌트

function CommunityDetail() {


    return (
        <div>
            <p>집 가기 10분전</p>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <MyHeader/>
        <CommunityDetail/>
        <Footer/>
    </>
);
