import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../first.css';
import './Community.css';
import MyHeader from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const categories = ["전체", "자유", "질문", "홍보"];

const posts = [
    {
        id: 1,
        category: "자유",
        title: "오늘 점심 뭐 먹지?",
        content: "점심 메뉴 고민하는 분 있나요? 추천 좀 해주세요!",
        thumbnail: "/img/sample-thumb.png",
        comments: 2,
        date: "2025-06-11",
    },
    {
        id: 2,
        category: "질문",
        title: "리액트 상태관리 질문",
        content: "useState와 useReducer의 차이가 뭔가요?",
        thumbnail: "/img/sample-thumb.png",
        comments: 4,
        date: "2025-06-10",
    },
    {
        id: 3,
        category: "홍보",
        title: "스터디원 모집합니다",
        content: "프론트엔드 스터디 함께 하실 분 구해요! 매주 화요일 저녁.",
        thumbnail: "/img/sample-thumb.png",
        comments: 1,
        date: "2025-06-09",
    },
    {
        id: 4,
        category: "자유",
        title: "날씨가 너무 덥네요",
        content: "오늘 30도 넘었대요. 다들 더위 조심하세요.",
        thumbnail: "/img/sample-thumb.png",
        comments: 3,
        date: "2025-06-09",
    },
    {
        id: 5,
        category: "질문",
        title: "자바스크립트 map 함수 사용법",
        content: "map 함수에서 return을 꼭 써야 하나요?",
        thumbnail: "/img/sample-thumb.png",
        comments: 0,
        date: "2025-06-08",
    },
    {
        id: 6,
        category: "홍보",
        title: "신규 앱 출시 이벤트",
        content: "오늘부터 2주간 무료 체험 이벤트 진행합니다!",
        thumbnail: "/img/sample-thumb.png",
        comments: 5,
        date: "2025-06-08",
    },
    {
        id: 7,
        category: "자유",
        title: "주말에 뭐하세요?",
        content: "다들 주말에 뭐 하시나요? 추천할 만한 취미 있나요?",
        thumbnail: "/img/sample-thumb.png",
        comments: 1,
        date: "2025-06-07",
    },
    {
        id: 8,
        category: "질문",
        title: "CSS flex 정렬 질문",
        content: "align-items와 justify-content 차이가 궁금합니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 2,
        date: "2025-06-07",
    },
    {
        id: 9,
        category: "홍보",
        title: "개발자 세미나 안내",
        content: "6월 20일 개발자 세미나가 열립니다. 관심 있는 분 신청해주세요.",
        thumbnail: "/img/sample-thumb.png",
        comments: 0,
        date: "2025-06-06",
    },
    {
        id: 10,
        category: "자유",
        title: "요즘 본 영화 추천",
        content: "최근에 재미있게 본 영화 있으면 추천해주세요.",
        thumbnail: "/img/sample-thumb.png",
        comments: 4,
        date: "2025-06-06",
    },
    {
        id: 11,
        category: "질문",
        title: "깃허브 커밋 메시지 규칙",
        content: "커밋 메시지 어떻게 작성하는 게 좋을까요?",
        thumbnail: "/img/sample-thumb.png",
        comments: 2,
        date: "2025-06-05",
    },
    {
        id: 12,
        category: "홍보",
        title: "온라인 강의 할인 소식",
        content: "프로그래밍 온라인 강의 50% 할인 중입니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 3,
        date: "2025-06-05",
    },
    {
        id: 13,
        category: "자유",
        title: "오늘의 명언",
        content: "포기하지 마세요. 끝까지 해보면 길이 보입니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 0,
        date: "2025-06-04",
    },
    {
        id: 14,
        category: "질문",
        title: "리액트 props 전달 방법",
        content: "부모에서 자식으로 props 넘기는 법 알려주세요.",
        thumbnail: "/img/sample-thumb.png",
        comments: 1,
        date: "2025-06-04",
    },
    {
        id: 15,
        category: "홍보",
        title: "디자인 무료 배포",
        content: "UI 디자인 리소스 무료로 배포합니다. 필요하신 분 받아가세요.",
        thumbnail: "/img/sample-thumb.png",
        comments: 4,
        date: "2025-06-03",
    },
    {
        id: 16,
        category: "자유",
        title: "커피 추천 좀",
        content: "요즘 마실만한 커피 브랜드 추천해주세요.",
        thumbnail: "/img/sample-thumb.png",
        comments: 1,
        date: "2025-06-03",
    },
    {
        id: 17,
        category: "질문",
        title: "API 호출 에러 원인",
        content: "fetch로 데이터 가져올 때 404 에러가 납니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 2,
        date: "2025-06-02",
    },
    {
        id: 18,
        category: "홍보",
        title: "포트폴리오 사이트 오픈",
        content: "제 포트폴리오 사이트 오픈했습니다. 피드백 환영합니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 0,
        date: "2025-06-02",
    },
    {
        id: 19,
        category: "자유",
        title: "새벽에 듣기 좋은 노래",
        content: "새벽에 들으면 좋은 노래 추천 좀 해주세요.",
        thumbnail: "/img/sample-thumb.png",
        comments: 3,
        date: "2025-06-01",
    },
    {
        id: 20,
        category: "질문",
        title: "배열 정렬 방법",
        content: "자바스크립트 배열을 내림차순으로 정렬하려면?",
        thumbnail: "/img/sample-thumb.png",
        comments: 1,
        date: "2025-06-01",
    },
    {
        id: 21,
        category: "홍보",
        title: "오프라인 모임 안내",
        content: "6월 15일 오프라인 모임 있습니다. 관심 있는 분 연락주세요.",
        thumbnail: "/img/sample-thumb.png",
        comments: 2,
        date: "2025-05-31",
    },
    {
        id: 22,
        category: "자유",
        title: "운동 루틴 공유",
        content: "아침에 하는 스트레칭 루틴 공유합니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 0,
        date: "2025-05-31",
    },
    {
        id: 23,
        category: "질문",
        title: "파이썬 리스트 질문",
        content: "리스트에서 중복을 제거하려면 어떻게 하나요?",
        thumbnail: "/img/sample-thumb.png",
        comments: 3,
        date: "2025-05-30",
    },
    {
        id: 24,
        category: "홍보",
        title: "새 책 출간 소식",
        content: "개발 관련 신간 출간했습니다. 많은 관심 부탁드립니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 1,
        date: "2025-05-30",
    },
    {
        id: 25,
        category: "자유",
        title: "오늘의 TMI",
        content: "오늘은 양말을 짝짝이로 신었어요.",
        thumbnail: "/img/sample-thumb.png",
        comments: 2,
        date: "2025-05-29",
    },
    {
        id: 26,
        category: "질문",
        title: "SQL join 차이",
        content: "inner join과 left join의 차이가 궁금합니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 0,
        date: "2025-05-29",
    },
    {
        id: 27,
        category: "홍보",
        title: "무료 강의 추천",
        content: "유튜브에서 볼만한 무료 강의 추천합니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 5,
        date: "2025-05-28",
    },
    {
        id: 28,
        category: "자유",
        title: "오늘의 기분",
        content: "오늘은 기분이 좋아요. 모두 힘내세요!",
        thumbnail: "/img/sample-thumb.png",
        comments: 1,
        date: "2025-05-28",
    },
    {
        id: 29,
        category: "질문",
        title: "리액트 useEffect 질문",
        content: "useEffect에서 cleanup 함수는 언제 쓰나요?",
        thumbnail: "/img/sample-thumb.png",
        comments: 2,
        date: "2025-05-27",
    },
    {
        id: 30,
        category: "홍보",
        title: "개발자 굿즈 판매",
        content: "개발자 굿즈 판매 시작했습니다. 관심 있으신 분 DM 주세요.",
        thumbnail: "/img/sample-thumb.png",
        comments: 0,
        date: "2025-05-27",
    },
    {
        id: 31,
        category: "자유",
        title: "고양이 사진 자랑",
        content: "우리 고양이 너무 귀엽지 않나요?",
        thumbnail: "/img/sample-thumb.png",
        comments: 4,
        date: "2025-05-26",
    },
    {
        id: 32,
        category: "질문",
        title: "HTML5 시맨틱 태그",
        content: "section과 article의 차이가 궁금합니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 1,
        date: "2025-05-26",
    },
    {
        id: 33,
        category: "홍보",
        title: "코딩 테스트 모임",
        content: "코딩 테스트 준비하는 분 모임 만들었습니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 3,
        date: "2025-05-25",
    },
    {
        id: 34,
        category: "자유",
        title: "오늘의 목표",
        content: "오늘은 10,000보 걷기가 목표입니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 0,
        date: "2025-05-25",
    },
    {
        id: 35,
        category: "질문",
        title: "자바 final 키워드",
        content: "final 키워드는 언제 쓰는 건가요?",
        thumbnail: "/img/sample-thumb.png",
        comments: 2,
        date: "2025-05-24",
    },
    {
        id: 36,
        category: "홍보",
        title: "디자인 공모전 안내",
        content: "6월 30일까지 디자인 공모전 접수 중입니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 1,
        date: "2025-05-24",
    },
    {
        id: 37,
        category: "자유",
        title: "아침 운동의 효과",
        content: "아침에 운동하면 하루가 상쾌해집니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 3,
        date: "2025-05-23",
    },
    {
        id: 38,
        category: "질문",
        title: "CSS z-index 질문",
        content: "z-index가 안 먹힐 때는 어떻게 하나요?",
        thumbnail: "/img/sample-thumb.png",
        comments: 0,
        date: "2025-05-23",
    },
    {
        id: 39,
        category: "홍보",
        title: "신규 서비스 런칭",
        content: "새로운 서비스가 런칭되었습니다. 많은 이용 부탁드립니다.",
        thumbnail: "/img/sample-thumb.png",
        comments: 4,
        date: "2025-05-22",
    },
    {
        id: 40,
        category: "자유",
        title: "오늘의 다짐",
        content: "오늘도 열심히 살아보자!",
        thumbnail: "/img/sample-thumb.png",
        comments: 2,
        date: "2025-05-22",
    },
];

