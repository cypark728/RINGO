package com.example.ringo.lecture.mapperJava;

import com.example.ringo.command.RecruitmentPostVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LectureMapper {
    void writeRecruitmentPost(RecruitmentPostVO recruitmentPostVO);
    List<RecruitmentPostVO> getLectures(String category, String search);
    RecruitmentPostVO getOneLecture(Integer lectureId);
}
