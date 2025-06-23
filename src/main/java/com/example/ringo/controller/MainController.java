package com.example.ringo.controller;

import com.example.ringo.command.UsersVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;

@Controller
public class MainController {

    @GetMapping("/")
    public String firstMainPage(Model model){
        model.addAttribute("pageName", "main");
        return "main";
    }

    @GetMapping("/main")
    public String mainPage(Model model , HttpSession session){
        model.addAttribute("pageName", "main");

        UsersVO loginUser = (UsersVO) session.getAttribute("loginUser");
        model.addAttribute("loginUser", loginUser);


        return "main";
    }
}