import React from "react";
import "./Lectures.css";

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

function Lectures() {

    return(
        <div className="lectures-cards" >
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
    );
}

export default Lectures;