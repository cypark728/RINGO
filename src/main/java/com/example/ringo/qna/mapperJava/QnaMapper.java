package com.example.ringo.qna.mapperJava;

import com.example.ringo.command.QnaVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface QnaMapper {
    void insertQna(QnaVo vo);
    List<QnaVo> getQnaList();
}
