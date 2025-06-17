import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../first.css';
import './SignUp.css';
import MyHeader from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const allTopics = ['디자인', 'it·프로그래밍', '영상·사진', '마케팅', '주식·코인', '문서·글쓰기', '세무·법인·노무', '창업·사업', '기타'];

function SignUp() {



    // 각 input의 상태 관리
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [agreements, setAgreements] = useState([false, false, false, false]);
    const [allAgree, setAllAgree] = useState(false);
    const [pwTouched, setPwTouched] = useState(false);

    // 관심분야
    const handleSelect = (topic) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter(t => t !== topic));
        } else {
            if (selectedTopics.length >= 3) {
                alert("최대 3개까지만 선택할 수 있습니다.");
                return;
            }
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    // 약관
    const handleAgreementChange = (index) => {
        const newAgreements = agreements.map((val, i) => (i === index ? !val : val));
        setAgreements(newAgreements);
        setAllAgree(newAgreements.every(Boolean));
    };
    const handleAllAgreeChange = () => {
        const newValue = !allAgree;
        setAllAgree(newValue);
        setAgreements([newValue, newValue, newValue, newValue]);
    };

    // 비밀번호 입력 핸들러
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPwTouched(true);
    };
    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
        setPwTouched(true);
    };

    // 비밀번호 불일치 체크
    const isMismatch = pwTouched && password && passwordConfirm && password !== passwordConfirm;

    // 연락처 자동 하이픈 처리
    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length < 4) {
            setPhone(value);
        } else if (value.length < 8) {
            setPhone(value.slice(0,3) + '-' + value.slice(3));
        } else {
            setPhone(value.slice(0,3) + '-' + value.slice(3,7) + '-' + value.slice(7,11));
        }
    };

    // 성별 라디오
    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    // 생년월일
    const handleBirthYearChange = (e) => setBirthYear(e.target.value.replace(/[^0-9]/g, '').slice(0, 4));
    const handleBirthMonthChange = (e) => setBirthMonth(e.target.value.replace(/[^0-9]/g, '').slice(0, 2));
    const handleBirthDayChange = (e) => setBirthDay(e.target.value.replace(/[^0-9]/g, '').slice(0, 2));

    // 회원가입 처리
    const handleSignUp = async () => {
        if (!userId || !password || !passwordConfirm || !name || !gender || !birthYear || !birthMonth || !birthDay || !phone || !email) {
            alert("모든 필수 정보를 입력하세요.");
            return;
        }
        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (selectedTopics.length === 0) {
            alert("관심분야를 1개 이상 선택하세요.");
            return;
        }
        if (!agreements[0] || !agreements[1]) {
            alert("필수 약관에 동의해야 합니다.");
            return;
        }
        const birth = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
        const userData = {
            userId,
            userPw: password,
            userName: name,
            userGender: gender,
            userBirth: birth,
            userPhone: phone,
            userEmail: email,
            userInterest: selectedTopics.join(','),
        };
        try {
            const response = await fetch("/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const result = await response.text(); // "success" 받기
                alert("회원가입이 완료되었습니다!");

            } else {
                const errorMsg = await response.text();
                alert(errorMsg || "회원가입 실패");
            }
        } catch (err) {
            alert("서버 연결 실패");
        }
    };

    return (
        <div className="background">
            <div className="box">
                <div className="title">
                    <h1>회원가입</h1>
                </div>
                <div className="detailBox">
                    <div className="form-row">
                        <label className="form-label" htmlFor="userid">아이디</label>
                        <input
                            type="text"
                            id="userid"
                            className="form-input"
                            placeholder="8~20글자로 입력해주세요"
                            value={userId}
                            onChange={e => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="pw">비밀번호</label>
                        <input
                            type="password"
                            id="pw"
                            className="form-input"
                            placeholder="비밀번호 입력"
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="pw2">비밀번호 확인</label>
                        <input
                            type="password"
                            id="pw2"
                            className="form-input"
                            placeholder="비밀번호 확인"
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
                    <div className="form-row">
                        <label className="form-label" htmlFor="name">이름</label>
                        <input
                            type="text"
                            id="name"
                            className="form-input"
                            placeholder="이름 입력"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label">성별</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="남성"
                                    checked={gender === "남성"}
                                    onChange={handleGenderChange}
                                /> 남성
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="여성"
                                    checked={gender === "여성"}
                                    onChange={handleGenderChange}
                                /> 여성
                            </label>
                        </div>
                    </div>
                    <div className="form-row">
                        <label className="form-label">생년월일</label>
                        <div className="birth-group">
                            <input
                                type="text"
                                className="form-input"
                                style={{width: "60px"}}
                                placeholder="YYYY"
                                maxLength={4}
                                value={birthYear}
                                onChange={handleBirthYearChange}
                            />
                            <span>년</span>
                            <input
                                type="text"
                                className="form-input"
                                style={{width: "40px"}}
                                placeholder="MM"
                                maxLength={2}
                                value={birthMonth}
                                onChange={handleBirthMonthChange}
                            />
                            <span>월</span>
                            <input
                                type="text"
                                className="form-input"
                                style={{width: "40px"}}
                                placeholder="DD"
                                maxLength={2}
                                value={birthDay}
                                onChange={handleBirthDayChange}
                            />
                            <span>일</span>
                        </div>
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
                        <input
                            type="text"
                            id="email"
                            className="form-input"
                            placeholder="ringo@gmail.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="interest-row">
                        <span className="interest-label">관심분야</span>
                        <span className="topic-options">
                            {allTopics.map(topic => (
                                <button
                                    key={topic}
                                    onClick={() => handleSelect(topic)}
                                    className={selectedTopics.includes(topic) ? 'selected' : ''}
                                    type="button"
                                >
                                    {topic}
                                </button>
                            ))}
                        </span>
                    </div>
                    <div className="terms">
                        <p>가입 약관</p>
                        <div className="AgreeAll">
                            <div className="Agree">
                                <input type="checkbox" className="check" checked={agreements[0]} onChange={() => handleAgreementChange(0)} /> <span> 개인회원 약관 동의(필수)</span> <br/>
                                <input type="checkbox" className="check" checked={agreements[1]} onChange={() => handleAgreementChange(1)} /> <span> 개인정보 수집 및 이용(필수)</span> <br/>
                                <input type="checkbox" className="check" checked={agreements[2]} onChange={() => handleAgreementChange(2)} /> <span> 마케팅 정보 수신 동의 - 이메일(선택)</span> <br/>
                                <input type="checkbox" className="check" checked={agreements[3]} onChange={() => handleAgreementChange(3)} /> <span> 마케팅 정보 수신 동의 - MMS(선택)</span>
                            </div>
                            <div className="AllAgree">
                                <input type="checkbox" className="check" checked={allAgree} onChange={handleAllAgreeChange} />
                                <span>전체 동의 </span>
                                <p>위치기반 서비스 이용약관(선택), 마케팅 정보 수신 동의(이메일,SMS/MMS)(선택) 동의를 포함합니다.</p>
                            </div>
                        </div>
                    </div>
                    <div className="signup">
                        <button type="button" className="signup_button" onClick={handleSignUp}>회원 가입하기</button>
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
        <SignUp/>
        <Footer/>
    </>
);
