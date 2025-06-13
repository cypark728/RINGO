import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../first.css';
import './UserInfo.css';
import MyHeader from "../../components/header/Header";

const allTopics = [
    '디자인', 'it·프로그래밍', '영상·사진', '마케팅', '주식·코인',
    '문서·글쓰기', '세무·법인·노무', '창업·사업', '기타'
];

function UserInfo() {
    const [name, setName] = useState('홍길동');
    const [userId] = useState('ringo123');
    const [gender, setGender] = useState('남성');
    const [birth, setBirth] = useState({ year: '2000', month: '01', day: '01' });
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('ringo@example.com');
    const [selectedTopics, setSelectedTopics] = useState(['디자인', '마케팅']);

    // 프로필 이미지 상태 및 핸들러
    const [profileImg, setProfileImg] = useState('/img/profile_default.png');
    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImg(URL.createObjectURL(file));
        }
    };

    // 연락처 자동 하이픈
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

    // 관심분야 선택
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

    // 생년월일 입력 핸들러
    const handleBirthChange = (field, value) => {
        setBirth({ ...birth, [field]: value.replace(/[^0-9]/g, '') });
    };

    return (
        <div className="userinfo-background">
            <div className="userinfo-box">
                <div className="userinfo-title">회원정보수정</div>
                <div className="profile-img-wrap">
                    <div className="img-box">
                        <img src={profileImg} alt="프로필" className="profile-img" />



                    </div>

                    <label htmlFor="profile-img-upload" className="profile-img-upload-btn">
                        <img src="/img/profile_camera.png" alt="사진변경" />
                        <input
                            id="profile-img-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImgChange}
                        />
                    </label>
                </div>
                <div className="userinfo-form">
                    <div className="userinfo-row">
                        <span className="userinfo-label">이름</span>
                        <input
                            type="text"
                            className="userinfo-input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="userinfo-row">
                        <span className="userinfo-label">아이디</span>
                        <span className="userinfo-value">{userId}</span>
                    </div>
                    <div className="userinfo-row">
                        <span className="userinfo-label">성별</span>
                        <div className="userinfo-radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="남성"
                                    checked={gender === '남성'}
                                    onChange={() => setGender('남성')}
                                /> 남성
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="여성"
                                    checked={gender === '여성'}
                                    onChange={() => setGender('여성')}
                                /> 여성
                            </label>
                        </div>
                    </div>
                    <div className="userinfo-row">
                        <span className="userinfo-label">생년월일</span>
                        <div className="userinfo-birth-group">
                            <input
                                type="text"
                                className="userinfo-input birth"
                                value={birth.year}
                                onChange={e => handleBirthChange('year', e.target.value)}
                                maxLength={4}
                            /> <span>년</span>
                            <input
                                type="text"
                                className="userinfo-input birth"
                                value={birth.month}
                                onChange={e => handleBirthChange('month', e.target.value)}
                                maxLength={2}
                            /> <span>월</span>
                            <input
                                type="text"
                                className="userinfo-input birth"
                                value={birth.day}
                                onChange={e => handleBirthChange('day', e.target.value)}
                                maxLength={2}
                            /> <span>일</span>
                        </div>
                    </div>
                    <div className="userinfo-row">
                        <span className="userinfo-label">연락처</span>
                        <input
                            type="text"
                            className="userinfo-input"
                            placeholder="000-0000-0000"
                            value={phone}
                            onChange={handlePhoneChange}
                            maxLength={13}
                        />
                    </div>
                    <div className="userinfo-row">
                        <span className="userinfo-label">이메일</span>
                        <input
                            type="text"
                            className="userinfo-input"
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
                </div>
                <button className="userinfo-submit-btn">수정 완료</button>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <MyHeader/>
        <UserInfo />
    </>
);
