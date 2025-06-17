package com.example.ringo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/Community")
public class CommunityController {

    @GetMapping("/CommunityList")
    public String communityList(Model model) {
        model.addAttribute("pageName", "community");
        return "community";
    }

    @GetMapping("/CommunityDetail")
    public String communityDetail(Model model) {
        model.addAttribute("pageName", "communitydetail");
        return "community";
    }

    @GetMapping("/CommunityWrite")
    public String communityWrite(Model model) {
        model.addAttribute("pageName", "communitywrite");
        return "community";
    }

}
