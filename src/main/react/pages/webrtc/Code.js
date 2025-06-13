import ReactDOM from "react-dom/client"
import Editor from "@monaco-editor/react";
import React from "react";
import './Code.css';


function Code(){

    return(
        <div>
            <Editor
                height="100%"
                defaultLanguage="javascript"
                defaultValue={"// 테스트 코드\nconsole.log('Hello world');"}
                theme="vs-dark"
            />
        </div>
    )
}

export default Code;