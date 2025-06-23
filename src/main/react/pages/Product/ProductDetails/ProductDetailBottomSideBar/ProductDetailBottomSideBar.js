import React, {useState} from 'react';
import './ProductDetailBottomSideBar.css';
import ReactDOM from "react-dom/client";




function ProductDetailBottomSideBar() {


    return (
        <>

            <div className="rightBottom">
                <p>수업 타이틀</p>
                <div>
                    <span>8,000원</span>
                    <span>1시간 당</span>
                </div>

                <div>
                    <span>2시간</span>
                    <span>주 1회</span>
                </div>


                <div>
                    <span>상담 가능 시간</span>
                    <span>9시~18시</span>
                </div>

                <div>
                    <span>평균 응답 시간</span>
                    <span>10분 이내</span>
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