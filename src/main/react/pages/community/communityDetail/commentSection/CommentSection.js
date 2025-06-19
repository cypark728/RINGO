import React, { useState } from "react";
import Comment from "../comment/Comment"
import './CommentSection.css';

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

// 댓글 전체 관리 컴포넌트
function CommentSection({postId, post}) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // 최상위 댓글 등록
    const handleAddComment = async() => {
        if (!newComment.trim()) return;
        //db에 댓글 저장하기
        //댓글 내용, 댓글 깊이, 부모 댓글 아이디, 작성글 아이디, 유저 아이디(세션에서 가져와야함)
        console.log(postId);
        const commentData = {
            commentContent: newComment,
            commentDepth: 0,
            postId: postId,
            userPrimaryId: 0 //나중에 현재 세션 userId로 바꿔줘야 함
        }

        try {
            await fetch('/community/writeComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentData)
            });
        }catch (e) {
            alert("에러발생" + e);
        }

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
        <div className="comment-section">
            <h3>댓글</h3>
            {/* 최상위 댓글 입력창 */}
            <div className="parent-comment-input-section">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <button
                    onClick={handleAddComment}
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
                    postAuthor={post.userNickName}
                />
            ))}
        </div>
    );
}

export default CommentSection;