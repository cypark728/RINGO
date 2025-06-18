package com.example.ringo.controller;

import com.example.ringo.command.UsersVO;
import com.example.ringo.users.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/users")
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

    @PostMapping("/signup")
    @ResponseBody
    public ResponseEntity<String> signup(@RequestBody UsersVO usersVO) {
        usersService.signup(usersVO);
        return ResponseEntity.ok("success");
    }

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("pageName", "login");
        System.out.println("뷰이름:" + "login");

        return "sign";
    }

    @PostMapping("/login")
    @ResponseBody
    public Map<String, Object> login(@RequestBody UsersVO usersVO, HttpServletRequest request) {
        Map<String, Object> result = new HashMap<>();
        UsersVO loginUser = usersService.login(usersVO);
        if (loginUser == null) {
            result.put("success", false);
            result.put("message", "아이디 또는 비밀번호가 올바르지 않습니다.");
        } else {
            HttpSession session = request.getSession();
            session.setAttribute("loginUser", loginUser);
            result.put("success", true);

        }
        return result;
    }

    @GetMapping("/check-id")
    @ResponseBody
    public boolean checkUserId(@RequestParam String userId) {
        return usersService.isUserIdDuplicate(userId); // true: 중복, false: 사용 가능
    }

    @GetMapping("/idfind")
    public String idfind(Model model) {
        model.addAttribute("pageName", "idfind");
        System.out.println("뷰이름:" + "idfind");

        return "sign";
    }

}
