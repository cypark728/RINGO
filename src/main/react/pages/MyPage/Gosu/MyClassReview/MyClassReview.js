import React from "react";
import './MyClassReview.css';
import ReactDOM from "react-dom/client";

function MyClassReview() {

    return (
        <section className="section">
            <h2 className="section-title">강의 리뷰</h2>
            <div className="review-list">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="review-item">
                        <div className="exampleImageBlack review-image" />
                        <div>
                            <p className="review-author">사용자{i + 1} • 06/08/2025</p>
                            <p className="review-text">리뷰 내용이 여기에 들어갑니다. 좋은 강의 감사합니다!</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MyClassReview;