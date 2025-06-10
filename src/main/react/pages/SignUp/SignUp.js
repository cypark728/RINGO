import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import '../first.css'
import './SignUp.css'


const allTopics = ['디자인', 'it·프로그래밍', '영상·사진', '마케팅', '주식·코인', '문서·글쓰기', '세무·법인·노무', '창업·사업', '기타'];

function SignUp() {
    const [selectedTopics, setSelectedTopics] = useState([]);

    const handleSelect = (topic) => {
        if (selectedTopics.includes(topic)) {
            // 이미 선택된 토픽이면 해제
            setSelectedTopics(selectedTopics.filter(t => t !== topic));
        } else {
            if (selectedTopics.length >= 3) {
                alert("최대 3개까지만 선택할 수 있습니다.");
                return;
            }
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    return (
        <div className="background">
            <div className="box">
                <div className="title">
                    <h1>회원가입</h1>
                </div>
                <div className="detail">
                    <div className="detailBox">
                        <div className="id">
                            <span>아이디</span>

                                <input type={"text"} placeholder={"  8~20글자로 입력해주세요"}/>
                                <p>사용가능한 아이디입니다.</p>


                        </div>
                        <div className="pw">
                            <span>비밀번호</span>
                            <input type={"text"} className="firstpw"/>
                            <p>비밀번호는 영문자,숫자,특수문자를 포함해야 합니다.</p>
                            <span>비밀번호 확인</span>
                            <input type={"text"} className="secondpw"/>
                            <p>비밀번호가 일치하지 않습니다.</p>
                        </div>
                        <div className="userInfo">
                            <span>이름</span>
                             <input type={"text"} className="name"/> <br/>

                            <div className="genderbox">
                                <span>성별</span>
                                <span className="gender">
                                <span className="man">
                                    <input type={"radio"} id={"man"} name={"gender"} value={"남성"}/>
                                    <label htmlFor="man">남성</label>
                                </span>
                                <span className="woman">
                                    <input type={"radio"} id={"woman"} name={"gender"} value={"여성"}/>
                                    <label htmlFor="woman">여성</label>
                                </span>
                            </span>
                            </div>
                            <div className="birth">
                                <span>생년월일</span>
                                <input type={"number"} className="year"/> <span>년</span>
                                <input type={"number"} className="month"/> <span>월</span>
                                <input type={"number"} className="day"/> <span>일</span>
                            </div>
                            <div>
                                <span>연락처</span>
                                <input type={"number"} placeholder={"010-0000-0000"} className="phone"/>
                            </div>
                            <div>
                                <span>이메일</span>
                                <input type={"text"} placeholder={"ringo@gmail.com"} className="email"/>
                            </div>

                            <div className="interest-row">
                                <span className="interest-label">관심분야</span>
                                <span className="topic-options">
                                    {allTopics.map(topic => (
                                        <button
                                            key={topic}
                                            onClick={() => handleSelect(topic)}
                                            className={selectedTopics.includes(topic) ? 'selected' : ''}
                                        >
                                            {topic}
                                        </button>
                                    ))}
                                </span>
                            </div>
                        </div>
                        <div className="terms">
                            <p>가입 약관</p>
                            <div className={"AgreeAll"}>
                                <div className={"Agree"}>
                                    <input type={"checkbox"}/> <span> 개인회원 약관 동의(필수)</span> <br/>
                                    <input type={"checkbox"}/> <span> 개인정보 수집 및 이용(필수)</span> <br/>
                                    <input type={"checkbox"}/> <span> 마케팅 정보 수신 동의 - 이메일(선택)</span> <br/>
                                    <input type={"checkbox"}/> <span> 마케팅 정보 수신 동의 - MMS(선택)</span>
                                </div>
                                <div>
                                    <input type={"checkbox"}/>
                                    <span>전체 동의 <br/>
                            위치기반 서비스 이용약관(선택), 마케팅 정보 수신 동의(이메일,SMS/MMS)(선택) 동의를 포함합니다.
                        </span>
                                </div>

                            </div>
                        </div>


                        <div>
                            <button type={"button"}>회원 가입하기</button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SignUp/>
);
