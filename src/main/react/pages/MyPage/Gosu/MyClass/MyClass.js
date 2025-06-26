import React, {useState, useEffect} from "react";
import './MyClass.css';
import ReactDOM from "react-dom/client";
import RoomCreatePopup from "../Popup/RoomCreatePopup";
import PasswordPopup from "../Popup/PasswordPopup";

function MyClass({ showAll = false, setActiveTab }) {
    const [showPopup, setShowPopup] = useState(false);
    const [classes, setClasses] = useState([]);

    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const displayedClasses = showAll ? classes : classes.slice(0, 3);

    // const fetchClasses = async () => {
    //     const res = await fetch('/api/classes');
    //     const data = await res.json();
    //     setClasses(data);
    // };

    const fetchClasses = async () => {
        const res = await fetch('/api/classes', {
            method: 'GET',
            credentials: 'include'  // 세션 쿠키 포함
        });
        const data = await res.json();
        setClasses(data);
    };



    const handleCardClick = (classItem) => {
        if (classItem.password) {
            setSelectedClass(classItem);
            setShowPasswordPopup(true);
        } else {
            window.location.href = `/meeting.do?roomId=${classItem.roomId}`;
        }
    };

    const handlePasswordSubmit = (enteredPassword) => {
        if (enteredPassword === selectedClass.password) {
            window.location.href = `/meeting.do?roomId=${selectedClass.roomId}`;
        } else {
            alert("비밀번호가 틀렸습니다.");
            setShowPasswordPopup(false);
        }
    };


    useEffect(() => {

        fetchClasses();

    }, []);

    return (
        <section className="section">
            <h2 className="section-title">내가 수업중인 수업 <span className="section-total">Total {classes.length}</span></h2>
            <div className="card-grid">
                {displayedClasses.map((classItem, i) => (
                    <div key={i} className="card"
                         onClick={() => handleCardClick(classItem)}
                    >
                        <div className="exampleImageBlack">
                            <img src={classItem.imageUrl} alt="class" />
                        </div>
                        <p className="card-title">{classItem.title}</p>
                        <p className="card-desc">{classItem.description}</p>
                        <p className="card-price">${classItem.price}</p>
                    </div>
                ))}
                {classes.length > 3 && !showAll && setActiveTab && (
                    <>
                        <div className="blank"></div>
                        <figure onClick={() => setActiveTab && setActiveTab("study")}>
                            <img src={"/img/right.png"} alt="더보기" />
                        </figure>
                    </>
                )}
            </div>
            <div className="makeClassBtn">
                <button className="roomBtn" onClick={() => setShowPopup(true)}>방 만들기</button>
            </div>
            {showPopup && (
                <RoomCreatePopup
                    onClose={() => setShowPopup(false)}
                    onClassCreate={(newClass) => setClasses(prev => [newClass, ...prev])}
                />
            )}
            {showPasswordPopup && (
                <PasswordPopup
                    onClose={() => setShowPasswordPopup(false)}
                    onSubmit={handlePasswordSubmit}
                />
            )}

        </section>
    )
}

export default MyClass;