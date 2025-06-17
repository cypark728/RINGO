package com.example.ringo.controller;

import com.example.ringo.command.QnaVo;
import com.example.ringo.qna.service.QnaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/qna")
public class QnaRestController {

    @Autowired
    private QnaService qnaService;

    public QnaRestController(QnaService qnaSerice) {
        this.qnaService = qnaService;
    }

    @GetMapping("/list")
    public List<QnaVo> getQnaList() {
        return qnaService.getQnaList();
    }


}
