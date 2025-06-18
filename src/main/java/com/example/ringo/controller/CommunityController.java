package com.example.ringo.controller;

import com.example.ringo.command.PostVO;
import com.example.ringo.command.UsersVO;
import com.example.ringo.community.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

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

    @PostMapping("/writepost")
    @ResponseBody
    public ResponseEntity<String> communityWrite(@RequestBody PostVO postVO) {
        communityService.writePost(postVO);
        return ResponseEntity.ok("success");
    }


}
