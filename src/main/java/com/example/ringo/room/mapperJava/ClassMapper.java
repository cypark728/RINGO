package com.example.ringo.room.mapperJava;

import com.example.ringo.command.ClassVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ClassMapper {
    void insertClass(ClassVO classVO);
    List<ClassVO> getAllClasses();
    ClassVO selectClassByRoomId(String roomId);

    List<ClassVO> selectClassesByUserId(String userId);

}
