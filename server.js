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


let lastCanvasData = null;
let savedCanvasJSON = null;

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


    // 새 사용자에겐 마지막 캔버스 상태 전송
    if (lastCanvasData) {
        socket.emit("canvas-update", lastCanvasData);
    }

    socket.join(socket.handshake.query.roomId);

    socket.on("request-canvas-init", () => {
        if (savedCanvasJSON) {
            socket.emit("canvas-init", savedCanvasJSON);
        }
    });

    socket.on("draw-path", (p) => socket.broadcast.emit("draw-path", p));
    socket.on("add-object", (o) => socket.broadcast.emit("add-object", o));
    socket.on("modify-object", (d) => socket.broadcast.emit("modify-object", d));
    socket.on("remove-object", (id) => socket.broadcast.emit("remove-object", id));

    socket.on("save-canvas", (json) => {
        savedCanvasJSON = json;
    });


    socket.on('disconnect', () => {
        console.log('❌ 유저 연결 종료:', socket.id);
    });
});

// 서버 시작
server.listen(8687, () => {
    console.log('✅ Socket.IO 서버 실행 중: http://localhost:8687');
});
