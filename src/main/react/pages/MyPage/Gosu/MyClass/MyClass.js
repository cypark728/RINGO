import React from "react";
import './MyClass.css';
import ReactDOM from "react-dom/client";

function MyClass() {

    return (
        <section className="section">
            <h2 className="section-title">내가 수업중인 수업 <span className="section-total">Total 3</span></h2>
            <div className="card-grid">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="card">
                        <div className="exampleImageBlack"><img src={"/img/screen1.jpg"} /></div>
                        <p className="card-title">Java Advanced Part.{i + 1}</p>
                        <p className="card-desc">김영한의 실전 자바 - 고급 {i + 1}편, ...</p>
                        <p className="card-price">$59.40</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MyClass;