package com.example.ringo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Lecture")
public class LectureController {

    @GetMapping("/LectureInfo")
    public String lectures(Model model) {
        model.addAttribute("pageName", "lectureinfo");
        return "lecture";
    }

    @GetMapping("/LectureDetail")
    public String lectureDetail(Model model) {
        model.addAttribute("pageName", "lecturedetail");
        return "lecture";
    }

    @GetMapping("/LectureRegistration")
    public String lectureRegistration(Model model) {
        model.addAttribute("pageName", "LectureRegistration");
        return "lecture";
    }


}
