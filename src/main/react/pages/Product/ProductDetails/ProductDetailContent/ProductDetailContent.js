import React, {useState} from 'react';
import './ProductDetailContent.css';
import ReactDOM from "react-dom/client";

import ProductDetail from "../ProductDetail";


function ProductDetailContent() {


    return (
        <>

            <div>
                {/*여기 root 들어가고 서비스랑 리뷰 둘이 왔다갔다 하게*/}
                <div className="leftService">서비스 설명</div>
                <div>
                    자 여기선 빨간색을 써주시고요 이쪽에서는 초록색 이쪽에서는 파란색을 써줍니다<br/>
                    그리고 흰색으로 여기 위에서 아래로 쓱쓱 내려주시고<br/>
                    여기 검은색으로 알사탕 3개를 그려주세요<br/>
                    거의 다 됐습니다<br/>
                    이제 이걸 뒤집어서....<br/>
                    이런식으로....<br/>
                    <br/>
                    네 됐네요.<br/>
                    <br/>
                    네 완성입니다. 참 쉽죠?
                </div>
                <div>
                    <img src="/img/example_bob.png" alt="밥"/>
                </div>
                
            </div>

        </>
    );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <>
//         <ProductDetailContent />
//     </>
// );

export default ProductDetailContent;