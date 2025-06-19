package com.example.ringo.mypage.service;

import com.example.ringo.command.MyPageVO;
import com.example.ringo.mypage.mapperJava.UserClassMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public
class UserClassServiceImpl implements UserClassService {

    @Autowired
    private UserClassMapper userClassMapper;

    @Override
    public List<MyPageVO> getMyApplyClass(@Param("userId") int userId) {
        return userClassMapper.getMyApplyClass(userId);
    }

    @Override
    public List<MyPageVO> getMyWish(@Param("userId") int userId) {
        return userClassMapper.getMyWish(userId);
    }

    @Override
    public void updateWish(MyPageVO vo) {
        userClassMapper.updateWish(vo);
    }



}
