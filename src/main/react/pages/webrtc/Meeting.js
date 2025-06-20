import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './Meeting.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import io from 'socket.io-client';
import Chat from "./Chat";
import Code from "./Code";
import Whiteboard from "./Whiteboard";
import AIPopup from "./AIPopup";
import ExitConfirmPopup from "./ExitConfirmPopup";

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


    // ai 녹음
    const [recording, setRecording] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [showTooltip, setShowTooltip] = useState(true);
    const timerRef = useRef(null);
    const chunksRef = useRef([]);

    const [aiResponse, setAiResponse] = useState(null);

    const [currentUserNickname] = useState("익명사용자");

    const [showExitPopup, setShowExitPopup] = useState(false);
    const [exitTarget, setExitTarget] = useState(null);


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
        socketRef.current = io('https://0d19-218-153-162-9.ngrok-free.app');  // socket.io-client import 필요

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

                socketRef.current.emit('join-room', 'roomId');
            })
            .catch(err => {
                console.error('Error accessing media devices.', err);
            });

        // 4. 상대방 스트림 받기 (remoteVideoRef에 연결)
        pcRef.current.ontrack = (event) => {
            console.log("상대방스트림받기",event);
            // 여러 트랙이 올 수 있으니 첫번째 스트림 가져오기
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        // 5. ICE 후보 처리
        pcRef.current.onicecandidate = (event) => {
            console.log("❄️ ICE candidate 생성됨:", event.candidate);
            if (event.candidate) {
                socketRef.current.emit('ice-candidate', event.candidate);
            }
        };

        // 6. Socket 이벤트 수신 (signaling)
        socketRef.current.on('offer', async (offer) => {
            console.log("📨 offer 수신:", offer);
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await pcRef.current.createAnswer();
            await pcRef.current.setLocalDescription(answer);
            socketRef.current.emit('answer', answer);
        });

        socketRef.current.on('answer', async (answer) => {
            console.log("📩 answer 수신:", answer);
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
        // socketRef.current.emit('join-room', 'roomId'); // roomId는 실제 룸 이름이나 id로 바꾸세요

        socketRef.current.on('ready', async () => {
            console.log("🟢 상대방이 연결되어 ready 상태!");
            const offer = await pcRef.current.createOffer();
            await pcRef.current.setLocalDescription(offer);
            socketRef.current.emit('offer', offer);
        });

        return () => {
            // 컴포넌트 언마운트 시 소켓 연결 해제
            socketRef.current.disconnect();
        };
    }, []);


    // 초를 mm:ss 형식으로 포맷팅
    const formatTime = (sec) => {
        const minutes = String(Math.floor(sec / 60)).padStart(2, "0");
        const seconds = String(sec % 60).padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const handleStartRecording = async () => {
        try {
            setShowTooltip(false);
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);
            chunksRef.current = [];

            recorder.ondataavailable = (e) => {
                chunksRef.current.push(e.data);
            };

            recorder.onstop = async () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                // const file = new File([blob], "audio.webm", { type: "audio/webm" });

                setSeconds(0); // 타이머 리셋
                clearInterval(timerRef.current);
                setRecording(false);
                setShowTooltip(true);

                // 🔁 백엔드로 전송해서 텍스트 받아오기 (STT)
                const formData = new FormData();
                // formData.append("file", file);
                formData.append("file", blob, "audio.webm");
                formData.append("speaker", currentUserNickname);


                try {
                    const res = await fetch("/stt/upload", {
                        method: "POST",
                        body: formData,
                    });
                    const text = await res.text();
                    setAiResponse(text); // 팝업 띄우기
                } catch (error) {
                    console.error("STT 처리 실패", error);
                    setAiResponse("음성 인식에 실패했습니다.");
                }
            };

            recorder.start();
            setRecording(true);

            // 타이머 시작
            timerRef.current = setInterval(() => {
                setSeconds((prev) => {
                    if (prev + 1 >= 180) {
                        // 180초 (3분) 넘으면 자동 중지
                        if (mediaRecorder && mediaRecorder.state === "recording") {
                            mediaRecorder.stop();
                        }
                        clearInterval(timerRef.current);
                        return 180; // 최대 180까지만
                    }
                    return prev + 1;
                });
            }, 1000);

        } catch (err) {
            console.error("마이크 권한 오류", err);
        }
    };

    const handleStopRecording = async () => {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
        }
        setRecording(false);

        clearInterval(timerRef.current);
        setSeconds(0);
    };

    useEffect(() => {
        return () => clearInterval(timerRef.current); // 컴포넌트 언마운트 시 타이머 정리
    }, []);


    const handleCenterClick = () => {
        setExitTarget('/mypage/mypageuser');
        setShowExitPopup(true);
    };

    const handleLogoClick = () => {
        setExitTarget('/main.do');
        setShowExitPopup(true);
    };

    const handleExitConfirm = () => {
        if (exitTarget) {
            window.location.href = exitTarget;
        }
    };

    const handleExitCancel = () => {
        setShowExitPopup(false);
        setExitTarget(null);
    };

    return (
        <div>
            <div className="container">
                <div className="sidebar">
                    <div className="logo"><img src="/img/logo.png" alt="" onClick={handleLogoClick}/></div>
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

                        {aiResponse && (
                            <AIPopup message={aiResponse} onClose={() => setAiResponse(null)}/>
                        )}


                        <div>
                            {recording && (
                                <div style={{
                                    padding: "5px 10px",
                                    borderRadius: "8px",
                                    display: "inline-block"
                                }}>
                                    ⏺️ {formatTime(seconds)}
                                </div>
                            )}

                            {recording && (
                                <button onClick={handleStopRecording}
                                        style={{marginTop: "10px", display: "inline-block"}}>
                                    <i className="fas fa-stop"></i>
                                </button>
                            )}


                        </div>
                        {showTooltip && (
                            <div className="tooltip">
                                <p>링고가 고수의 수업을 정리해드릴게요!<br/>녹음은 3분까지 가능합니다.⏳</p>
                            </div>
                        )}
                        <figure onClick={handleStartRecording}><img src="/img/ai.png" alt=""/></figure>
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
                                <p>edfj_5678</p>
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
                                        src="/img/phone.png" alt="" onClick={handleCenterClick}/></button>
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
            {showExitPopup && (
                <ExitConfirmPopup
                    message="회의방을 나가면 다시 입장해야 합니다. 정말 나가시겠습니까?"
                    onConfirm={handleExitConfirm}
                    onCancel={handleExitCancel}
                />
            )}

            <script src="https://kit.fontawesome.com/599a3a7868.js" crossOrigin="anonymous"></script>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Meeting/>);
