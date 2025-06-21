import React, { useEffect, useState} from "react";
import './MyBookmark.css';
import ReactDOM from "react-dom/client";

function MyBookmark() {
    const [myBookmarks, setMyBookmarks] = useState([]);

    useEffect(() => {
        fetch("/api/mypage/mywish?userPrimaryId=789")
        // fetch(`/api/mypage/mywish?userPrimaryId=${userPrimaryId}`) //user id 로 할때
            .then(res => res.json())
            .then(data => {
                console.log("API 응답 결과:", data);
                setMyBookmarks(data);
            })

    }, []);


//     return (
//         <section className="section">
//             <h2 className="section-title">내가 찜한 수업 <span className="section-total">Total {myBookmarks.length}</span></h2>
//             <div className="card-grid">
//
//                 {myBookmarks.map((myBookmark, index) => (
//
//                     console.log('typeof isWish:', typeof myBookmark.isWish, 'value:', myBookmark.isWish);
//                     return (
//
//                     <div key={index} className="card">
//                         <div className="exampleImageBlack">
//                             <div className={`wish ${Boolean(myBookmark.isWish) ? 'wishHeart' : 'notWishHeart'}`}>
//                                 <div>❤️</div>
//                                 <div>🤍</div>
//                             </div>
//                         </div>
//                         <p className="card-title">{myBookmark.recruitmentPostTitle}</p>
//                         <p className="card-desc">{myBookmark.recruitmentPostContent}</p>
//                         <p className="card-price">{myBookmark.recruitmentPostSystime?.slice(0,10)}</p>
//                     </div>
//
//                 );
//             })}
//             </div>
//         </section>
//     )
// }


    return (
        <section className="section">
            <h2 className="section-title">
                내가 찜한 수업 <span className="section-total">Total {myBookmarks.length}</span>
            </h2>
            <div className="card-grid">
                {myBookmarks.map((myBookmark, index) => {
                    // ✅ 여기에 로그 찍기
                    console.log('typeof isWish:', typeof myBookmark.isWish, 'value:', myBookmark.isWish);

                    return (
                        <div key={index} className="card">
                            <div className="exampleImageBlack">
                                <div className={`wish ${myBookmark.isWish === true || myBookmark.isWish === 'true' ? 'wishHeart' : 'notWishHeart'}`}
                                    onClick={() => {
                                        console.log('하트 클릭됨', myBookmark.applyWishId);
                                        const updatedWish = !myBookmark.isWish; //반대로

                                        // 1. UI 업데이트
                                        const newBookmarks = [...myBookmarks]; //배열복사
                                        newBookmarks[index] = {
                                            ...myBookmark,
                                            isWish: updatedWish, //복사한 배열에 updatewish 적용
                                        };

                                        setMyBookmarks(newBookmarks); //위에서 적용한 배열로 화면에 적용(하트 바뀜)

                                        // 2. DB 업데이트 요청
                                        fetch('/api/mypage/updatewish', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                applyWishId: myBookmark.applyWishId, //어떤 찜인지 구분하기 위한 id
                                                isWish: updatedWish, //변경된 찜 상태
                                            }),
                                        })
                                            .then((res) => res.json()) //.then((res) => res.text())
                                            .then((data) => {
                                                console.log('서버 반영 결과:', data);
                                                // 실패 시 롤백 로직도 넣을 수 있음

                                            })



                                            .catch((err) => {
                                                console.error('에러 발생:', err);
                                            });

                                    } }>
                                    <div>❤️</div>
                                    <div>🤍</div>
                                </div>
                            </div>
                            <p className="card-title">{myBookmark.recruitmentPostTitle}</p>
                            <p className="card-desc">{myBookmark.recruitmentPostContent}</p>
                            <p className="card-price">{myBookmark.recruitmentPostSystime?.slice(0, 10)}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default MyBookmark;