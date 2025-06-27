const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = 8687;
const maxClientsPerRoom = 2;
const roomCounts = {};

let lastCanvasData = null;
let savedCanvasJSON = null;

const userMap = {};


// 클라이언트 연결 시
io.on('connection', (socket) => {
    console.log('🔌 누군가 접속했어요!:', socket.id);
    socket.isLeaved = false;

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
        io.to(room).emit('chat-message', `${username}님이 입장했습니다.`);
    });

    socket.on('leave room', (room) => {
        if (socket.isLeaved) return; // 🔒 중복 방지

        const username = userMap[socket.id] || '알 수 없음';
        socket.leave(room);
        io.to(room).emit('chat-message', `${username}님이 퇴장했습니다.`);
        socket.isLeaved = true;
        delete userMap[socket.id];
    });


    // =============✅ 스케줄(TimeTable) 공유 처리===================
    socket.on("schedule-update", ({ roomId, schedule }) => {
        console.log(`📅 스케줄 변경 - 방: ${roomId}`);
        socket.to(roomId).emit("schedule-update", schedule); // 나 제외 모두에게 전송
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
    socket.on("remove-object", (id) => socket.broadcast.emit("remove-object", id));

    socket.on("save-canvas", (json) => {
        savedCanvasJSON = json;
    });


    // =============✅ webRTC 공유 처리===================
    // 추가 (WebRTC signaling용)
    socket.on("join", ({ roomId, userId }) => {
        socket.userId = userId;
        socket.roomId = roomId;

        if (!roomCounts[roomId]) {
            roomCounts[roomId] = 1;
        } else if (roomCounts[roomId] < maxClientsPerRoom) {
            roomCounts[roomId]++;
        } else {
            socket.emit("room-full", roomId);
            return;
        }

        socket.join(roomId);
        console.log(`🟢 User ${userId} joined room ${roomId}`);
    });

    socket.on("rtc-message", (data) => {
        const parsed = JSON.parse(data);
        const room = parsed.roomId;
        socket.to(room).emit("rtc-message", data);
    });

    socket.on('disconnecting', () => {
        if (socket.isLeaved || !userMap[socket.id]) return; // ✅ userMap 없으면 skip

        const username = userMap[socket.id];
        const roomId = socket.roomId;

        if (roomId) {
            socket.to(roomId).emit("chat-message", `${username}님이 퇴장했습니다.`);
            socket.to(roomId).emit("peer-left", { roomId });
        }

        socket.isLeaved = true;
        delete userMap[socket.id];
    });

});

// ==========================서버 시작=================================
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
})