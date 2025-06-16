import React from "react";
import './ProductDetailOtherClass.css';
import ReactDOM from "react-dom/client";

function ProductDetailOtherClass() {

    return (
        <section className="section">
            <h2 className="section-title">고수의 다른 수업</h2>
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

export default ProductDetailOtherClass;