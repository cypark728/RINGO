package com.example.ringo.community.service;

import com.example.ringo.command.PostVO;
import com.example.ringo.community.mapperJava.CommunityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommunityServiceImpl implements CommunityService {

    @Autowired
    private CommunityMapper communityMapper;

    @Override
    public void writePost(PostVO postVO) {
        communityMapper.writePost(postVO);
    }

    @Override
    public List<PostVO> getAllPost() { return communityMapper.getAllPost(); }

    @Override
    public List<PostVO> getPost(String category, int size, int offset) {
        return communityMapper.getPost(category, size, offset);
    }

    @Override
    public Integer getPostCount(String category) {
        return communityMapper.getPostCount(category);
    }
}
