package com.example.ringo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String firstMainPage(Model model){
        model.addAttribute("pageName", "main");
        return "main";
    }

    @GetMapping("/main")
    public String mainPage(Model model){
        model.addAttribute("pageName", "main");
        return "main";
    }
}