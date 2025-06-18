package com.example.ringo.community.service;

import com.example.ringo.command.PostVO;
import org.springframework.stereotype.Service;

import java.util.List;


public interface CommunityService {

    void writePost(PostVO postVO);
    List<PostVO> getAllPost();
    List<PostVO> getPost(String category, int size, int offset);
    Integer getPostCount(String category);
}
