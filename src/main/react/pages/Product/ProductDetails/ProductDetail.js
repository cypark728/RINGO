import React, {useEffect, useState} from 'react';
import './ProductDetail.css';
import ReactDOM from "react-dom/client";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import ProductDetailTop from "./ProductDetailTop/ProductDetailTop";
import ProductDetailBottomSideBar from "./ProductDetailBottomSideBar/ProductDetailBottomSideBar";
import ProductDetailContent from "./ProductDetailContent/ProductDetailContent";
import ProductDetailReview from "./ProductDetailReview/ProductDetailReview";
import MyClass from "../../MyPage/Gosu/MyClass/MyClass";
import ProductDetailOtherClass from "./ProductDetailOtherClass/ProductDetailOtherClass";



function ProductDetail() {
    const [activeTab, setActiveTab] = useState("home");
    const [lecture, setLecture] = useState([]);

    const getQueryParam = (param) => {
        return new URLSearchParams(window.location.search).get(param);
    }

    const lectureId = getQueryParam("lectureId");

    // const fetchGetOneLecture = async (lectureId) => {
    //     const params = new URLSearchParams();
    //     params.append("recruitmentPostId", lectureId);
    //
    //     const response = await fetch(`/lecture/getOneLecture?${params.toString()}`);
    //     // setLecture(await response.json());
    //     console.log(await response.json());
    // }
    //
    // useEffect(() => {
    //     fetchGetOneLecture(lectureId);
    // }, []);

    return (
        <>
            <ProductDetailTop />

            {/*<div className="topBox">*/}
            {/*    <div className="leftTop">*/}
            {/*        <div className="categoryName">카테고리</div>*/}
            {/*        <div className="titleName">제목제목제목제목제목제목제목제목제목제목제목제목</div>*/}
            {/*        <div className="scoreName">평점</div>*/}
            {/*        <div className="gosuProfile">*/}
            {/*            <div><img src={"/img/screen1.jpg"} alt="프로필이미지" /></div>*/}
            {/*            <div>*/}
            {/*                <div>프로필이름</div>*/}
            {/*                <div>응답가능시간</div>*/}
            {/*            </div>*/}
            {/*            <div>문의하기</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="sizeCheck">
                <div className="middleMenu">
                    <div onClick={() => setActiveTab("content")}>서비스 설명</div>
                    <div onClick={() => setActiveTab("review") }>리뷰</div>
                </div>
                <div className="downContent">
                    <div className="leftBottom">

                    {/*<div className="leftBottom">*/}
                    {/*    /!*여기 root 들어가고 서비스랑 리뷰 둘이 왔다갔다 하게*!/*/}
                    {/*    <div className="leftService">서비스 설명</div>*/}
                    {/*    <div>리뷰</div>*/}
                    {/*</div>*/}


                        {activeTab === "home" &&
                            <>
                            <ProductDetailContent />
                                <div className="betweenSpace"></div>
                            <ProductDetailReview />
                            </>
                        }
                        {activeTab === "content" &&
                            <ProductDetailContent />
                        }
                        {activeTab === "review" &&
                            <ProductDetailReview />
                        }

                    </div>
                    <ProductDetailBottomSideBar />

                    {/*<div className="rightBottom">*/}
                    {/*    <p>수업 타이틀</p>*/}
                    {/*    <div>*/}
                    {/*        <span>8,000원</span>*/}
                    {/*        <span>1시간 당</span>*/}
                    {/*    </div>*/}

                    {/*    <div>*/}
                    {/*        <span>2시간</span>*/}
                    {/*        <span>주 1회</span>*/}
                    {/*    </div>*/}


                    {/*    <div>*/}
                    {/*        <span>상담 가능 시간</span>*/}
                    {/*        <span>9시~18시</span>*/}
                    {/*    </div>*/}

                    {/*    <div>*/}
                    {/*        <span>평균 응답 시간</span>*/}
                    {/*        <span>10분 이내</span>*/}
                    {/*    </div>*/}


                    {/*    <div>상담신청하기</div>*/}
                    {/*</div>*/}
                </div>
            </div>

            <div className="otherClassBox">
                <ProductDetailOtherClass />

            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Header />
        <ProductDetail />
        <Footer />
    </>
);