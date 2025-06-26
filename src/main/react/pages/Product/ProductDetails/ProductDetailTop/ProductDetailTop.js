import React, {useEffect, useState} from 'react';
import './ProductDetailTop.css';
import ReactDOM from "react-dom/client";
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import ProductDetail from "../ProductDetail";


function ProductDetailTop({category, title, contactStartTime, contactEndTime, userPrimaryId}) {

    const [userInfo, setUserInfo] = useState(null);
    const [profileImage, setProfileImage] = useState("/img/screen1.jpg");

    useEffect(() => {
        fetch(`/lecture/api/user/info/${userPrimaryId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUserInfo(data.user);
                    setProfileImage(
                        data.user.userProfile && data.user.userProfileMimetype
                            ? `data:${data.user.userProfileMimetype};base64,${data.user.userProfile}`
                            : "/img/profile_default.png"
                    );
                }
            });
    }, [userPrimaryId]);

    return (
        <>

            <div className="topBox">
                <div className="leftTop">
                    <div className="categoryName">{category}</div>
                    <div className="titleName">{title}</div>
                    <div className="scoreName">평점</div>
                    <div className="gosuProfile">
                        <div><img src={profileImage}
                                  alt="프로필이미지"/></div>
                        <div>
                            <div>{userInfo ? userInfo.userNickName : ""}</div>
                            <div>응답 가능 시간: {contactStartTime} ~ {contactEndTime}</div>
                        </div>
                        {/*  문의하기*/}
                        <div></div> 

                    </div>
                </div>
                <div className="rightTop">유저 배너? 이미지?</div>
            </div>
        </>
    );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <>
//         <ProductDetailTop />
//     </>
// );

export default ProductDetailTop;