import React, { useState } from "react";
import "./NoticeList.css";
import { BiChevronDown, BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import ReactDOM from "react-dom/client";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const dummyData = { //공지 내용물 변경필요
    total: 5,
    currentPage: 1,
    amount: 10,
    keyword: "",
    noticeList: [
        {
            noticeId: 1,
            noticeTitle: "첫 번째 공지사항",
            noticeCreatedAt: "2024-06-01",
            noticeContent: "이것은 첫 번째 공지사항의 내용입니다.",
        },
        // 추가 항목...
    ],
};

export default function NoticeList() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [keyword, setKeyword] = useState(dummyData.keyword);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleSearchChange = (e) => setKeyword(e.target.value);

    return (
        <div className="wrap">
            <main className="content">
                <div className="hi">
                    <div className="header_box">
                        <div className="header_box_top">공지사항</div>
                        <div className="header_box_right">
                            <img src="/img/megapon_yellow.png" alt="확성기이미지" />
                            <div className="header_box_right_upper">
                                <img src="/img/alert_bell.png" alt="종이미지" />
                            </div>
                        </div>
                        <div className="header_box_mid">
                            LINGO 에서<br />
                            공지사항을 안내해드려요.
                        </div>
                        <div className="header_box_search">
                            <div className="search-wrapper">
                                <img src="/img/Search_1.png" alt="검색" className="search-icon" />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="키워드를 검색하세요."
                                    value={keyword}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <section>
                    <div className="notice_card">
                        <div className="notice_card_upper">총 <span>{dummyData.total}</span>개</div>

                        {dummyData.noticeList.map((notice, index) => (
                            <div key={notice.noticeId} className="notice_card_row" onClick={() => handleToggle(index)}>
                                <div className={`notice_card_title ${activeIndex === index ? "open" : ""}`}>
                                    <span className="title_cont num">{notice.noticeId}</span>
                                    <span className="title_cont title">{notice.noticeTitle}</span>
                                    <span className="title_cont writer">운영자</span>
                                    <span className="title_cont regdate">{notice.noticeCreatedAt}</span>
                                    <span className="title_cont down"><BiChevronDown className="arrow-icon" /></span>
                                </div>
                                <div className={`notice_card_content ${activeIndex === index ? "active" : ""}`}>
                                    {notice.noticeContent}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 페이징 */}
                    <div className="pagenation">
                        <p><BiChevronsLeft className="pg" /></p>
                        <p><BiChevronLeft className="pg" /></p>
                        <p><a href="#1" className="active">1</a></p>
                        <p><BiChevronRight className="pg" /></p>
                        <p><BiChevronsRight className="pg" /></p>
                    </div>
                </section>
            </main>
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Header />
        <NoticeList />
        <Footer />
    </>

);