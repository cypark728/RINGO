package com.example.ringo.users.service;

import com.example.ringo.command.UsersVO;
import com.example.ringo.users.mapperJava.UsersMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    private UsersMapper usersMapper;

    @Override
    public List<UsersVO> usersVOList() {return usersMapper.usersVOList();}
}
