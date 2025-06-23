package com.example.ringo.lecture.service;

import com.example.ringo.command.RecruitmentPostVO;
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
}
