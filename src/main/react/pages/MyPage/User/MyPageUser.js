import React, {useState} from 'react';
import './MyPageUser.css';
import ReactDOM from "react-dom/client";
import LeftBar from "./LeftBar/LeftBar";
import MyStudyClass from "./MyStudyClass/MyStudyClass";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import MyBookmark from "./MyBookmark/MyBookmark";
import MyReview from "./MyReview/MyReview";
import Timetable from "./Timetable/Timetable";
import Example from "./Timetable/example";


export default function MyPageUser() {
    const [activeTab, setActiveTab] = useState("home");

    return (
        <div className="container">
            <div className="content-wrapper">
                {/* Sidebar */}
                <LeftBar activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Main Content */}
                <main className="main">

                    {activeTab === "home" &&
                        <>
                        <MyStudyClass />
                        <MyBookmark />
                        <MyReview />
                        <Timetable />
                        </>
                    }
                    {activeTab === "study" &&
                     // 내가 수강중인 수업
                    <MyStudyClass />
                    }
                    {activeTab === "bookmark" &&
                     // 내가 찜한 수업
                    <MyBookmark />
                    }
                    {activeTab === "review" &&
                     // 내가 작성한 리뷰
                    <MyReview />
                    }
                    {activeTab === "timetable" &&
                        // 시간표
                    <Timetable />
                    }

                    <Example />


                </main>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Header />
        <MyPageUser />
        <Footer />
    </>
);