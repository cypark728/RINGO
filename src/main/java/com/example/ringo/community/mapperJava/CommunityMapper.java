package com.example.ringo.community.mapperJava;

import com.example.ringo.command.CommentVO;
import com.example.ringo.command.PostVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityMapper {

    void writePost(PostVO postVO);
    List<PostVO> getAllPost();
    List<PostVO> getPost(String category, String search, int size, int offset);
    Integer getPostCount(String category, String search);
    PostVO getOnePost(int postId);
    void writeComment(CommentVO commentVO);
    List<CommentVO> getAllParentComments(int postId);
    List<CommentVO> getChildComments(int postId, int commentParentId);
}
