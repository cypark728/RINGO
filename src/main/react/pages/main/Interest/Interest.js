import React, { useState, useEffect } from "react";
import "./Interest.css";

const categories = [
    { num: "01", text: "디자인" },
    { num: "02", text: "프로그래밍" },
    { num: "03", text: "마케팅" },
];

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
];

function InterestsSection() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [loginUser, setLoginUser] = useState(null);

    useEffect(() => {
        // 서버에서 유저 정보 받아오기
        fetch("/users/api/user/info", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                if (data.success && data.user) {
                    setLoginUser(data.user);
                } else {
                    setLoginUser(null);
                }
            })
            .catch(() => setLoginUser(null));
    }, []);



    return (
        <div className="interests-section">
            <div className="interests-grid">
                {/* 왼쪽: 관심분야 카테고리 */}
                <div className="interests-categories">
                    <div className="interests-title">
                        <span className="circle">
                            {loginUser && loginUser.userName ? loginUser.userName : '●●●'}
                        </span>
                        님의<br />
                        관심분야 입니다.
                    </div>
                    <div className="interests-desc">
                        관심분야를 선택하여서 고숨 추천해주는 공고를 찾아드리고,
                        맞춤 서비스로 다양한 소식을 보여드릴게요!
                    </div>
                    <ul className="interests-list">
                        {categories.map((cat, idx) => (
                            <li
                                key={cat.num}
                                className={activeIdx === idx ? "active" : ""}
                                onClick={() => setActiveIdx(idx)}
                            >
                                <span className="num">{cat.num}</span>
                                <span className="text">{cat.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* 오른쪽: 서비스 카드 2x2 */}
                <div className="interests-cards">
                    {services.map((service, idx) => (
                        <div className="service-card"
                             key={idx}
                             onClick={() => window.location.href = "/lecture/lecturedetail"}
                        >
                            <img src={service.img} alt={service.title} />
                            <div className="service-title">{service.title}</div>
                            <div className="service-info">
                                <span className="service-rating">★ {service.rating}</span>
                                <span className="service-count"> | ({service.reviews})</span>
                            </div>
                            <div className="service-meta">
                                <span className="service-price">{service.price}</span>
                                <span className="service-provider">{service.provider}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default InterestsSection;
