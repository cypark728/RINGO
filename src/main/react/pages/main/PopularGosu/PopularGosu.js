import React from "react";
import "./PopularGosu.css";

const gosus = [
    {
        img: "/img/ai.png",
        name: "qwer",
        rating: "4.8",
        desc: [
            "아 나도 겜 좀 잘하고 싶다",
            "친구들이 겜 못한다고 갈구는 거 좀 벗어나고 싶다",
            "인성 안좋은 애들 참교육 하고 싶다",
            "그런 당신을 위한 완벽한 수업 제공",
            "각종 게임 최고티어 인증가능 지금 바로 문의!",
        ],
    },
    {
        img: "/img/code.png",
        name: "컴고수",
        rating: "4.8",
        desc: [
            "자바가 뭐예요?",
            "웹RTC가 뭐가 좋은거예요?",
            "이거 어떻게 해요?",
            "AI가 좋은거예요?",
            "모든 질문 대응가능, 가장 완벽한 IT 1대1 수업!",
        ],
    },
    {
        img: "/img/me2.jpg",
        name: "일일수익률5.7%",
        rating: "4.8",
        desc: [
            "아 살껄",
            "아 팔껄",
            "아 손절 할껄, 아 익절 할껄",
            "껄껄껄 껄무새 이젠 돈 좀 벌껄",
            "1년 최종 수익율 3억%! 이렇게만 나도 코인 졸부?",
        ],
    },
    {
        img: "/img/expertProfile.png",
        name: "미술관1타도슨트",
        rating: "4.8",
        desc: [
            "아 이 작품으로 말하자면",
            "레오나르도 다빈치가 사용한 기법 중 하나인, 스푸마토란 회화기법으로 그려진 작품으로",
            "모나리자 기법이라고도 불리는 기법을 사용해 그려진 작품입니다",
            "음악, 미술에 대해 아는 척만 해도 스마트해 보인다?",
            "유식한 척 1타 강사에게 1시간 8회로 배우는 미술 꺼드럭 지식!",
        ],
    },
];

const PopularGosu = () => (
    <div className="popular-gosu-layout">
        <div className="popular-gosu-left">
            <h2 className="popular-gosu-title">
                지금 인기 있는 <span className="popular-gosu-highlight">고수</span>
            </h2>
        </div>
        <div className="popular-gosu-right">
            <div className="popular-gosu-grid">
                {gosus.map((gosu, idx) => (
                    <div className="popular-gosu-card" key={idx}>
                        <div className="popular-gosu-card-header">
                            <img src={gosu.img} alt={gosu.name} className="popular-gosu-avatar" />
                            <div className="popular-gosu-rating">
                                <span className="popular-gosu-star">★</span>
                                <span className="popular-gosu-rating-num">{gosu.rating}</span>
                            </div>
                        </div>
                        <div className="popular-gosu-name">{gosu.name}</div>
                        <div className="popular-gosu-desc">
                            {gosu.desc.map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default PopularGosu;
