package com.example.ringo.community.mapperJava;

import com.example.ringo.command.CommentVO;
import com.example.ringo.command.PostVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityMapper {

    void writePost(PostVO postVO);
    List<PostVO> getAllPost();
    List<PostVO> getPost(String category, int size, int offset);
    Integer getPostCount(String category);
    PostVO getOnePost(int postId);
    void writeComment(CommentVO commentVO);
    List<CommentVO> getAllComments(int postId);
}
