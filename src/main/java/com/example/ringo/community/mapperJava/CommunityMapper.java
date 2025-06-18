package com.example.ringo.community.mapperJava;

import com.example.ringo.command.PostVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommunityMapper {

    void writePost(PostVO postVO);
}
