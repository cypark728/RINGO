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
import FinishClass from "./FinishClass/FinishClass";


export default function MyPageUser({onConvert}) {
    const [activeTab, setActiveTab] = useState("home");

    return (
        <div className="container">
            <div className="content-wrapper">
                {/* Sidebar */}
                <LeftBar activeTab={activeTab} setActiveTab={setActiveTab} onConvert={onConvert} />

                {/* Main Content */}
                <main className="main">

                    {activeTab === "home" &&
                        <>
                            <MyStudyClass showAll={false} setActiveTab={setActiveTab} />
                            <FinishClass showAll={false} setActiveTab={setActiveTab}/>
                            <MyBookmark />
                            <MyReview />
                            <Timetable />
                        </>
                    }
                    {activeTab === "study" &&
                        <MyStudyClass showAll={true} />
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
                    {activeTab === "finish" &&
                        // 수강완료
                    <FinishClass showAll={true}/>
                    }

                    {/*<Example />*/}


                </main>
            </div>
        </div>
    );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <>
//         <Header />
//         <MyPageUser />
//         <Footer />
//     </>
// );