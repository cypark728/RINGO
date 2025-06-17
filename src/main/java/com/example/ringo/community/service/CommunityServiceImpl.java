package com.example.ringo.community.service;

import com.example.ringo.command.PostVO;
import com.example.ringo.community.mapperJava.CommunityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommunityServiceImpl implements CommunityService {

    @Autowired
    private CommunityMapper communityMapper;

    @Override
    public void writePost(PostVO postVO) {
        communityMapper.writePost(postVO);
    }

}
