import React, {useState} from 'react';
import './ProductDetailTop.css';
import ReactDOM from "react-dom/client";
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import ProductDetail from "../ProductDetail";


export default function ProductDetailTop() {


    return (
        <>

            <div className="topBox">
                <div className="leftTop">
                    <div className="categoryName">카테고리</div>
                    <div className="titleName">제목제목제목제목제목제목제목제목제목제목제목제목</div>
                    <div className="scoreName">평점</div>
                    <div className="gosuProfile">
                        <div><img src={"/img/screen1.jpg"} alt="프로필이미지"/></div>
                        <div>
                            <div>프로필이름</div>
                            <div>응답가능시간</div>
                        </div>
                        <div>문의하기</div>
                    </div>
                </div>
                <div className="rightTop">유저 배너? 이미지?</div>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <ProductDetailTop />
    </>
);