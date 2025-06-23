// server.js
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

const userMap = {};


const app = express();
app.use(cors()); // CORS 허용

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // methods: ['GET', 'POST']
    }
});


let lastCanvasData = null;
let savedCanvasJSON = null;

const maxClientsPerRoom = 2;
const roomCounts = {};


// 클라이언트 연결 시
io.on('connection', (socket) => {
    console.log('🔌 누군가 접속했어요!:', socket.id);

    // =============✅ 채팅 공유 처리===================
    // 메시지 받기
    socket.on('chat-message', (message) => {
        console.log('📨 받은 메시지:', message);

        // 나 제외한 모든 클라이언트에게 메시지 전송
        socket.broadcast.emit('chat-message', {
            text: message, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        });
    });

    socket.on('join room', ({ room, username }) => {
        socket.join(room);
        userMap[socket.id] = username;
        io.to(room).emit('chat message', `${username} 입장했습니다.`);
    });

    socket.on('leave room', (room) => {
        const username = userMap[socket.id] || '알 수 없음';
        socket.leave(room);
        io.to(room).emit('chat message', `${username} 퇴장했습니다.`);
        delete userMap[socket.id];
    });


    // =============✅ 코드 공유 처리===================
    socket.on('code-update', (code) => {
        console.log('🧠 코드 업데이트 수신:', code);
        socket.broadcast.emit('code-update', code);
    });


    // =============✅ 화이트보드 공유 처리===================
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
    socket.on("remove-object", (id) => socket.broadcast.emit("remove-obj ect", id));

    socket.on("save-canvas", (json) => {
        savedCanvasJSON = json;
    });

    // =============✅ webRTC 공유 처리===================
    // 추가 (WebRTC signaling용)
    socket.on("join", (roomId) => {
        // 클라이언트가 Room에 조인하려고 할 때, 클라이언트 수를 확인하고 제한.
        if (roomCounts[roomId] === undefined) {
            roomCounts[roomId] = 1;
        } else if (roomCounts[roomId] < maxClientsPerRoom) {
            roomCounts[roomId]++;
        } else {
            // 클라이언트 수가 제한을 초과하면 클라이언트를 Room에 입장시키지 않음.
            socket.emit("room-full", roomId);
            console.log("room full" + roomCounts[roomId]);
            return;
        }
        socket.join(roomId);
        console.log(
            "User joined in a room : " + roomId + " count:" + roomCounts[roomId]
        );

        // 클라이언트가 Room을 떠날 때 클라이언트 수를 업데이트
        socket.on("disconnect", () => {
            console.log('❌ 유저 연결 종료:', socket.id);
            roomCounts[roomId]--;
            console.log("disconnect, count:" + roomCounts[roomId]);
        });
    });

    socket.on("rtc-message", (data) => {
        var room = JSON.parse(data).roomId;
        socket.broadcast.to(room).emit("rtc-message", data);
    });

    // =================== 연결 종료===========================

});

// ==========================서버 시작=================================
server.listen(8687, () => {
    console.log('✅ Socket.IO 서버 실행 중: http://localhost:8687');

});
