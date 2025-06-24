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


    const [roomId, setRoomId] = useState(window.roomId || '');

    const [meetingTitle] = useState(window.meetingTitle || 'Ringo Meeting');

    const [userId] = useState(window.userId || 'guest');


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

    const createOfferAndSend = async () => {
        const pc = pcRef.current;
        const socket = socketRef.current;
        if (!pc || !socket) return;

        // 미디어 트랙 추가
        let myStream = localVideoRef.current?.srcObject;
        if (!myStream) {
            try {
                myStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localVideoRef.current.srcObject = myStream;
            } catch (err) {
                alert("카메라/마이크 권한이 필요합니다.");
                return;
            }
        }
        myStream.getTracks().forEach(track => pc.addTrack(track, myStream));

        // offer 생성 및 전송
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("rtc-message", JSON.stringify({
            roomId,
            event: "offer",
            data: offer,
        }));
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
        if (window.roomId && window.roomId.trim() !== "") {
            setRoomId(window.roomId);
        } else {
            alert("방 ID가 없습니다.");
            window.location.href = "/";  // 방 ID 없으면 홈으로 이동하거나 적절한 처리
        }
    }, []);


    useEffect(() => {
        console.log('✅ Meeting.js loaded', window.roomId);

        if (!roomId) return;

        const socket = io("http://172.30.1.12:8687");
        socketRef.current = socket;

        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });
        pcRef.current = pc;

        let myStream;

        // ✅ 컴포넌트 로드시 항상 내 미디어 먼저 가져오기 (내 화면 표시용)
        (async function initMyMedia() {
            try {
                myStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localVideoRef.current.srcObject = myStream;
            } catch (err) {
                console.error("🎥 내 미디어 가져오기 실패", err);
            }
        })();

        // 상대방과 연결할 때 다시 트랙을 붙이기 위해 별도 함수로 보관
        async function getMediaAndAttachTracks() {
            try {
                if (!myStream) {
                    myStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                    localVideoRef.current.srcObject = myStream;
                }
                myStream.getTracks().forEach(track => pc.addTrack(track, myStream));
            } catch (e) {
                console.error("🎥 미디어 가져오기 실패", e);
            }
        }


        // 2. 메시지 전송 함수
        const sendMessage = (message) => {
            socket.emit("rtc-message", JSON.stringify({
                roomId,
                ...message,
            }));
        };

        // 3. ICE 후보 전송
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                sendMessage({
                    event: "candidate",
                    data: event.candidate,
                });
            }
        };

        // 4. 상대방 스트림 수신
        pc.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };


        // 5. socket 메시지 처리
        socket.on("rtc-message", async (raw) => {
            const msg = JSON.parse(raw);
            if (msg.event === "offer") {
                console.log("📨 offer 수신");
                await getMedia();
                await pc.setRemoteDescription(new RTCSessionDescription(msg.data));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                sendMessage({
                    event: "answer",
                    data: answer,
                });
            } else if (msg.event === "answer") {
                console.log("📩 answer 수신");
                await pc.setRemoteDescription(new RTCSessionDescription(msg.data));
            } else if (msg.event === "candidate") {
                try {
                    await pc.addIceCandidate(new RTCIceCandidate(msg.data));
                } catch (err) {
                    console.error("ICE 추가 실패", err);
                }
            }
        });

        // 6. 방 입장
        socket.emit("join", roomId);

        // 7. 방 입장 후 offer 보내기
        socket.on("room-joined", async () => {
            console.log("🟢 방에 누군가 입장함, offer 생성");
            // await getMedia();
            // const offer = await pc.createOffer();
            // await pc.setLocalDescription(offer);
            // sendMessage({
            //     event: "offer",
            //     data: offer,
            // });
        });

        socket.on("room-full", () => {
            alert("이 방은 이미 두 명이 참가했습니다.");
        });

        return () => {
            // 컴포넌트 언마운트 시 소켓 연결 해제
            socket.disconnect();
            pc.close();
        };
    }, [roomId]);


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
                                <p>{userId}</p>
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
                                <h2>{meetingTitle}</h2>
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

                                    <button className="center" style={{backgroundColor: "#f33e3b"}}><img
                                        src="/img/phone.png" alt="" onClick={handleCenterClick}/></button>

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
                                <div className="my-screen-box">
                                    <button className="side"><img src="/img/voice.png" alt=""/></button>
                                    <button className="side" onClick={createOfferAndSend}><img src="/img/camera.png" alt=""/></button>
                                </div>
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
