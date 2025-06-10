import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './Meeting.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Meeting() {
    const [volume, setVolume] = useState(50);

    const handleChange = (e) => {
        setVolume(e.target.value);
    };

    return (
        <div>
            <div className="container">
                <div className="sidebar">
                    <div className="logo"><img src="/img/logo.png" alt="" /></div>
                    <div className="sidebar-btn">
                        <button className="action"><i className="fas fa-calendar"></i></button>
                        <button><i className="fas fa-code"></i></button>
                        <button><i className="fas fa-pencil"></i></button>
                        <button><i className="fas fa-camera"></i></button>
                    </div>
                    <div className="ai">
                        <img src="/img/ai.png" alt="" />
                    </div>
                </div>

                <div className="wrap">
                    <ul className="top">
                        <li>
                            <figure><img src="/img/me.jpg" alt="" /></figure>
                            <p>edfj_56</p>
                        </li>
                        <li>
                            <figure><img src="/img/me2.jpg" alt="" /></figure>
                            <p>edfj_23</p>
                        </li>
                    </ul>

                    <div className="contents">
                        <div className="main-content">
                            <div className="header">
                                <p>2025-10-10</p>
                                <h2>ringo meeting title</h2>
                                <span>🕒 01:22:38</span>
                            </div>

                            <div className="video-section">
                                <img
                                    src="./img/화상회의.jpg"
                                    alt="concert"
                                    style={{ width: "100%", objectFit: "cover" }}
                                />

                                {/* 🔊 볼륨 조절 UI */}
                                <div className="volume-container">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volume}
                                        onChange={handleChange}
                                        className="volume-slider"
                                    />
                                    <div className="volume-level">{volume}%</div>
                                </div>

                                <div className="video-controls">
                                    <button className="side"><img src="/img/voice.png" alt="" /></button>
                                    <button className="center" style={{ backgroundColor: "#f33e3b" }}><img src="/img/phone.png" alt="" /></button>
                                    <button className="side"><img src="/img/camera.png" alt="" /></button>
                                </div>
                                <div className="seeAll">
                                    <img src="/img/seeAll.png" alt="" />
                                </div>
                            </div>
                        </div>

                        <div className="side-panel">
                            <div className="my-screen">
                                <img src="/img/화상회의2.jpg" alt="pet" style={{ width: "100%", borderRadius: "20px" }} />
                            </div>

                            <div className="chat">
                                <h2>Live Chat</h2>
                                <div className="chat-box">
                                    <div className="chat-message">
                                        <strong>fsfhjkd2134</strong><br />
                                        안녕하세요, 우수수 수업자는 고수예요. 오늘은 월요일. 일주일은 7일입다.
                                    </div>
                                    <div className="chat-message orange">
                                        <strong>fsfhjkd2134</strong><br />
                                        우수수 수업자는 고수예요. 오늘은 월요일입니다.
                                    </div>
                                </div>

                                <div className="chat-input">
                                    <input type="text" placeholder="보낼 메시지를 작성하세요" />
                                    <button>전송<img src="/img/send.png" alt="" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script src="https://kit.fontawesome.com/599a3a7868.js" crossOrigin="anonymous"></script>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Meeting />);
