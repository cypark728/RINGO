package com.example.ringo.controller;

import com.example.ringo.command.PostVO;
import com.example.ringo.command.UsersVO;
import com.example.ringo.community.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/getPost")
    @ResponseBody
    public List<PostVO> getPost(@RequestParam(required = false) String category,
                                @RequestParam int size,
                                @RequestParam int offset) {
        System.out.println(communityService.getPost(category, size, offset).toString());
        return communityService.getPost(category, size, offset);
    }

    @GetMapping("/getPostCount")
    @ResponseBody
    public Integer getPostCount(@RequestParam(required = false) String category) {
        System.out.println(communityService.getPostCount(category));
        return communityService.getPostCount(category);
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
