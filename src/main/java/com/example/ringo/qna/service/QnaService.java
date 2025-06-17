package com.example.ringo.qna.service;

import com.example.ringo.command.QnaVo;

import java.util.List;

public interface QnaService {
    void insertQna(QnaVo vo);
    List<QnaVo> getQnaList();
}
