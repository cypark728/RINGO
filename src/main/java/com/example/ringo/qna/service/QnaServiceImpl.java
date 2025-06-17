package com.example.ringo.qna.service;

import com.example.ringo.command.QnaVo;
import com.example.ringo.qna.mapperJava.QnaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QnaServiceImpl implements QnaService {

    @Autowired
    private QnaMapper qnaMapper;

    @Override
    public void insertQna(QnaVo vo) {
        qnaMapper.insertQna(vo);
    }

    @Override
    public List<QnaVo> getQnaList() {
        return qnaMapper.getQnaList();
    }


}
