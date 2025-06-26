import React, { useEffect, useState } from "react";
import './MyStudyClass.css';

function MyStudyClass({ showAll = false, setActiveTab }) {
    const [myStudyClass, setMyStudyClass] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            //  로그인 유저 정보 요청
            const userRes = await fetch('/users/api/user/info', { credentials: 'include' });
            const userData = await userRes.json();
            if (!userData.success) {

                setLoading(false);
                return;
            }
            const userPrimaryId = userData.user.userPrimaryId;

            // 전체 개수 fetch
            const countRes = await fetch(`/api/mypage/mystudyclass/count?userPrimaryId=${userPrimaryId}`);
            const countData = await countRes.json();
            setTotalCount(countData.count);

            // 해당 유저의 수강중인 수업 목록 요청
            const url = showAll
                ? `/api/mypage/mystudyclass?userPrimaryId=${userPrimaryId}`
                : `/api/mypage/mystudyclass/latest3?userPrimaryId=${userPrimaryId}`;

            const classRes = await fetch(url);
            const classData = await classRes.json();
            setMyStudyClass(Array.isArray(classData) ? classData : []);
            setLoading(false);
        };

        fetchData();
    }, [showAll]);

    if (loading) return <div>로딩중...</div>;

    return (
        <section className="section">
            <h2 className="section-title">
                내가 수강중인 수업 <span className="section-total">Total {totalCount}</span>
            </h2>
            <div className="card-grid">
                {myStudyClass.map((myClass, index) => (
                    <div key={index} className="card">
                        <div className="exampleImageBlack">
                            <img src={"/img/screen1.jpg"} alt="수업 이미지" />
                        </div>
                        <p className="card-title">{myClass.recruitmentPostTitle}</p>
                        <p className="card-desc">{myClass.recruitmentPostContent}</p>
                        {/*<p className="card-price">*/}
                        {/*    {myClass.classManageStartDate?.slice(2, 10)} ~ {myClass.classManageFinishDate?.slice(2, 10)}*/}
                        {/*</p>*/}
                    </div>


                ))}
                {totalCount > 3 && !showAll && (
                    <>
                        <div className="blank"></div>
                        <figure onClick={() => setActiveTab && setActiveTab("study")}>
                            <img src={"/img/right.png"} alt="더보기" />
                        </figure>
                    </>
                )}
            </div>
        </section>
    );
}

export default MyStudyClass;