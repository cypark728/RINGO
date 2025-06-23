import ReactDOM from "react-dom/client";
import React, {useEffect, useState} from "react";
import "./LectureInfo.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const services = [
    {
        img: "/img/makeBlogThumbnail.png",
        title: "내 블로그가 핫한 브랜드가 되다! 블로그 제작",
        rating: "4.8",
        reviews: "158",
        price: "1,123,123원~",
        provider: "중앙개발원",
    },
    {
        img: "/img/animationThumbnail.png",
        title: "Quick 애니메이션 모션 그래픽!",
        rating: "4.8",
        reviews: "158",
        price: "1,123,123원~",
        provider: "중앙개발원",
    },
    {
        img: "/img/thumbnail.png",
        title: "이거는 사진이 도대체 뭔지 모르겠다!",
        rating: "4.8",
        reviews: "158",
        price: "1,123,123원~",
        provider: "중앙개발원",
    },
    {
        img: "/img/Ga4Thumbnail.png",
        title: "GoogleGA4설치! 이정도는 혼자 할줄 알아야겠죠?",
        rating: "4.8",
        reviews: "158",
        price: "1,123,123원~",
        provider: "중앙개발원",
    },
    {
        img: "/img/makeBlogThumbnail.png",
        title: "내 블로그가 핫한 브랜드가 되다! 블로그 제작",
        rating: "4.8",
        reviews: "158",
        price: "1,123,123원~",
        provider: "중앙개발원",
    },
];

const categories = [
    { label: "디자인", filename: "design"},
    { label: "IT•프로그래밍", filename: "programming"},
    { label: "영상•사진", filename: "photo"},
    { label: "마케팅", filename: "marketing"},
    { label: "주식•코인", filename: "invest"},
    { label: "문서•글쓰기", filename: "document"},
    { label: "세무•법인•노무", filename: "tax"},
    { label: "창업•사업", filename: "business"},
    { label: "전체보기", filename: "all"}
]



function LectureInfo() {

    const [lectures, setLectures] = useState([]);

    const fetchLectures = async (category, keyword) => {
        const params = new URLSearchParams();
        params.append("category", category);
        if (keyword && keyword.trim() !== "") {
            params.append("search", keyword.trim());
        }

        const response = await fetch(`/lecture/getLectures?${params.toString()}`);
        setLectures(await response.json());

    };

    useEffect(() => {
        fetchLectures();
    }, []);

    return (
        <div className="LectureInfo-container">
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

            <div className="categories">
                {categories.map((cat, i) => (
                    <div className="category">
                        <img src={`/img/${cat.filename}.png`}
                             alt={cat.label}
                             data-category={cat.filename}
                        />
                        <span key={i} className="category">{cat.label}</span>
                    </div>
                ))}
            </div>

            <div className="lectures-cards" >
                {lectures.map((lecture, idx) => (
                    <div className="service-card"
                         key={idx}
                         onClick={() => window.location.href = `/lecture/lecturedetail?lectureId=${lecture.recruitmentPostId}`}
                    >
                        {/*사진 수정해야 함*/}
                        <img src="/img/makeBlogThumbnail.png" alt={lecture.recruitmentPostTitle} />
                        <div className="service-title">{lecture.recruitmentPostTitle}</div>
                        <div className="service-info">
                            {/*리뷰 관련 만들고 가져오기 만들어야 할듯.*/}
                            <span className="service-rating">★ 4.8</span>
                            {/*<span className="service-rating">★ {lecture.rating}</span>*/}
                            <span className="service-count"> | (158)</span>
                            {/*<span className="service-count"> | ({lecture.reviews})</span>*/}
                        </div>
                        <div className="service-meta">
                            <span className="service-price">{lecture.recruitmentPostPrice}원</span>
                            {/*강의 제공하는 고수 가져와야함*/}
                            {/*<span className="service-provider">{lecture.provider}</span>*/}
                        </div>
                    </div>
                ))}
            </div>
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