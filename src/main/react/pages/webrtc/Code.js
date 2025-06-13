import ReactDOM from "react-dom/client"
import Editor from "@monaco-editor/react";
import React, {useEffect, useRef, useState} from "react";
import './Code.css';
import  io  from 'socket.io-client';


const socket = io('http://172.30.1.12:8687');

function Code(){

    const [code, setCode] = useState("// 시작 코드\nconsole.log('hello~~')");
    const preventLoop = useRef(false); // 내가 보낸 메시지인지 확인용

    useEffect(() => {
        // 상대방 코드 수신
        socket.on("code-update", (newCode) => {
            if (!preventLoop.current) {
                setCode(newCode);
            }
        });

        return () => socket.off("code-update");
    }, []);

    const handleChange = (value) => {
        setCode(value);
        preventLoop.current = true;
        socket.emit("code-update", value);
        setTimeout(() => preventLoop.current = false, 100); // 잠시 후 자기 코드 반영 허용
    };

    return(
        <div>
            <Editor
                height="100%"
                defaultLanguage="java"
                defaultValue={"// 테스트 코드ㅋ\nconsole.log('Hello world~~');"}
                theme="vs-dark"
            />
        </div>
    )
}

export default Code;