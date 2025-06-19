package com.example.ringo.mypage.mapperJava;

import com.example.ringo.command.MyPageVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserClassMapper {
    List<MyPageVO> getMyApplyClass(@Param("userId") int userId);

    List<MyPageVO> getMyWish(@Param("userId") int userId);

    void updateWish(MyPageVO vo);

}
