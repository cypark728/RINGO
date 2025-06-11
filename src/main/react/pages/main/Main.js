import React from 'react';
import ReactDOM from 'react-dom/client';
import './Main.css'; // CSS 파일을 import
import MyHeader from "../../components/MyHeader";

const heroCategories = ["블로그", "PPT", "코딩", "로고 디자인", "PPT", "코딩", "로고 디자인"];
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
const services = [
    { title: "블로그 제작", desc: "블로그를 제작해드립니다.", rating: 4.8 },
    { title: "Google GA4 설치", desc: "GA4 설치 도와드립니다.", rating: 4.9 },
    { title: "퀵배너 디자인", desc: "퀵배너를 빠르게 제작합니다.", rating: 5.0 },
];

function Main() {
    return (
        <div className="main-container">
            {/* Header */}
            {/*<header className="header">*/}
            {/*    <div className="logo">*/}
            {/*        <img src="/ringoLogo.png" alt="로고"/>*/}
            {/*    </div>*/}

            {/*    <nav className="nav navCenter">*/}
            {/*        <a href="#">강의정보</a>*/}
            {/*        <a href="#">커뮤니티</a>*/}
            {/*        <a href="#">문의사항</a>*/}
            {/*        <a href="#">공지사항</a>*/}
            {/*    </nav>*/}

            {/*    <nav className="nav">*/}
            {/*        <a href="#">*/}
            {/*            <img src="/message.png" alt="쪽지"/>*/}
            {/*        </a>*/}
            {/*        <a href="#">*/}
            {/*            <img src="/notification.png" alt="알림"/>*/}
            {/*        </a>*/}
            {/*        <a href="#">로그인</a>*/}
            {/*        <button className="signup-button">회원가입</button>*/}
            {/*    </nav>*/}
            {/*</header>*/}

            {/* Hero Section */}
            <section className="hero-section">
                <div>
                    <p className="sub-heading">지금 인기 있는 고수</p>
                    <h1 className="main-heading">
                        더 나은 내일을 위한 선택,<br />지금
                        <span className="highlight-text"> 연결</span>하세요
                    </h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="원하는 서비스를 검색해보세요"
                            className="search-input"
                        />
                        <img className="search-button" src="/search.png" alt="검색"/>
                    </div>
                    <div className="hero-categories">
                        {heroCategories.map((cat, i) => (
                            <span key={i} className="category">{cat}</span>
                        ))}
                    </div>
                </div>
                <img src="/hero.png" alt="영웅이미지"/>
            </section>

            {/* Categories */}
            <div className="categories">
                {categories.map((cat, i) => (
                    <div className="category">
                        <img src={`/${cat.filename}.png`} alt={cat.label} data-category={cat.filename}/>
                        <span key={i} className="category">{cat.label}</span>
                    </div>
                ))}
            </div>

            {/* Interests Section */}
            <section className="interests-section">
                <h2 className="interests-heading">○○○님의 관심분야입니다.</h2>
                <div className="service-cards">
                    {services.map((s, i) => (
                        <div key={i} className="service-card">
                            <h3 className="service-title">{s.title}</h3>
                            <p className="service-desc">{s.desc}</p>
                            <p className="service-rating">⭐ {s.rating}점</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Auto-scrolling service highlights */}
            <section className="scrolling-section">
                <div className="scrolling-title">링고가 검증한 4.8점 이상 서비스</div>
                <div className="scrolling-services">
                    {services.concat(services).map((s, i) => (
                        <div key={i} className="service-card">
                            <h3 className="service-title">{s.title}</h3>
                            <p className="service-desc">{s.desc}</p>
                            <p className="service-rating">⭐ {s.rating}점</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 지금 인기 있는 서비스 섹션 */}
            <section className="popular-services">
                <h2 className="section-title"><span className="highlight-purple">지금 인기 있는</span> 서비스</h2>
                <div className="service-grid">
                    <div className="service-item">
                        <img src="/makeBlogThumbnail.png" alt="블로그 제작" />
                        <p>타이포그래픽, 키비쥬얼 단위로 블로그 채널을 제작해 드립니다.</p>
                        <div className="expert-info">
                            <strong>중앙개발원</strong>
                            <span>⭐ 4.8</span>
                        </div>
                    </div>
                    <div className="service-item">
                        <img src="/animationThumbnail.png" alt="애니메이션 썸네일" />
                        <p>[대기업상위노출] | 로고 | 명함 | 내역일 | 유튜브 | 스티커제작</p>
                        <div className="expert-info">
                            <strong>중앙개발원</strong>
                            <span>⭐ 4.8</span>
                        </div>
                    </div>
                    <div className="service-item">
                        <img src="/makeBlogThumbnail.png" alt="블로그 제작" />
                        <p>타이포그래픽, 키비쥬얼 단위로 블로그 채널을 제작해 드립니다.</p>
                        <div className="expert-info">
                            <strong>중앙개발원</strong>
                            <span>⭐ 4.8</span>
                        </div>
                    </div>
                    <div className="service-item">
                        <img src="/animationThumbnail.png" alt="애니메이션 썸네일" />
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
                                <img src="/expertProfile.png" alt="전문가" />
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

            {/* Footer 섹션 */}
            <footer className="footer">
                <div className="footer-top">
                    <p className="footer-phone">1234-1234</p>
                    <p>운영시간 : 10:00~18:00 | 점심시간 : 12:00~13:00 (주말, 공휴일 제외)</p>
                    <p>FAX: 02-3455-5001 | Email: helpdesk@jobkorea.co.kr</p>
                    <p><a href="#">전자금융거래 이용약관</a> | <a href="#">개인정보처리방침</a> | <a href="#">위치기반서비스 이용약관</a></p>
                    <p>© JOBKOREA LLC. All rights reserved.</p>
                </div>
                <div className="footer-links">
                    <a href="#">회사소개</a>
                    <a href="#">이용약관</a>
                    <a href="#">고객센터</a>
                </div>
            </footer>

        </div>

    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <MyHeader />
        <Main />
    </>
);
