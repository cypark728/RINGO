package com.example.ringo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/community")
public class CommunityController {

    @GetMapping("/communitylist")
    public String communityList(Model model) {
        model.addAttribute("pageName", "community");
        return "community";
    }

    @GetMapping("/communitydetail")
    public String communityDetail(Model model) {
        model.addAttribute("pageName", "communitydetail");
        return "community";
    }

    @GetMapping("/communitywrite")
    public String communityWrite(Model model) {
        model.addAttribute("pageName", "communitywrite");
        return "community";
    }

    @GetMapping("/writepost")
    public String communityWritePost(@RequestParam("postTitle") String postTitle,
                                     @RequestParam("postContent") String postContent,
                                     @RequestParam("postType") String postType) {

        return "/community/communitylist";
    }

}
