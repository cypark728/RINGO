import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../first.css';
import './pwRest.css';
import MyHeader from "../../components/header/Header";

function PasswordReset() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [touched, setTouched] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setTouched(true);
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
        setTouched(true);
    };

    const isMismatch = touched && password && passwordConfirm && password !== passwordConfirm;

    return (
        <div className="background">
            <div className="box">
                <div className="title">
                    <h1>비밀번호 변경</h1>
                </div>
                <form className="pwchange-form">
                    <div className="form-row">
                        <label className="form-label" htmlFor="password">새 비밀번호</label>
                        <input
                            type="password"



                            id="password"
                            className="form-input"
                            placeholder="비밀번호 입력해주세요."
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="passwordConfirm">새 비밀번호 확인</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            className="form-input"
                            placeholder="비밀번호 입력해주세요."
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                            autoComplete="new-password"
                        />
                    </div>
                    {isMismatch && (
                        <div className="pw-error">
                            비밀번호가 일치하지 않습니다.
                        </div>
                    )}
                    <div className="form-actions">
                        <button type="submit" className="pwchange-button">비밀번호 변경</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <MyHeader/>
        <PasswordReset/>
    </>
);
