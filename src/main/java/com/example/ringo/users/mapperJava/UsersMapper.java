package com.example.ringo.users.mapperJava;

import com.example.ringo.command.UsersVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UsersMapper {
    List<UsersVO> usersVOList();
}
