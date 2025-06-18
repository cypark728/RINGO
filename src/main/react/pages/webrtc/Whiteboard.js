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

    const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

    const handleKeyDown = (e) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const activeObject = canvas.getActiveObject();

        if (!activeObject) return;

        if (e.key === "Delete" || e.key === "Backspace" || e.key === "Escape") {
            if (!activeObject.id) {
                console.warn("삭제하려는 오브젝트에 id가 없음! 동기화 불가");
                return;
            }

            // 삭제
            canvas.remove(activeObject);
            canvas.discardActiveObject();
            canvas.requestRenderAll();

            // 소켓 전송
            socket.emit("remove-object", { id: activeObject.id });
        }
    };

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
        // const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

        // 🎨 펜 드로잉
        canvas.on("path:created", (e) => {
            const pathData = e.path.toObject(['path','left','top','stroke','strokeWidth','fill','id']);
            socket.emit("draw-path", pathData);
        });

        socket.on("draw-path", (pathObj) => {
            const path = new fabric.Path(pathObj.path, pathObj);
            path.id = pathObj.id || generateId();
            canvas.add(path);
            canvas.renderAll();
        });

        // 🧱 도형 추가
        canvas.on("object:added", (e) => {
            const obj = e.target;
            console.log("도형 추가됨", obj);
        });


        socket.on("add-object", (objData) => {

            const { type, ...rest } = objData; // type만 제거한 새 객체
            console.log("받은 도형 타입~~^^^^:", objData.type);
            let obj = null;

            switch ((type || '').toLowerCase()) {
                case "rect":
                    obj = new fabric.Rect(rest);
                    break;
                case "circle":
                    obj = new fabric.Circle(rest);
                    break;
                case "triangle":
                    obj = new fabric.Triangle(rest);
                    break;
                default:
                    console.warn("알 수 없는 도형 타입ㅠㅠ:", type);
            }

            console.log("도형 받음!!!!!:", objData);
            obj.id = objData.id || generateId();
            obj.scaleX = rest.scaleX || 1;
            obj.scaleY = rest.scaleY || 1;

            obj.setCoords();


            obj._isRemote = true;
            canvas.add(obj);
            canvas.renderAll();
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
            if (canvas.getActiveObject()) return;  // 이미 선택된게 있으면 무시

            if (currentTool.current === "rect" || currentTool.current === "circle") {
                drawing.current = true;
                canvas.selection = false;

                const p = canvas.getPointer(opt.e);
                start.current = { x: p.x, y: p.y };

                const shape = currentTool.current === "rect"
                    ? new fabric.Rect({
                        left: p.x, top: p.y, width: 1, height: 1,
                        stroke: color.current, fill: 'rgba(0,0,0,0.1)', strokeWidth: 2, id: generateId()
                    })
                    : new fabric.Circle({
                        left: p.x, top: p.y, radius: 1,
                        stroke: color.current, fill: 'rgba(0,0,0,0.1)', strokeWidth: 2, id: generateId()
                    });

                shapeRef.current = shape;
                canvas.add(shape);
            }
        });


        canvas.on("mouse:move", (opt) => {
            if (!drawing.current || !shapeRef.current) return;

            const p = canvas.getPointer(opt.e);
            const s = start.current;
            const shape = shapeRef.current;

            if (currentTool.current === "rect") {
                shape.set({
                    width: Math.abs(p.x - s.x),
                    height: Math.abs(p.y - s.y),
                    left: Math.min(p.x, s.x),
                    top: Math.min(p.y, s.y)
                });
            } else if (currentTool.current === "circle") {
                const dx = p.x - s.x;
                const dy = p.y - s.y;
                const radius = Math.sqrt(dx * dx + dy * dy) / 2;

                shape.set({
                    radius,
                    left: (p.x + s.x) / 2,
                    top: (p.y + s.y) / 2
                });
            }

            shape.setCoords();
            canvas.renderAll();
        });


        canvas.on("mouse:up", () => {
            // 1. 드래잉 모드에서 도형 확정
            if (drawing.current && shapeRef.current) {
                const shape = shapeRef.current;
                shape.selectable = true;
                shape.evented = true;

                shape.id = shape.id || generateId();
                shape._wasCreatedNow = true;

                // 약간 딜레이 주고 최신 값 보내기
                setTimeout(() => {
                    const objData = shape.toObject([
                        'id', 'type', 'left', 'top', 'width', 'height', 'fill', 'stroke', 'strokeWidth',
                        'radius', 'rx', 'ry', 'angle', 'scaleX', 'scaleY', 'originX', 'originY'
                    ]);
                    objData.type = objData.type.toLowerCase();
                    if (shape._wasCreatedNow) {
                        socket.emit("add-object", objData);
                        delete shape._wasCreatedNow; // 이후 수정에서는 add가 아니라 modify 되도록
                    } else {
                        socket.emit("modify-object", objData);
                    }
                }, 20);

                console.log("완성된 도형:", shape.toObject());

                drawing.current = false;
                shapeRef.current = null;
                canvas.selection = true;
                canvas.renderAll();
                return;
            }

            // 2. 드래잉 아닌 상태에서, 기존 도형 클릭 후 수정 확정 시도 (필요하면)
            const obj = canvas.getActiveObject();
            if (!obj || obj._isRemote || obj.type === 'path') return;

            obj.id = obj.id || generateId();

            setTimeout(() => {
                const objData = obj.toObject([
                    'id', 'type', 'left', 'top', 'width', 'height', 'fill', 'stroke', 'strokeWidth',
                    'radius', 'rx', 'ry', 'angle', 'scaleX', 'scaleY', 'originX', 'originY'
                ]);
                objData.type = objData.type.toLowerCase();
                if (obj._wasCreatedNow) {
                    socket.emit("add-object", objData);
                    delete obj._wasCreatedNow; // 이걸 여기서도 해줘야 함!
                } else {
                    socket.emit("modify-object", objData);
                }
            }, 20);
        });

        window.addEventListener("keydown", handleKeyDown);

        socket.on("remove-object", ({ id }) => {
            const target = canvas.getObjects().find(obj => obj.id === id);

            if (target) {
                canvas.remove(target);
                canvas.renderAll();
            } else {
                console.warn("삭제 대상 오브젝트를 찾을 수 없습니다. id:", id);
                console.warn("현재 객체 목록:", canvas.getObjects().map(o => o.id));
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
