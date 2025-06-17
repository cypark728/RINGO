package com.example.ringo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class NoticeController {

    @GetMapping("/Notice/noticelist") //.do 해주세요
    public String noticeList(Model model) {
        model.addAttribute("pageName", "noticelist");
        System.out.println("뷰이름:" + "noticelist");

        return "noticelist";
    }
}