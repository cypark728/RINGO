import React, { useState, useEffect } from "react";
import '../../first.css';
import "./CommunityDetail.css";
import ReactDOM from "react-dom/client";
import MyHeader from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import dayjs from "dayjs";
import CommentSection from "./commentSection/CommentSection";

// 게시글 상세보기 컴포넌트
function CommunityDetail() {
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    // const post = postData;

    const getQueryParam = (param) => {
        return new URLSearchParams(window.location.search).get(param);
    }

    const postId = getQueryParam("postId");

    const fetchGetOnePost = async (postId) => {
        const response = await fetch(`/community/getOnePost?postId=${postId}`);
        setPost(await response.json());
    }

    const fetchGetAllComment = async (postId) => {
        const response = await fetch(`/community/getAllComments?postId=${postId}`);
        setComments(await response.json());

    }

    useEffect(() => {
        fetchGetOnePost(postId);
        fetchGetAllComment(postId);
    }, []);

    return (
        <div className="detail-background">
            <div className="community-detail-container">
                <div className="community-detail-header">
                    <span className="community-detail-category">{post.postType}</span>
                    <h1 className="community-detail-title">{post.postTitle}</h1>
                    <div className="community-detail-meta">
                        <span>{post.userNickName}</span>
                        <span>
                            {dayjs(post.postCreateDate).format('YYYY-MM-DD')}
                        </span>
                    </div>
                </div>
                {/* 게시글 본문 + 이미지가 같은 영역에 */}
                <div className="community-detail-content">
                    {post.postContent}
                    {/*{post.images && post.images.length > 0 && (*/}
                    {/*    <div className="community-detail-images">*/}
                    {/*        {post.images.map((img, idx) => (*/}
                    {/*            <img*/}
                    {/*                key={idx}*/}
                    {/*                src={img}*/}
                    {/*                alt={`첨부이미지${idx + 1}`}*/}
                    {/*            />*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
                {/* 댓글/답글 영역 */}
                <CommentSection
                    postId={postId}
                    post={post}
                    comments={comments}
                />
                <div className={"Community-list-box"}>
                    <button type={"button"} className={"Community-list"}  onClick={() => window.location.href = "/Community/community"} >목록으로</button>
                </div>

            </div>

        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <MyHeader/>
        <CommunityDetail/>
        <Footer/>
    </>
);