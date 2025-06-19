import React, { useState } from "react";

// 댓글/답글(무한 계층) 재귀 컴포넌트
function Comment({ comment, onReply, postAuthor }) {
    const [showReplies, setShowReplies] = useState(false);
    const [replyText, setReplyText] = useState("");

    // 답글 개수
    // const replyCount = comment.children ? comment.children.length : 0;
    const replyCount = 1;

    // 답글 등록
    const handleReply = () => {
        if (!replyText.trim()) return;
        //onReply(comment.id, replyText, comment.depth + 1);
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
                    {comment.userNickName}
                    {comment.userNickName === postAuthor && (
                        <span className="author-badge">작성자</span>
                    )}
                </div>
                <div className="comment-date">{comment.commetCreateTime}</div>
                <div className="comment-content">{comment.commentContent}</div>
                {/* 답글 버튼 & 답글 개수 */}
                {comment.commentDepth === 0 && (
                    <button
                        onClick={() => setShowReplies((v) => !v)}
                        className="reply-btn"
                    >
                        {showReplies ? "답글 접기" : `답글 ${replyCount}`}
                    </button>
                )}
            </div>
            {/* 답글 펼치기 */}
            {/*{showReplies && comment.children && (*/}
            {/*    <div style={{ marginLeft: 0, marginTop: 10 }}>*/}
            {/*        {comment.children.map(child => (*/}
            {/*            <Comment*/}
            {/*                key={child.id}*/}
            {/*                comment={child}*/}
            {/*                onReply={onReply}*/}
            {/*                postAuthor={postAuthor}*/}
            {/*            />*/}
            {/*        ))}*/}
            {/*        /!* 답글 작성란 *!/*/}
            {/*        <div className="reply-input-area">*/}
            {/*            <div className="textarea-container">*/}
            {/*                <textarea*/}
            {/*                    value={replyText}*/}
            {/*                    onChange={e => setReplyText(e.target.value)}*/}
            {/*                    placeholder="답글을 입력하세요"*/}
            {/*                    rows={3}*/}
            {/*                />*/}
            {/*                <button*/}
            {/*                    onClick={handleReply}*/}
            {/*                    className="textarea-submit-btn"*/}
            {/*                >*/}
            {/*                    등록*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}

export default Comment;