package com.example.ringo.users.service;

import com.example.ringo.command.UsersVO;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UsersService {
    List<UsersVO> usersVOList();
    void signup(UsersVO usersVO); //회원가입
    boolean isUserIdDuplicate(String userId); //아이디중복체크
    UsersVO login(UsersVO usersVO);
}
