package com.example.ringo.mypage.service;

import com.example.ringo.command.RecruitmentPostVO;
import com.example.ringo.command.RecruitmentReviewVO;
import com.example.ringo.mypage.mapperJava.GosuClassMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GosuClassServiceImpl implements GosuClassService {

    @Autowired
    private GosuClassMapper gosuClassMapper;


    @Override
    public List<RecruitmentPostVO> findLecturesByUserId(Long userPrimaryId) {
        return gosuClassMapper.findLecturesByUserId(userPrimaryId);
    }

    @Override
    public List<RecruitmentReviewVO> findReviewsForMyLectures(Long userPrimaryId) {
        return gosuClassMapper.findReviewsForMyLectures(userPrimaryId);
    }
}
