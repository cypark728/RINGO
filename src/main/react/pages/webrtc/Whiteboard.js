import React, {useEffect, useRef} from "react";
import * as fabric from "fabric";
// import { fabric } from 'fabric';
// import { fabric } from 'fabric';
// import fabric from 'fabric';
import "./WhiteBoard.css";
import io from "socket.io-client";


const socket = io('http://172.30.1.12:8687');

function Whiteboard() {
    const canvasRef = useRef(null);
    const currentTool = useRef("pen");
    const drawing = useRef(false);
    const shapeRef = useRef(null);
    const start = useRef({x: 0, y: 0});
    const color = useRef("#000000");


    const toolbarRef = useRef(null);

    useEffect(() => {
        document.getElementById("colorPicker").oninput = (e) => {
            color.current = e.target.value;

            // 펜이 선택된 상태라면 펜 색상 바로 변경
            if (currentTool.current === "pen" || currentTool.current === "eraser") {
                canvas.freeDrawingBrush.color = color.current;
            }
        };

        const canvasEl = document.getElementById("canvas");

        // 캔버스 크기 동기화
        canvasEl.width = canvasEl.clientWidth;
        canvasEl.height = canvasEl.clientHeight;



        const canvas = new fabric.Canvas("canvas", {
            isDrawingMode: true,
            selection: true,
        });

        canvas.setWidth(canvasEl.clientWidth);
        canvas.setHeight(canvasEl.clientHeight);
        canvasRef.current = canvas;

        document.getElementById("select").onclick = () => {
            currentTool.current = "select";        // 현재 툴은 선택 모드
            canvas.isDrawingMode = false;          // 펜/지우개 끄기
            canvas.selection = true;               // 전체 선택 가능
            canvas.defaultCursor = 'default';      // 커서 일반 모양
        };

        // 기본 펜 설정
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.color = "#000000";
        canvas.freeDrawingBrush.width = 5;

        // ---------------------------소켓 설정----------------------------
        // 소켓 이벤트 수신 (서버에서 받은 그리기 정보 반영)
        const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

        // 🎨 펜 드로잉
        canvas.on("path:created", (e) => {
            const pathData = e.path.toObject(['path','left','top','stroke','strokeWidth','fill','id']);
            socket.emit("draw-path", pathData);
        });

        socket.on("draw-path", (pathObj) => {
            const path = new fabric.Path(pathObj.path, pathObj);
            canvas.add(path);
            canvas.renderAll();
        });

        // 🧱 도형 추가
        canvas.on("object:added", (e) => {
            const obj = e.target;
            if (!obj || obj._isRemote || obj.type === 'path') return;

            obj.id = obj.id || generateId();
            const json = obj.toObject(['id','left','top','width','height','fill','stroke','strokeWidth','radius']);
            socket.emit("add-object", json);
        });

        socket.on("add-object", (objData) => {
            fabric.util.enlivenObjects([objData], (objs) => {
                objs.forEach(o => {
                    o._isRemote = true;
                    canvas.add(o);
                });
                canvas.renderAll();
            });
        });

        // ✏️ 수정 (이동/크기/회전)
        canvas.on("object:modified", (e) => {
            const obj = e.target;
            if (!obj.id) return;
            const data = obj.toObject(['id','left','top','scaleX','scaleY','angle','width','height','radius']);
            socket.emit("modify-object", data);
        });

        socket.on("modify-object", (data) => {
            const obj = canvas.getObjects().find(o => o.id === data.id);
            if (obj) {
                obj.set(data);
                canvas.renderAll();
            }
        });

        // ❌ 삭제
        canvas.on("object:removed", (e) => {
            const obj = e.target;
            if (obj && obj.id) {
                socket.emit("remove-object", obj.id);
            }
        });

        socket.on("remove-object", (id) => {
            const obj = canvas.getObjects().find(o => o.id === id);
            if (obj) {
                canvas.remove(obj);
                canvas.renderAll();
            }
        });

        // 🌀 초기 동기화
        socket.emit("request-canvas-init");
        socket.on("canvas-init", (json) => {
            canvas.loadFromJSON(json, () => canvas.renderAll());
        });

        // 툴 이벤트
        document.getElementById("pen").onclick = () => {
            currentTool.current = "pen";
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
            canvas.freeDrawingBrush.color = color.current;
            canvas.freeDrawingBrush.width = parseInt(document.getElementById("brushWidth").value, 10);
        };

        document.getElementById("eraser").onclick = () => {
            currentTool.current = "eraser";
            canvas.isDrawingMode = true;

            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas); // ← 지우개도 그냥 연필 브러시
            canvas.freeDrawingBrush.color = "#f0f0f0"; // ← 배경색과 같게 = 흰색
            canvas.freeDrawingBrush.width = parseInt(document.getElementById("brushWidth").value, 10);
        };

        document.getElementById("addRect").onclick = () => {
            currentTool.current = "rect";
            canvas.isDrawingMode = false;
        };

        document.getElementById("addCircle").onclick = () => {
            currentTool.current = "circle";
            canvas.isDrawingMode = false;
        };


        document.getElementById("brushWidth").oninput = (e) => {
            canvas.freeDrawingBrush.width = parseInt(e.target.value, 10);
        };

        // 드래그로 도형 생성
        canvas.on("mouse:down", (opt) => {
            if (canvas.getActiveObject()) return;
            if (currentTool.current === "rect" || currentTool.current === "circle") {
                drawing.current = true;
                canvas.selection = false;
                const p = canvas.getPointer(opt.e);
                start.current = {x:p.x, y:p.y};

                const shape = currentTool.current === "rect"
                    ? new fabric.Rect({ left: p.x, top: p.y, width: 0, height: 0, stroke: color.current, fill: '', strokeWidth:2 })
                    : new fabric.Circle({ left: p.x, top: p.y, radius:1, stroke: color.current, fill: '', strokeWidth:2 });

                shapeRef.current = shape;
                canvas.add(shape);
            }
        });

        canvas.on("mouse:move", (opt) => {
            if (!drawing.current || !shapeRef.current) return;
            const p = canvas.getPointer(opt.e);
            const s = shapeRef.current;
            if (currentTool.current === "rect") {
                s.set({ width: Math.abs(p.x - start.current.x), height: Math.abs(p.y - start.current.y),
                    left: Math.min(p.x, start.current.x), top: Math.min(p.y, start.current.y) });
            } else {
                const r = Math.hypot(p.x - start.current.x, p.y - start.current.y)/2;
                s.set({
                    radius: r,
                    left: (p.x + start.current.x)/2 - r,
                    top: (p.y + start.current.y)/2 - r
                });
            }
            canvas.renderAll();
        });

        canvas.on("mouse:up", () => {
            drawing.current = false;
            shapeRef.current = null;
            canvas.selection = true;
        });

        const handleKeyDown = (e) => {
            if (!canvasRef.current) return;

            const canvas = canvasRef.current;
            const activeObject = canvas.getActiveObject();

            if (!activeObject) return;

            if (e.key === "Delete" || e.key === "Backspace" || e.key === "Escape") {
                canvas.remove(activeObject);
                canvas.discardActiveObject(); // 선택 해제
                canvas.requestRenderAll();    // 다시 렌더링
            }
        };

        window.addEventListener("keydown", (e) => {
            if (!canvasRef.current) return;
            const a = canvas.getActiveObject();
            if (a && (e.key === "Delete" || e.key === "Backspace")) {
                canvas.remove(a);
                canvas.renderAll();
            }
        });

        return () => {

            window.removeEventListener("keydown", handleKeyDown);
            socket.off("draw-path");
            socket.off("add-object");
            socket.off("modify-object");
            socket.off("remove-object");
            socket.off("canvas-init");
            canvas.dispose();
        };

    }, []);



    return (
        <div className="whiteboard-container">
            <div className="toolbar" ref={toolbarRef}>
                <button id="select">선택</button>
                <button id="pen">펜</button>
                <button id="eraser">지우개</button>
                <button id="addRect">사각형</button>
                <button id="addCircle">원</button>


                <label>
                    두께:<br/>
                    <input
                        type="range"
                        id="brushWidth"
                        min="1"
                        max="50"
                        defaultValue="5"
                        className="width-slider"
                    />
                </label>
                <label>
                    색상:<br/>
                    <input type="color" id="colorPicker" defaultValue="#000000"/>
                </label>
            </div>
            <canvas id="canvas" className="canvas"></canvas>
        </div>
    );
}

export default Whiteboard;
