import React, {useState} from 'react';
import './ProductDetailBottomSideBar.css';
import ReactDOM from "react-dom/client";




function ProductDetailBottomSideBar({title, price, priceBasis, weeklySessions, sessionDuration, contactStartTime, contactEndTime, responseTime}) {


    return (
        <>

            <div className="rightBottom">
                <p>{title}</p>
                <div>
                    <span>{price}원</span>
                    <span>{priceBasis} 당</span>
                </div>

                <div>
                    <span>{sessionDuration}시간</span>
                    <span>주 {weeklySessions}회</span>
                </div>


                <div>
                    <span>상담 가능 시간</span>
                    <span>{contactStartTime}~{contactEndTime}</span>
                </div>

                <div>
                    <span>평균 응답 시간</span>
                    <span>{responseTime}</span>
                </div>


                <div>상담신청하기</div>
            </div>
        </>
    );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <>
//         <ProductDetailBottomSideBar />
//     </>
// );

export default ProductDetailBottomSideBar;