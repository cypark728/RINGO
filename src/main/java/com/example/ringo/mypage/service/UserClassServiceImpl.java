package com.example.ringo.mypage.service;

import com.example.ringo.command.ClassManageVO;
import com.example.ringo.command.MyPageVO;
import com.example.ringo.command.ScheduleVO;
import com.example.ringo.mypage.mapperJava.UserClassMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserClassServiceImpl implements UserClassService {

    @Autowired
    private UserClassMapper userClassMapper;

    @Override
    public List<MyPageVO> getMyApplyClass(@Param("userPrimaryId") int userPrimaryId) {
        return userClassMapper.getMyApplyClass(userPrimaryId);
    }

    @Override
    public List<MyPageVO> getMyWish(@Param("userPrimaryId") int userPrimaryId) {
        return userClassMapper.getMyWish(userPrimaryId);
    }

    @Override
    public void updateWish(MyPageVO vo) {
        userClassMapper.updateWish(vo);
    }

    @Override
    public List<MyPageVO> getMyReview(@Param("userPrimaryId") int userPrimaryId) {
        return userClassMapper.getMyReview(userPrimaryId);
    }

    @Override
    public List<ScheduleVO> getTimetable(int userPrimaryId) {
        return userClassMapper.getTimetable(userPrimaryId);
    }

//    @Override
//    public void deleteTimetablePast(int userPrimaryId) {
//        userClassMapper.deleteTimetablePast(userPrimaryId);
//    }
//
//    @Override
//    public void insertSchedule(int userPrimaryId, ScheduleVO schedule) {
//
//    }


    @Override
    public void saveTimetable(MyPageVO vo) {
        int userPrimaryId = vo.getUserPrimaryId();

        userClassMapper.deleteTimetablePast(userPrimaryId);

        if(vo.getSchedules() != null) {
            for (ScheduleVO schedule : vo.getSchedules()) {
                userClassMapper.insertSchedule(userPrimaryId, schedule);
            }
        }

    }

    @Override
    public List<ClassManageVO> getMyStudyClass(Integer userPrimaryId) {
        return userClassMapper.getMyStudyClass(userPrimaryId);
    }


}
