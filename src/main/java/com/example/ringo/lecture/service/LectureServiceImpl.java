package com.example.ringo.lecture.service;

import com.example.ringo.command.ClassManageVO;
import com.example.ringo.command.RecruitmentPostVO;
import com.example.ringo.command.RecruitmentReviewVO;
import com.example.ringo.command.UsersVO;
import com.example.ringo.lecture.mapperJava.LectureMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LectureServiceImpl implements LectureService {

    @Autowired
    private LectureMapper lectureMapper;


    @Override
    public void writeRecruitmentPost(RecruitmentPostVO recruitmentPostVO) {
        lectureMapper.writeRecruitmentPost(recruitmentPostVO);
    }

    @Override
    public List<RecruitmentPostVO> getLectures(String category, String search) {
        return lectureMapper.getLectures(category, search);
    }

    @Override
    public RecruitmentPostVO getOneLecture(Integer lectureId) {
        return lectureMapper.getOneLecture(lectureId);
    }

    @Override
    public void enrollClass(ClassManageVO vo) {
        lectureMapper.enrollClass(vo); // Mapper의 insert 메서드 호출
    }


    @Override
    public UsersVO getUserById(int userPrimaryId) {
        return lectureMapper.getUserById(userPrimaryId);
    }

    @Override
    public void writeLectureReview(RecruitmentReviewVO vo) {
        lectureMapper.insertLectureReview(vo);
    }

    @Override
    public List<RecruitmentReviewVO> getLectureReviews(Integer lectureId) {
        return lectureMapper.getLectureReviews(lectureId);
    }

    // LectureServiceImpl.java
    @Override
    public List<RecruitmentPostVO> getPostsByCategory(String category) {
        return lectureMapper.getPostsByCategory(category);
    }

}
