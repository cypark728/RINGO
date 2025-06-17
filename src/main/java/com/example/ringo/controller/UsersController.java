package com.example.ringo.controller;

import com.example.ringo.command.UsersVO;
import com.example.ringo.users.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/Users")
public class UsersController {

    @Autowired
    private UsersService usersService;

    @GetMapping("/test")
    public String test() {
        List<UsersVO> usersVOList = usersService.usersVOList();
        System.out.println(usersVOList.toString());
        return "view";
    }

    @GetMapping("/signup")
    public String signup(Model model) {
        model.addAttribute("pageName", "signup");
        System.out.println("뷰이름:" + "signup");

        return "sign";
    }

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("pageName", "login");
        System.out.println("뷰이름:" + "login");

        return "sign";
    }


    @PostMapping("/signup")
    @ResponseBody
    public ResponseEntity<String> signup(@RequestBody UsersVO usersVO) {
        usersService.signup(usersVO);
        return ResponseEntity.ok("success");
    }

    @GetMapping("/check-id") ///users/check-id?userId=xxx로 GET 요청 시 중복 여부를 반환.
    public boolean checkUserId(@RequestParam String userId) {
        return usersService.isUserIdDuplicate(userId);
    }

}
