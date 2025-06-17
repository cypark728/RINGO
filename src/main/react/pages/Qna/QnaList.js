import React, { useState } from "react";
import "./QnaList.css";
import { BiChevronDown, BiChevronLeft, BiChevronRight, BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import ReactDOM from "react-dom/client";
import NoticeList from "../Notice/NoticeList";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";


export default function QnaList() {

    const [active, setActive] = useState(true);
    const [postActive, setPostActive] = useState(null); //사용자가 몇 번째 질문을 열었는지 기억하는 state / 초기값은 null
    const [qnaActive, setQnaActive] = useState(null);

    // function changeTab() {
    //     setActive(!active);
    // }

    function changeStudentTab() {
        setActive(true);
        setPostActive(null);
    }

    function changeTeacherTab() {
        setActive(false);
        setPostActive(null);
    }

    const downPost = (index) => {
        setPostActive((prev) => (prev === index ? null : index));
    }

    const downQna = (index) => {
        setQnaActive((prev) => (prev === index ? null : index));
    }


    return (

        <div className="QnaAllBox">
            {/*제목/검색/아이콘*/}
            <div className="contentTopBox">
                <div className="textContentArea">
                    <div>
                        <p>RINGO에 물어보세요</p>
                    </div>
                    <div className="qwer">
                        <input type="text" className="qnaSearch" id="qnaSearchKeyword" placeholder="키워드를 검색하세요"/>
                        <img src="/img/Search_1.png" alt="검색" className="search-iconTwo"/>
                    </div>
                </div>
                <div className="imgContentArea">
                    <div>
                        <img src="/img/headsetandtalk.png" alt="문의리스트"/>
                    </div>
                </div>

            </div>

            {/*자주묻는질문*/}
            <div className="contentMiddleBox">
                <div className="contentMiddleHeader">
                    <div className="contentMiddleTitle">자주 묻는 질문
                        <div className="contentMiddleSubtitle">FAQ</div>
                    </div>

                    <div className="contentMiddleMore">더보기></div>

                </div>
                <div>
                    <div className="contentMiddleBody">
                        <div
                            className={active ? "FAQContentStudentTabActive" : "FAQContentStudentTab"}
                            onClick={changeStudentTab}>
                            제자
                        </div>

                        <div
                            className={active ? "FAQContentTeacherTab" : "FAQContentTeacherTabActive"}
                            onClick={changeTeacherTab}>
                            고수
                        </div>
                    </div>
                    <div className="FAQContentBox">
                        {/*// <!-- 제자자 -->*/}
                        <div className={active ? "FAQContentBoxStudentActive" : "FAQContentBoxStudent"}>
                            {[
                                { question: "RINGO는 어떤 서비스 인가요?",
                                    answer: `RINGO는 나라,지역,거리 에 상관없이 모두가 수업을 받을 수 있는 1대1 비대면 매칭 멘토링 플랫폼 입니다!













                                크기 체크용
                                test`},
                                { question: "수업은 어떻게 진행하나요?",
                                    answer: "사이트 내부 영상통화 시스템으로 수업을 진행합니다"},
                                {question: "아이디와 비밀번호는 어떻게 찾나요?",
                                    answer: "아이디 찾기 버튼을 누르세요"},
                                {question: "수업 리뷰는 어떻게 남기나요?",
                                    answer: "리뷰 쓰기 창으로 가세요"}

                            ].map((item, index) => (
                                <div key={index}>
                                    <div>
                                        <div className="questionQMark">Q</div>
                                        <span onClick={() => downPost(index)}>
                                            {item.question}
                                        </span>
                                        <img src="/img/buttom_arrow.png"
                                             alt="표시화살표"
                                             className="bottomArrow"
                                             onClick={ () => downPost(index) } />
                                    </div>

                                    <div className={`FAQContentPost ${postActive === index ? "on" : "off"}`}>
                                        {item.answer}
                                    </div>
                                </div>
                            ))}


                            {/*<div>*/}
                            {/*    <div className="questionQMark">Q</div>*/}
                            {/*    <span*/}
                            {/*        className="question1"*/}
                            {/*        onClick={downPost}>*/}
                            {/*        RINGO는 어떤 서비스 인가요?*/}
                            {/*    </span>*/}
                            {/*    <img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow question1"*/}
                            {/*        onClick={downPost}/>*/}

                            {/*</div>*/}

                            {/*<div className={`question1 FAQContentPost ${postActive ? "on" : "off"}`}>*/}
                            {/*    {testText}*/}
                            {/*</div>*/}

                            {/*<div>*/}
                            {/*    <div className="questionQMark">Q</div>*/}
                            {/*    <span onClick={downPost}>수업은 어떻게 진행하나요?</span>*/}
                            {/*    <img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow" onClick={downPost}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <div className="questionQMark">Q</div>*/}
                            {/*    <span onClick={downPost}>아이디와 비밀번호는 어떻게 찾나요?</span>*/}
                            {/*    <img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow" onClick={downPost}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <div className="questionQMark">Q</div>*/}
                            {/*    <span onClick={downPost}>수업 리뷰는 어떻게 남기나요?</span>*/}
                            {/*    <img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow" onClick={downPost}/>*/}
                            {/*</div>*/}
                        </div>

                        <div className={active ? "FAQContentBoxTeacher" : "FAQContentBoxTeacherActive"}>
                            {[
                                { question: "고수는 어떻게 될 수 있나요?",
                                    answer: "고수전환 버튼을 누르세요"},
                                { question: "수업은 어떻게 진행하나요?",
                                    answer: "사이트 내부 영상통화 시스템으로 수업을 진행합니다"},
                                {question: "제자 모집은 어떻게 하나요?",
                                    answer: "홍보게시판을 이용하세요"},
                                {question: "수업 상세페이지는 어떻게 구성하나요?",
                                    answer: `여러가지 정보를 잘 적으세요
                                    연락 가능시간
                                    시간당 금액
                                    협의 가능한 정도 등 모든 것을 적으세요`}

                            ].map((item, index) => (
                                <div key={index}>
                                    <div>
                                        <div className="questionQMark">Q</div>
                                        <span onClick={() => downPost(index)}>
                                            {item.question}
                                        </span>
                                        <img src="/img/buttom_arrow.png"
                                             alt="표시화살표"
                                             className="bottomArrow"
                                             onClick={ () => downPost(index) } />
                                    </div>

                                    <div className={`FAQContentPost ${postActive === index ? "on" : "off"}`}>
                                        {item.answer}
                                    </div>
                                </div>
                            ))}
                        </div>




                        {/*// <!-- 고수 -->*/}
                        {/*<div className={active ? "FAQContentBoxTeacher" : "FAQContentBoxTeacherActive"}>*/}
                        {/*    <div>*/}
                        {/*        <div className="questionQMark">Q</div>*/}
                        {/*        <span onClick={downPost}>고수는 어떻게 될 수 있나요?</span>*/}
                        {/*        <img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow" onClick={downPost}/>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <div className="questionQMark">Q</div>*/}
                        {/*        <span onClick={downPost}>제자 모집은 어떻게 하나요?</span>*/}
                        {/*        <img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow" onClick={downPost}/>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <div className="questionQMark">Q</div>*/}
                        {/*        <span onClick={downPost}>수업 상세페이지는 어떻게 구성하나요?</span>*/}
                        {/*        <img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow" onClick={downPost}/>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <div className="questionQMark">Q</div>*/}
                        {/*        <span onClick={downPost}>수업은 어떻게 진행하나요?</span>*/}
                        {/*        <img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow" onClick={downPost}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>

            {/*// <!-- 문의사항 -->*/}





            <div className="contentBottomBox">
                <div className="contentBottomHeader">
                    <div className="contentMiddleTitle">문의사항</div>

                    <div className="contentMiddleMore">더보기></div>

                </div>

                <div className="contentBottomBody">

                    <div>
                        {[
                            { question: "문의제목1",
                                answer: "답변1"},
                            { question: "문의제목2",
                                answer: "답변2"},
                            {question: "문의제목3",
                                answer: "답변3"},
                            {question: "문의제목4",
                                answer: `답
                                 변
                                 4
                                 테스트`},
                            {question: "문의제목5",
                                answer: `답
                                 변
                                 5
                                 테스트`},
                            {question: "문의제목6",
                                answer: `답
                                 변
                                 6
                                 테스트`}

                        ].map((item, index) => (
                            <div key={index}>
                                <div className="QnaOneLine">
                                    <div className="QnaAnswerNumber">{index}</div>
                                    <div
                                        className={"QnaAnswerTitle"}
                                        onClick={() => downQna(index)}>
                                        {item.question}
                                    </div>
                                    <div className="QnaAnswerOther">
                                        <div onClick={ () => downQna(index)}>운영자</div>
                                        <div onClick={ () => downQna(index)}>시간간</div>
                                        <div>
                                            <img src="/img/buttom_arrow.png"
                                                 alt="표시화살표"
                                                 className="bottomArrow"
                                                 onClick={ () => downQna(index)}/>
                                        </div>
                                    </div>
                                </div>

                                <div className={`qnaContentPost ${qnaActive === index ? "on" : "off"}`}>
                                    {item.answer}
                                </div>
                            </div>
                        ))}
                    </div>
                    


                    {/*        디비에서 정보 가져와서 반복 돌리기*/}

                    {/*        <div className="QnaOneLine">*/}
                    {/*            <div className="QnaAnswerNumber">1</div>*/}
                    {/*            <div className="QnaAnswerTitle">문의 제목</div>*/}
                    {/*            <div className="QnaAnswerOther">*/}
                    {/*                <div>운영자</div>*/}
                    {/*                <div>시간간</div>*/}
                    {/*                <div><img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow"/></div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        <div className="QnaOneLine">*/}
                    {/*            <div className="QnaAnswerNumber">2</div>*/}
                    {/*            <div className="QnaAnswerTitle">문의 제목</div>*/}
                    {/*            <div className="QnaAnswerOther">*/}
                    {/*                <div>운영자</div>*/}
                    {/*                <div>시간간</div>*/}
                    {/*                <div><img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow"/></div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        <div className="QnaOneLine">*/}
                    {/*            <div className="QnaAnswerNumber">3</div>*/}
                    {/*            <div className="QnaAnswerTitle">문의 제목</div>*/}
                    {/*            <div className="QnaAnswerOther">*/}
                    {/*                <div>운영자</div>*/}
                    {/*                <div>시간간</div>*/}
                    {/*                <div><img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow"/></div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        <div className="QnaOneLine">*/}
                    {/*            <div className="QnaAnswerNumber">4</div>*/}
                    {/*            <div className="QnaAnswerTitle">문의 제목</div>*/}
                    {/*            <div className="QnaAnswerOther">*/}
                    {/*                <div>운영자</div>*/}
                    {/*                <div>시간간</div>*/}
                    {/*                <div><img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow"/></div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        <div className="QnaOneLine">*/}
                    {/*            <div className="QnaAnswerNumber">5</div>*/}
                    {/*            <div className="QnaAnswerTitle">문의 제목</div>*/}
                    {/*            <div className="QnaAnswerOther">*/}
                    {/*                <div>운영자</div>*/}
                    {/*                <div>시간간</div>*/}
                    {/*                <div><img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow"/></div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*        <div className="QnaOneLine">*/}
                    {/*            <div className="QnaAnswerNumber">6</div>*/}
                    {/*            <div className="QnaAnswerTitle">문의 제목</div>*/}
                    {/*            <div className="QnaAnswerOther">*/}
                    {/*                <div>운영자</div>*/}
                    {/*                <div>시간간</div>*/}
                    {/*                <div><img src="/img/buttom_arrow.png" alt="표시화살표" className="bottomArrow"/></div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                </div>

                <a href="qnawrite" className="qnaWriteButton" >
                    문의하기
                </a>

            </div>


        </div>


    );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <>
//         <Header />
//         <QnaList/>
//         <Footer />
//     </>
// );
