import React, {useEffect, useRef, useState} from 'react'; //어느 컴포넌트이든 React임포트가 필요합니다.
import ReactDOM from 'react-dom/client'; //root에 리액트 돔방식으로 렌더링시 필요합니다.
// import SocketJS from "sockjs-client";
import './Chat.css' //css파일 임포트
import { io }  from 'socket.io-client';


const socket = io('172.30.1.12:8687');

function Chat({room}) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);


    useEffect(() => {
        // 메시지 수신
        socket.on('chat-message', (msg) => {
            setMessages(prev => [...prev, { from: 'other', ...msg }]);
        });

        socket.emit('join room', { room, username: '고수' });

        return () => socket.off('chat-message');
    }, []);

    const sendMessage = () => {
        if (!message.trim()) return;

        const myMsg = {
            from: 'me',
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, myMsg]);
        socket.emit('chat-message', message);
        setMessage('');
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="chat">
            <h2>Live Chat</h2>

            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${msg.from === 'me' ? 'orange' : ''}`}
                    >
                        <strong>{msg.from === 'me' ? '나' : '상대'}</strong><br />
                        {msg.text}
                        <div className="chat-time">{msg.time}</div>
                    </div>

                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    placeholder="보낼 메시지를 작성하세요"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyUp={handleEnter}
                />
                <button onClick={sendMessage}>
                    <img src="/img/send.png" alt="보내기" />
                </button>
            </div>

        </div>

    )
}


export default Chat;