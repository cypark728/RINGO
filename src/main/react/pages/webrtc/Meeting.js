import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './Meeting.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import io from 'socket.io-client';
import Chat from "./Chat";
import Code from "./Code";
import Whiteboard from "./Whiteboard";

function Meeting() {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const pcRef = useRef(null);
    const socketRef = useRef(null);

    const [volume, setVolume] = useState(50);

    // 왼쪽 메뉴바
    const [activeIndex, setActiveIndex] = useState(0);

    // 시간
    const [currentTime, setCurrentTime] = useState(new Date());

    // 전체 화면
    const [isFullScreen, setIsFullScreen] = useState(false);

    // 코드
    const [showCode, setShowCode] = useState(false);

    // 화이트보드
    const [showWhiteBoard, setShowWhiteBoard] = useState(false);

    const toggleFullScreen = () => {
        setIsFullScreen(prev => !prev);
    };


    const icons = [
        'fas fa-camera',
        'fas fa-calendar',
        'fas fa-code',
        'fas fa-pencil',

    ];

    // 볼륨 조절
    const handleChange = (e) => {
        setVolume(e.target.value);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000)

        return () => clearInterval(interval)
    }, []);

    const date = currentTime.toISOString().slice(0, 10);
    const time = currentTime.toLocaleTimeString('en-GB')

    useEffect(() => {
        // 1. Socket 서버 연결 (ex: localhost:8080)
        socketRef.current = io('https://172.30.1.12:8181');  // socket.io-client import 필요

        // 2. RTCPeerConnection 생성 (STUN 서버는 필수)
        pcRef.current = new RTCPeerConnection({
            iceServers: [
                {urls: 'stun:stun.l.google.com:19302'}
            ]
        });

        // 3. 내 카메라/마이크 스트림 가져오기
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then(stream => {
                // 내 비디오 화면에 스트림 세팅
                localVideoRef.current.srcObject = stream;

                // RTCPeerConnection에 내 스트림 트랙 추가
                stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));
            })
            .catch(err => {
                console.error('Error accessing media devices.', err);
            });

        // 4. 상대방 스트림 받기 (remoteVideoRef에 연결)
        pcRef.current.ontrack = (event) => {
            // 여러 트랙이 올 수 있으니 첫번째 스트림 가져오기
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        // 5. ICE 후보 처리
        pcRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('ice-candidate', event.candidate);
            }
        };

        // 6. Socket 이벤트 수신 (signaling)
        socketRef.current.on('offer', async (offer) => {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await pcRef.current.createAnswer();
            await pcRef.current.setLocalDescription(answer);
            socketRef.current.emit('answer', answer);
        });

        socketRef.current.on('answer', async (answer) => {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socketRef.current.on('ice-candidate', async (candidate) => {
            try {
                await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (e) {
                console.error('Error adding received ice candidate', e);
            }
        });

        // 7. 방 입장 시 offer 생성 및 전송 (초기 연결 시)
        socketRef.current.emit('join-room', 'roomId'); // roomId는 실제 룸 이름이나 id로 바꾸세요

        socketRef.current.on('ready', async () => {
            const offer = await pcRef.current.createOffer();
            await pcRef.current.setLocalDescription(offer);
            socketRef.current.emit('offer', offer);
        });

        return () => {
            // 컴포넌트 언마운트 시 소켓 연결 해제
            socketRef.current.disconnect();
        };
    }, []);

    console.log("showCode 상태:", showCode);
    console.log("whiteBoard 상태:",activeIndex, showWhiteBoard);
    return (
        <div>
            <div className="container">
                <div className="sidebar">
                    <div className="logo"><img src="/img/logo.png" alt=""/></div>
                    <div className="sidebar-btn">
                        <ul>
                            {icons.map((icon, index) => (
                                <li key={index} className={activeIndex === index ? 'on' : ''}>
                                    <button
                                        className={activeIndex === index ? "action" : ""}
                                        onClick={() => {
                                            setActiveIndex(index);
                                            if (icon === "fas fa-code") {
                                                setShowCode((prev) => !prev);
                                            } else if (icon === "fas fa-pencil") {
                                                setShowWhiteBoard((prev) => !prev);
                                            }
                                        }}
                                    >
                                        <i className={icon}></i>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div className="ai">
                        <div className="tooltip">
                            <p>링고가 고수의 수업을 정리해드릴게요~~~</p>

                        </div>
                        <figure><img src="/img/ai.png" alt=""/></figure>
                    </div>
                </div>

                <div className="wrap">
                    <ul className={`top ${isFullScreen ? 'hidden' : ''}`}>
                        <li>
                            <figure><img src="/img/me.jpg" alt=""/></figure>
                            <div>
                                <p>edfj_56</p>
                                <span>고수</span>
                            </div>

                        </li>
                        <li>
                            <figure><img src="/img/me2.jpg" alt=""/></figure>
                            <div>
                                <p>edfj_567</p>
                                <span>제자</span>
                            </div>

                        </li>
                    </ul>

                    <div className={`contents ${isFullScreen ? 'height' : ''}`}>
                        <div className="main-content">
                            <div className={`header ${isFullScreen ? 'hidden' : ''}`}>
                                <p>{date}</p>
                                <h2>ringo meeting title</h2>
                                <span>  <img
                                    src="/img/clock.png"
                                    alt="clock"
                                /> {time}</span>
                            </div>
                            <div className="video-section">
                                {activeIndex === 2 ? (
                                    <div className="code-container">
                                        <Code/>
                                    </div>
                                ) : activeIndex === 3 && showWhiteBoard ? (
                                    <div className="white-container">
                                        <Whiteboard/>
                                    </div>
                                ) : (
                                    <video
                                        ref={remoteVideoRef}
                                        autoPlay
                                        playsInline
                                        style={{width: "100%", objectFit: "cover", borderRadius: "10px"}}
                                    />
                                )}

                                {/*------------------ 🔊 볼륨 조절 UI----------------- */}
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
                                    <button className="side"><img src="/img/voice.png" alt=""/></button>
                                    <button className="center" style={{backgroundColor: "#f33e3b"}}><img
                                        src="/img/phone.png" alt=""/></button>
                                    <button className="side"><img src="/img/camera.png" alt=""/></button>
                                </div>
                                <div className="seeAll" onClick={toggleFullScreen}>
                                    <img src={isFullScreen ? "/img/seeSmall.png" : "/img/seeAll.png"} alt=""/>
                                </div>
                            </div>
                        </div>

                        <div className={`side-panel ${isFullScreen ? 'hidden' : ''}`}>
                            <div className="my-screen">
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    muted
                                    playsInline
                                    style={{width: "100%", borderRadius: "20px"}}
                                ></video>

                            </div>

                            <Chat/>

                        </div>
                    </div>
                </div>
            </div>

            <script src="https://kit.fontawesome.com/599a3a7868.js" crossOrigin="anonymous"></script>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Meeting/>);
