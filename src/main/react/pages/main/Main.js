import React from 'react';
import ReactDOM from 'react-dom/client';
import './Main.css'; // CSS 파일을 import
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Interest from "./Interest/Interest";
import Hero from "./Hero/Hero";
import Category from "./Category/Category";
import HighScoreService from "./HighScoreService/HighScoreService";

const services = [
    { title: "블로그 제작", desc: "블로그를 제작해드립니다.", rating: 4.8 },
    { title: "Google GA4 설치", desc: "GA4 설치 도와드립니다.", rating: 4.9 },
    { title: "퀵배너 디자인", desc: "퀵배너를 빠르게 제작합니다.", rating: 5.0 },
];

function Main() {
    return (
        <div className="main-container">
            {/* Hero Section */}
            <Hero />

            {/* Categories */}
            <Category />

            {/* Interests Section */}
            <Interest />

            {/* HighScoreService Section */}
            <HighScoreService />

            {/* 지금 인기 있는 서비스 섹션 */}
            <section className="popular-services">
                <h2 className="section-title"><span className="highlight-purple">지금 인기 있는</span> 서비스</h2>
                <div className="service-grid">
                    <div className="service-item">
                        <img src="/img/makeBlogThumbnail.png" alt="블로그 제작" />
                        <p>타이포그래픽, 키비쥬얼 단위로 블로그 채널을 제작해 드립니다.</p>
                        <div className="expert-info">
                            <strong>중앙개발원</strong>
                            <span>⭐ 4.8</span>
                        </div>
                    </div>
                    <div className="service-item">
                        <img src="/img/animationThumbnail.png" alt="애니메이션 썸네일" />
                        <p>[대기업상위노출] | 로고 | 명함 | 내역일 | 유튜브 | 스티커제작</p>
                        <div className="expert-info">
                            <strong>중앙개발원</strong>
                            <span>⭐ 4.8</span>
                        </div>
                    </div>
                    <div className="service-item">
                        <img src="/img/makeBlogThumbnail.png" alt="블로그 제작" />
                        <p>타이포그래픽, 키비쥬얼 단위로 블로그 채널을 제작해 드립니다.</p>
                        <div className="expert-info">
                            <strong>중앙개발원</strong>
                            <span>⭐ 4.8</span>
                        </div>
                    </div>
                    <div className="service-item">
                        <img src="/img/animationThumbnail.png" alt="애니메이션 썸네일" />
                        <p>[대기업상위노출] | 로고 | 명함 | 내역일 | 유튜브 | 스티커제작</p>
                        <div className="expert-info">
                            <strong>중앙개발원</strong>
                            <span>⭐ 4.8</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 지금 인기 있는 고수 섹션 */}
            <section className="popular-experts">
                <h2 className="section-title"><span className="highlight-green">지금 인기 있는</span> 고수</h2>
                <div className="expert-grid">
                    {Array(6).fill(0).map((_, i) => (
                        <div className="expert-card" key={i}>
                            <div className="expert-profile">
                                <img src="/img/expertProfile.png" alt="전문가" />
                                <div className="expert-info">
                                    <strong>중앙뽕아</strong>
                                    <span>⭐ 4.8</span>
                                </div>
                            </div>
                            <p>브랜딩부터 마케팅 전략까지 도와드려요. 다양한 기업과 협업한 경험이 있습니다.</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* 링고에게 물어보세요 섹션 */}
            <section className="ask-section">
                <h2 className="section-title">링고에게 물어보세요</h2>
                <div className="ask-grid">
                    <div className="ask-list">
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="ask-item">
                                <p><strong>[답변채택] 벌써 최대 500만원, 환급받은 사례 공유해요!</strong></p>
                                <p className="ask-sub">2024.03.12 | 조회수 1024 | 댓글 6</p>
                            </div>
                        ))}
                    </div>
                    <div className="ask-images">
                        <img src="qa01.png" alt="QA1" />
                        <img src="qa02.png" alt="QA2" />
                        <img src="qa03.png" alt="QA3" />
                    </div>
                </div>
            </section>

            {/* 전문가 활동 유도 섹션 */}
            <section className="expert-signup">
                <div className="expert-text">
                    <h3>전문가로 활동하시나요?<br />링고에서 당신의 능력을 펼쳐보세요.</h3>
                    <button className="cta-button">고수가입</button>
                </div>
                <div className="expert-carousel">
                    <img src="carousel-image.png" alt="고수 혜택" />
                </div>
            </section>

        </div>

    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Header />
        <Main />
        <Footer />
    </>
);
