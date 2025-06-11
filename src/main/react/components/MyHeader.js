import React from "react";
import './MyHeader.css';


function MyHeader() {

    return (
        <div className="header-container">
            <header className="header">
                <div className="logo">
                    <img src="/ringoLogo.png" alt="로고"/>
                </div>

                <nav className="nav navCenter">
                    <a href="#">강의정보</a>
                    <a href="#">커뮤니티</a>
                    <a href="#">문의사항</a>
                    <a href="#">공지사항</a>
                </nav>

                <nav className="nav">
                    <a href="#">
                        <img src="/message.png" alt="쪽지"/>
                    </a>
                    <a href="#">
                        <img src="/notification.png" alt="알림"/>
                    </a>
                    <a href="#">로그인</a>
                    <button className="signup-button">회원가입</button>
                </nav>
            </header>
        </div>

    );
}

export default MyHeader;