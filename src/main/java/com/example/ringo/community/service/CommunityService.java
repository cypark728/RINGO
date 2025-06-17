package com.example.ringo.community.service;

import com.example.ringo.command.PostVO;
import org.springframework.stereotype.Service;


public interface CommunityService {

    void writePost(PostVO postVO);
}
