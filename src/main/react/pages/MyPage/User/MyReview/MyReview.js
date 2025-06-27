import React, { useEffect, useState } from "react";
import './MyReview.css';

function MyReview({ showAll = false, setActiveTab }) {
    const [myReview, setMyReview] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        // 유저 정보 요청
        fetch('/users/api/user/info')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const user = data.user;
                    // 내 리뷰 목록 요청
                    fetch(`/api/mypage/myreview?userPrimaryId=${user.userPrimaryId}`)
                        .then(res => res.json())
                        .then(reviewData => {
                            setMyReview(Array.isArray(reviewData) ? reviewData : []);
                        });
                }
            })
            .catch(error => {
                console.error('유저 정보 요청 실패:', error);
            });
    }, []);

    const displayedReviews = showAll ? myReview : myReview.slice(0, 3);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="section">
            <h2 className="section-title">내가 작성한 리뷰</h2>
            <div className="review-list">
                {displayedReviews.length === 0 && (
                    <div className="review-empty">작성한 리뷰가 없습니다.</div>
                )}
                {displayedReviews.map((review, index) => (
                    <div
                        key={index}
                        className="review-item"
                        onClick={() => handleToggle(index)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="reviewProfileAndTitle">
                            <div className="exampleImageBlack review-image">
                                {review.userProfileImage ? (
                                    <img
                                        src={review.userProfileImage}
                                        alt="유저프로필 사진"
                                    />
                                ) : (
                                    <img
                                        src="/img/profile_default.png"
                                        alt="기본프로필 사진"
                                    />
                                )}
                            </div>
                            <div>
                                <p className="review-author">{review.recruitmentReviewTitle}</p>
                                <p className="review-text">
                                    <span>{review.userNickName} • </span>
                                    <span className="text-time">{review.recruitmentReviewTime?.slice(0, 10)}</span>
                                </p>
                            </div>
                        </div>
                        <div className={`review-content ${activeIndex === index ? "active" : ""}`}>
                            <p>{review.recruitmentReviewContent}</p>
                        </div>
                    </div>
                ))}
                {myReview.length > 3 && !showAll && setActiveTab && (
                    <>
                        <div className="blank"></div>
                        <figure onClick={() => setActiveTab("review")}>
                            <img src={"/img/right.png"} alt="더보기" />
                        </figure>
                    </>
                )}
            </div>
        </section>
    );
}

export default MyReview;