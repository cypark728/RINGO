import React from 'react';
import ReactDOM from 'react-dom/client'; //root에 리액트 돔방식으로 렌더링시 필요합니다.
import '../first.css'
import './IdFindGood.css';
import MyHeader from "../../components/MyHeader";

const idList = [
    { id: 'sdfs46dsjio', date: '2000-10-10' },
    { id: 'sdfs456', date: '2000-10-10' },
    { id: 'sdfs456', date: '2000-10-10' },
];

function IdFindGood() {
    return (
        <div className="background">
            <div className="box">
                <div className="title">
                    <h1>아이디 찾기</h1>
                    <p>ooo님의 아이디 찾기가 완료 되었습니다.</p>
                    <p>가입한 아이디가 <span className="count">총 {idList.length}개</span> 있습니다.</p>
                </div>
                <div className="id-list-container">
                    <ul className="id-list">
                        <li className="id-list-header">
                            <span className="id-label">아이디</span>
                            <span className="date-label">가입일</span>
                        </li>
                        {idList.map((item, idx) => (
                            <li key={item.id + idx}>
                                <span className="user-id">{item.id}</span>
                                <span className="join-date">{item.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="signup">
                    <button type="button" className="login_button">로그인</button>
                    <button type="button" className="pwchange_button">비밀번호 변경</button>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <MyHeader/>
        <IdFindGood/>
    </>
);