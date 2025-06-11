import React, {useEffect, useState} from 'react'; //어느 컴포넌트이든 React임포트가 필요합니다.
import ReactDOM from 'react-dom/client'; //root에 리액트 돔방식으로 렌더링시 필요합니다.
// import SocketJS from "sockjs-client";
import './Chat.css' //css파일 임포트

function Chat({room}) {
    // const socketRef = useRef(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (!message.trim()) return;

        // 내 메시지 추가
        const myMessage = { from: 'me', text: message };
        setMessages(prev => [...prev, myMessage]);

        // 가짜 상대 메시지 1초 후 추가
        setTimeout(() => {
            const replyTime = new Date();
            const fakeReply = {
                from: 'other',
                text: `${message}`,
                time: replyTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            };
            setMessages(prev => [...prev, fakeReply]);
        }, 1000);

        setMessage('');
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

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