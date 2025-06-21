import React, {useEffect, useState} from "react";
import './MyReview.css';
import ReactDOM from "react-dom/client";

function MyReview() {
    const [myReview, setMyReview] = useState([]);

    useEffect(() => {
        fetch("/api/mypage/myreview?userPrimaryId=789")
            // fetch(`/api/mypage/myreview?userPrimaryId=${userPrimaryId}`) //userPrimaryId로 할때
            .then(res => res.json())
            .then(data => {
                console.log("리뷰 응답:", data);
                setMyReview(data);
            })
    }, [])

    return (
        <section className="section">
            <h2 className="section-title">내가 작성한 리뷰</h2>
            <div className="review-list">


                {myReview.map((myReview, index) => (
                    <div key={index} className="review-item">
                        <div className="exampleImageBlack review-image" />
                        <div>
                            <p className="review-text">{myReview.recruitmentReviewTitle}</p>
                            <p className="review-author">{myReview.userNickName} • ⭐{myReview.recruitmentReviewScore}<span className="reviewTime">{myReview.recruitmentReviewTime?.slice(0,10)}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MyReview;