function Community() {
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 5;

    // 카테고리, 검색 필터링
    const filteredPosts = posts.filter(
        (post) =>
            (selectedCategory === "전체" || post.category === selectedCategory) &&
            (post.title.includes(search) || post.content.includes(search))
    );

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIdx = (currentPage - 1) * postsPerPage;
    const currentPosts = filteredPosts.slice(startIdx, startIdx + postsPerPage);

    // 페이지 번호 클릭
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 카테고리/검색 변경 시 1페이지로 이동
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, search]);

    return (
        <div className="board-container">
            <aside className="board-sidebar">
                <div className="sidebar-sticky">
                    <ul className="board-category-list">
                        {categories.map((cat) => (
                            <li
                                key={cat}
                                className={selectedCategory === cat ? "active" : ""}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>
                    <div className="btn-box">
                        <button className="board-write-btn">글쓰기</button>
                    </div>
                </div>

            </aside>
            <main className="board-main">
                <div className="board-header">
                    <h2>{selectedCategory}</h2>
                    <div className="board-search">
                        <input
                            type="text"
                            placeholder="키워드로 검색하세요."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <ul className="board-list">
                    {currentPosts.map((post) => (
                        <li key={post.id} className="board-list-item">
                            <div className="board-meta">
                                <span className="board-category">{post.category}</span>
                            </div>
                            <div className="board-content">
                                <div className="board-title">{post.title}</div>
                                <div className="board-desc">{post.content}</div>
                                <div className="board-info">
                                    <span className="board-comments">💬 {post.comments}</span>
                                    <span className="board-date">{post.date}</span>
                                </div>
                            </div>
                            <div className="board-thumb">
                                <img src={post.thumbnail} alt="썸네일" />
                            </div>
                        </li>
                    ))}
                </ul>
                {/* 페이지네이션 */}
                <div className="pagination">
                    <button
                        className="page-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        이전
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`page-btn${currentPage === i + 1 ? " active" : ""}`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="page-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        다음
                    </button>
                </div>


            </main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <MyHeader/>
        <Community/>
        <Footer/>
    </>
);
