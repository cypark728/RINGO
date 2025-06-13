import React, {useEffect, useRef} from "react";
import * as fabric from "fabric";
// import { fabric } from 'fabric';
// import { fabric } from 'fabric';
// import fabric from 'fabric';
import "./WhiteBoard.css";

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

        canvasRef.current = canvas;

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
            canvas.freeDrawingBrush.color = "##f0f0f0"; // ← 배경색과 같게 = 흰색
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

                const pointer = canvas.getPointer(opt.e);
                start.current = {x: pointer.x, y: pointer.y};

                let shape;
                if (currentTool.current === "rect") {
                    shape = new fabric.Rect({
                        left: pointer.x,
                        top: pointer.y,
                        width: 0,
                        height: 0,
                        fill: "",
                        stroke: color.current,
                        strokeWidth: 2,
                        selectable: true,
                    });
                } else {
                    shape = new fabric.Circle({
                        left: pointer.x,
                        top: pointer.y,
                        radius: 1,
                        fill: "",
                        stroke: color.current,
                        strokeWidth: 2,
                        selectable: true,
                    });
                }

                shapeRef.current = shape;
                canvas.add(shape);
            }
        });

        canvas.on("mouse:move", (opt) => {
            if (!drawing.current || !shapeRef.current) return;

            const pointer = canvas.getPointer(opt.e);
            const shape = shapeRef.current;

            if (currentTool.current === "rect") {
                shape.set({
                    width: Math.abs(pointer.x - start.current.x),
                    height: Math.abs(pointer.y - start.current.y),
                    left: Math.min(pointer.x, start.current.x),
                    top: Math.min(pointer.y, start.current.y),
                });
            } else {
                const radius = Math.sqrt(
                    Math.pow(pointer.x - start.current.x, 2) +
                    Math.pow(pointer.y - start.current.y, 2)
                ) / 2;

                shape.set({
                    radius: radius,
                    left: (pointer.x + start.current.x) / 2 - radius,
                    top: (pointer.y + start.current.y) / 2 - radius,
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


        window.addEventListener("keydown", handleKeyDown);

        return () => {

            window.removeEventListener("keydown", handleKeyDown);
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
