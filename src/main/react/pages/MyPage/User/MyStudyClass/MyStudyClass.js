import React, { useEffect, useState } from "react";
import './MyStudyClass.css';

function MyStudyClass() {
    const [myStudyClass, setMyStudyClass] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            //  로그인 유저 정보 요청
            const userRes = await fetch('/users/api/user/info', { credentials: 'include' });
            const userData = await userRes.json();
            if (!userData.success) {
                alert("로그인이 필요합니다.");
                setLoading(false);
                return;
            }
            const userPrimaryId = userData.user.userPrimaryId;

            // 해당 유저의 수강중인 수업 목록 요청
            const classRes = await fetch(`/api/mypage/mystudyclass?userPrimaryId=${userPrimaryId}`);
            const classData = await classRes.json();
            console.log(classData); // 실제 데이터 구조 확인
            setMyStudyClass(Array.isArray(classData) ? classData : []);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) return <div>로딩중...</div>;

    return (
        <section className="section">
            <h2 className="section-title">
                내가 수강중인 수업 <span className="section-total">Total {myStudyClass.length}</span>
            </h2>
            <div className="card-grid">
                {myStudyClass.map((myClass, index) => (
                    <div key={index} className="card">
                        <div className="exampleImageBlack">
                            <img src={"/img/screen1.jpg"} alt="수업 이미지" />
                        </div>
                        <p className="card-title">{myClass.recruitmentPostTitle}</p>
                        <p className="card-desc">{myClass.recruitmentPostContent}</p>
                        <p className="card-price">
                            {myClass.classManageStartDate?.slice(2, 10)} ~ {myClass.classManageFinishDate?.slice(2, 10)}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MyStudyClass;