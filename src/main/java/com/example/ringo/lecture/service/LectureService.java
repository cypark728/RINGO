package com.example.ringo.lecture.service;

import com.example.ringo.command.RecruitmentPostVO;

import java.util.List;

public interface LectureService {
    void writeRecruitmentPost(RecruitmentPostVO recruitmentPostVO);
    List<RecruitmentPostVO> getLectures(String category, String search);
    RecruitmentPostVO getOneLecture(Integer lectureId);
}
