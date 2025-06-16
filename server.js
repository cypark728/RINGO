// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // CORS 허용

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        // methods: ['GET', 'POST']
    }
});

// 클라이언트 연결 시
io.on('connection', (socket) => {
    console.log('🔌 누군가 접속했어요!:', socket.id);

    // 메시지 받기
    socket.on('chat-message', (message) => {
        console.log('📨 받은 메시지:', message);

        // 나 제외한 모든 클라이언트에게 메시지 전송
        socket.broadcast.emit('chat-message', {
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    });

    // ✅ 코드 공유 처리
    socket.on('code-update', (code) => {
        console.log('🧠 코드 업데이트 수신:', code);
        socket.broadcast.emit('code-update', code);
    });



    socket.on('disconnect', () => {
        console.log('❌ 유저 연결 종료:', socket.id);
    });
});

// 서버 시작
server.listen(8687, () => {
    console.log('✅ Socket.IO 서버 실행 중: http://localhost:8687');
});
