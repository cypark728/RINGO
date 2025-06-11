import React from 'react';
import './MyPageUser.css';
import ReactDOM from "react-dom/client";
import QnaList from "../Qna/QnaList";

export default function MyPageUser() {
    return (
        <div className="container">
            <div className="content-wrapper">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="profile">
                        <div className="profile-image" />
                        <p className="profile-name">테스트</p>
                        <button className="edit-button">회원정보 수정</button>
                        <ul className="menu">
                            <li className="menu-item selected">홈</li>
                            <li className="menu-item">작성한 리뷰</li>
                            <li className="menu-item">찜한 강의</li>
                            <li className="menu-item">시간표</li>
                        </ul>
                        <button className="convert-button">고수 전환</button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="main">
                    {/* 내가 수강중인 수업 */}
                    <section className="section">
                        <h2 className="section-title">내가 수강중인 수업 <span className="section-total">Total 3</span></h2>
                        <div className="card-grid">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="card">
                                    <div className="exampleImageBlack" />
                                    <p className="card-title">Java Advanced Part.{i + 1}</p>
                                    <p className="card-desc">김영한의 실전 자바 - 고급 {i + 1}편, ...</p>
                                    <p className="card-price">$59.40</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 내가 찜한 수업 */}
                    <section className="section">
                        <h2 className="section-title">내가 찜한 수업 <span className="section-total">Total 3</span></h2>
                        <div className="card-grid">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="card">
                                    <div className="exampleImageBlack" />
                                    <p className="card-title">Java Advanced Part.{i + 1}</p>
                                    <p className="card-desc">김영한의 실전 자바 - 고급 {i + 1}편, ...</p>
                                    <p className="card-price">$59.40</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 내가 작성한 리뷰 */}
                    <section className="section">
                        <h2 className="section-title">내가 작성한 리뷰</h2>
                        <div className="review-list">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="review-item">
                                    <div className="exampleImageBlack review-image" />
                                    <div>
                                        <p className="review-author">사용자{i + 1} • 06/08/2025</p>
                                        <p className="review-text">리뷰 내용이 여기에 들어갑니다. 좋은 강의 감사합니다!</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MyPageUser />
);