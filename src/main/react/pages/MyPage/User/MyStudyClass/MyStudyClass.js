import React, {useEffect, useState} from "react";
import './MyStudyClass.css';
import ReactDOM from "react-dom/client";

function MyStudyClass() {
    const [myStudyClass, setMyStudyClass] = useState([]);

    useEffect(() => {
        fetch("/api/mypage/mystudyclass?userId=789") //789 아니고 userid로 할땐 밑에거
        // fetch(`/api/mypage/mystudyclass?userId=${userId}`) //user id 로 할때
            .then(res => res.json())
            .then(data => {
                setMyStudyClass(data);
            })
    })

    return (
        <section className="section">
            <h2 className="section-title">내가 수강중인 수업 <span className="section-total">Total {myStudyClass.length}</span></h2>
            <div className="card-grid">

                {myStudyClass.map((myClass, index) => (
                    <div key={index} className="card">
                        <div className="exampleImageBlack"><img src={"/img/screen1.jpg"} /></div>
                        <p className="card-title">{myClass.recruitmentPostTitle}</p>
                        <p className="card-desc">{myClass.recruitmentPostContent}</p>
                        <p className="card-price">{myClass.classManageStartDate?.slice(2,10)} ~ {myClass.classManageFinishDate?.slice(2,10)}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MyStudyClass;