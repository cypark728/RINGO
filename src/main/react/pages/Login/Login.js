import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../first.css';
import './Login.css';

function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-background">
            <div className="login-box">
                <div className="login-logo">
                    <img src="/img/logo.png" alt="ringo" className="login-logo-img" />
                </div>
                <form className="login-form">
                    <input
                        type="text"
                        className="login-input"
                        placeholder="아이디"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                    />
                    <input
                        type="password"
                        className="login-input"
                        placeholder="비밀번호"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-btn">로그인</button>
                </form>
                <div className="login-links">
                    <a href="/idfind" className="login-link">아이디 찾기</a>
                    <span className="login-divider">|</span>
                    <a href="pwchange" className="login-link">비밀번호 찾기</a>
                </div>
                <div className="login-social-title">소셜 계정으로 간편 로그인</div>
                <div className="login-social-icons">
                    <a href="#"><img src="/img/naver.png" alt="네이버" /></a>
                    <a href="#"><img src="/img/kakao.png" alt="카카오" /></a>
                    <a href="#"><img src="/img/google.png" alt="구글" /></a>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Login/>
    </>
);
