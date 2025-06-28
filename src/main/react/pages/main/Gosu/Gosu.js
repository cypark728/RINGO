import React from "react";
import "./Gosu.css";

const Gosu = () => {
    const handleGosuJoin = async () => {
        try {
            const res = await fetch("/users/api/user/info");
            const data = await res.json();

            if (data.success && data.user) {
                // 로그인 되어 있으면 마이페이지로 이동
                window.location.href = "/mypage/mypageuser";
            } else {
                // 로그인 안 되어 있으면 로그인 페이지로 이동
                window.location.href = "/users/login";
            }
        } catch (error) {
            // 요청 실패시 로그인 페이지로 이동 (예: 네트워크 오류 등)
            window.location.href = "/users/login";
        }
    };

    return (
        <div className="gosu-root">
            <div className="gosu-inner">
                <div className="gosu-left">
                    <div className="gosu-title">
                        전문가로 활동하시나요?<br />
                        링고에서 당신의 능력을<br />
                        펼쳐보세요.
                    </div>
                    <button className="gosu-btn" onClick={handleGosuJoin}>고수가입</button>
                </div>
                <div className="gosu-right">
                    <img src="/img/leftArrow.png" alt="왼쪽 화살표" className="gosu-arrow gosu-arrow-left" />
                    <div className="gosu-card">
                        <img
                            className="gosu-card-img"
                            src="/img/gosu-card-example.png"
                            alt="고수 제안 예시"
                        />
                        <div className="gosu-card-desc">
                            조건이 맞는 고객에게 제안을 보내세요!
                        </div>
                    </div>
                    <img src="/img/rightArrow.png" alt="오른쪽 화살표" className="gosu-arrow gosu-arrow-left" />
                </div>
            </div>
        </div>
    );
};

export default Gosu;
