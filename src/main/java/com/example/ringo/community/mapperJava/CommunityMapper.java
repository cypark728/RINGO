package com.example.ringo.community.mapperJava;

import com.example.ringo.command.PostVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityMapper {

    void writePost(PostVO postVO);
    List<PostVO> getAllPost();
    List<PostVO> getPost(String category, int size, int offset);
    Integer getPostCount(String category);
}
