package com.example.ringo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class QnaController {

    @GetMapping("/Qna/Qnalist") //.do 해주세요
    public String qnaList(Model model) {
        model.addAttribute("pageName", "qnalist");
        System.out.println("뷰이름:" + "qnalist");

        return "Qnalist"; //언제나 view화면으로 이동합니다.
    }

    @GetMapping("/Qna/qnawrite") //.do 해주세요
    public String qnaWrite(Model model) {
        model.addAttribute("pageName", "qnawrite");
        System.out.println("뷰이름:" + "qnawrite");

        return "qnawrite"; //언제나 view화면으로 이동합니다.
    }
}