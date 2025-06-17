import React from "react";
import './Header.css';


function Header() {

    return (
        <div className="header-container">
            <header className="header">
                <a href="/main">
                    <div className="logo">
                        <img src="/img/logo.png" alt="로고"/>
                    </div>
                </a>

                <nav className="nav navCenter">
                    <a href="/Lecture/LectureInfo">강의정보</a>
                    <a href="/Community/CommunityList">커뮤니티</a>
                    <a href="/Qna/Qnalist">문의사항</a>
                    <a href="/Notice/noticelist">공지사항</a>
                </nav>

                <nav className="nav">
                    <a href="#">
                        <img src="/img/message.png" alt="쪽지"/>
                    </a>
                    <a href="#">
                        <img src="/img/notification.png" alt="알림"/>
                    </a>
                    <a href="#">로그인</a>
                    <button className="signup-button">회원가입</button>
                </nav>
            </header>
            <div className="header-letterbox"/>
        </div>

    );
}

export default Header;