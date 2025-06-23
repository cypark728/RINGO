package com.example.ringo.room.service;

import com.example.ringo.command.ClassVO;

import java.util.List;

public interface ClassService {
    void createClass(ClassVO classVO);
    List<ClassVO> getAllClasses();
    ClassVO getClassByRoomId(String roomId);

    List<ClassVO> getClassesByUserId(String userId);
}
