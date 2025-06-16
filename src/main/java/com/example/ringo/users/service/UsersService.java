package com.example.ringo.users.service;

import com.example.ringo.command.UsersVO;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UsersService {
    List<UsersVO> usersVOList();
}
