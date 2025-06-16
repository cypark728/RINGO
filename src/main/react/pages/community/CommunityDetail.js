import React, { useState } from "react";
import '../first.css';
import "./CommunityDetail.css";
import ReactDOM from "react-dom/client";
import MyHeader from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

// 예시 게시글 데이터
const postData = {
    id: 1,
    category: "자유",
    title: "오늘의 다짐",
    content: "오늘도 열심히 살아보자!",
    images: ["/img/clock.png", "/img/bell.png"],
    author: "닉네임",
    date: "2025-06-13"
};

// 예시 댓글 데이터(트리 구조)
const initialComments = [
    {
        id: 1,
        content: "첫 번째 댓글입니다.",
        author: "사용자1",
        date: "2025-06-13",
        depth: 0,
        children: [
            {
                id: 2,
                content: "첫 번째 답글입니다.",
                author: "사용자2",
                date: "2025-06-13",
                depth: 1,
                children: [
                    {
                        id: 3,
                        content: "답글의 답글(2단계 이상)은 같은 위치에 표시됩니다.",
                        author: "사용자3",
                        date: "2025-06-13",
                        depth: 2,
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        content: "작성자가 직접 쓴 댓글입니다.",
        author: "닉네임", // 게시글 작성자와 동일
        date: "2025-06-13",
        depth: 0,
        children: []
    }
];

// 댓글/답글(무한 계층) 재귀 컴포넌트
function Comment({ comment, onReply, postAuthor }) {
    const [showReplies, setShowReplies] = useState(false);
    const [replyText, setReplyText] = useState("");

    // 답글 개수
    const replyCount = comment.children ? comment.children.length : 0;

    // 답글 등록
    const handleReply = () => {
        if (!replyText.trim()) return;
        onReply(comment.id, replyText, comment.depth + 1);
        setReplyText("");
        setShowReplies(true);
    };

    // 답글(1단계)에만 depth-1 클래스 추가
    const commentBoxClass = comment.depth === 1
        ? "comment-box depth-1"
        : "comment-box";

    return (
        <div style={{ marginTop: 14 }}>
            <div className={commentBoxClass}>
                <div className="comment-author">
                    {comment.author}
                    {comment.author === postAuthor && (
                        <span className="author-badge">작성자</span>
                    )}
                </div>
                <div className="comment-date">{comment.date}</div>
                <div className="comment-content">{comment.content}</div>
                {/* 답글 버튼 & 답글 개수 */}
                {comment.depth === 0 && (
                    <button
                        onClick={() => setShowReplies((v) => !v)}
                        className="reply-btn"
                    >
                        {showReplies ? "답글 접기" : `답글 ${replyCount}`}
                    </button>
                )}
            </div>
            {/* 답글 펼치기 */}
            {showReplies && comment.children && (
                <div style={{ marginLeft: 0, marginTop: 10 }}>
                    {comment.children.map(child => (
                        <Comment
                            key={child.id}
                            comment={child}
                            onReply={onReply}
                            postAuthor={postAuthor}
                        />
                    ))}
                    {/* 답글 작성란 */}
                    <div className="reply-input-area">
                        <div className="textarea-container">
                            <textarea
                                value={replyText}
                                onChange={e => setReplyText(e.target.value)}
                                placeholder="답글을 입력하세요"
                                rows={3}
                            />
                            <button
                                onClick={handleReply}
                                className="textarea-submit-btn"
                            >
                                등록
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


// 댓글 전체 관리 컴포넌트
function CommentSection() {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");

    // 최상위 댓글 등록
    const handleAddComment = () => {
        if (!newComment.trim()) return;
        setComments([
            ...comments,
            {
                id: Date.now(),
                content: newComment,
                author: "나",
                date: new Date().toISOString().slice(0, 10),
                depth: 0,
                children: []
            }
        ]);
        setNewComment("");
    };

    // 답글 등록 (트리 구조 갱신)
    const handleReply = (parentId, text, depth) => {
        const newReply = {
            id: Date.now(),
            content: text,
            author: "나",
            date: new Date().toISOString().slice(0, 10),
            depth: depth,
            children: []
        };

        // 트리에서 parentId를 찾아 children에 추가 (재귀)
        function addReply(comments) {
            return comments.map((comment) => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        children: [...comment.children, newReply]
                    };
                } else if (comment.children.length > 0) {
                    return {
                        ...comment,
                        children: addReply(comment.children)
                    };
                }
                return comment;
            });
        }

        setComments(addReply(comments));
    };

    return (
        <div style={{
            maxWidth: "100%",
            borderTop: "1px #eee solid",
            paddingTop: "10px"
        }}>
            <h3 style={{ marginBottom: 18 }}>댓글</h3>
            {/* 최상위 댓글 입력창 */}
            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                    style={{
                        flex: 1,
                        padding: "7px 12px",
                        border: "1.5px solid #eee",
                        borderRadius: 7,
                        fontSize: 15,
                        background: "#fff",
                        fontFamily: "'Pretendard','Noto Sans KR',sans-serif"
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <button
                    onClick={handleAddComment}
                    style={{
                        background: "#ff8127",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "7px 18px",
                        fontSize: 14,
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    등록
                </button>
            </div>
            {/* 댓글/답글 목록 */}
            {comments.length === 0 && (
                <div style={{ color: "#aaa", padding: 24 }}>댓글이 없습니다.</div>
            )}
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    onReply={handleReply}
                    postAuthor={postData.author}
                />
            ))}
        </div>
    );
}

// 게시글 상세보기 컴포넌트
function CommunityDetail() {
    const post = postData;

    return (
        <div className="detail-background">
            <div className="community-detail-container">
                <div className="community-detail-header">
                    <span className="community-detail-category">{post.category}</span>
                    <h1 className="community-detail-title">{post.title}</h1>
                    <div className="community-detail-meta">
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                    </div>
                </div>
                {/* 게시글 본문 + 이미지가 같은 영역에 */}
                <div className="community-detail-content">
                    {post.content}
                    {post.images && post.images.length > 0 && (
                        <div className="community-detail-images">
                            {post.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`첨부이미지${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {/* 댓글/답글 영역 */}
                <CommentSection />
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