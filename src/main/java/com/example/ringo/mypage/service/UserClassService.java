package com.example.ringo.mypage.service;

import com.example.ringo.command.MyPageVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserClassService {
    List<MyPageVO> getMyApplyClass(@Param("userId") int userId);

    List<MyPageVO> getMyWish(@Param("userId") int userId);

    void updateWish(MyPageVO vo);
}

