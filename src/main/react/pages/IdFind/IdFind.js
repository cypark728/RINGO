import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../first.css';
import './IdFind.css';
import MyHeader from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function IdFind() {
    const [phone, setPhone] = useState('');

    // 연락처 입력값 자동 하이픈 처리
    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만
        if (value.length < 4) {
            setPhone(value);
        } else if (value.length < 8) {
            setPhone(value.slice(0,3) + '-' + value.slice(3));
        } else {
            setPhone(value.slice(0,3) + '-' + value.slice(3,7) + '-' + value.slice(7,11));
        }
    };

    return (
        <div className="background">
            <div className="box">
                <div className="title">
                    <h1>아이디 찾기</h1>
                    <p>회원정보를 입력해 주세요.</p>
                </div>
                <div className="idfind-form">
                    <div className="form-row">
                        <label className="form-label" htmlFor="name">이름</label>
                        <input type="text" id="name" className="form-input" placeholder="이름을 입력해주세요"/>
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="phone">연락처</label>
                        <input
                            type="text"
                            id="phone"
                            className="form-input"
                            placeholder="010-0000-0000"
                            value={phone}
                            onChange={handlePhoneChange}
                            maxLength={13}
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="email">이메일</label>
                        <input type="text" id="email" className="form-input" placeholder="ringo@gmail.com"/>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="findid-button">아이디 찾기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <MyHeader/>
        <IdFind/>
        <Footer/>
    </>
);
