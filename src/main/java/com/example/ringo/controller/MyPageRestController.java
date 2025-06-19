package com.example.ringo.controller;

import com.example.ringo.command.MyPageVO;
import com.example.ringo.mypage.mapperJava.UserClassMapper;
import com.example.ringo.mypage.service.UserClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mypage")
public class MyPageRestController {

    @Autowired
    private UserClassService userClassService;

    @GetMapping("/mystudyclass")
    public List<MyPageVO> getMyApplyClass(@RequestParam int userId) {
        return userClassService.getMyApplyClass(userId);
    }

    @GetMapping("/mywish")
    public List<MyPageVO> getMyWish(@RequestParam int userId) {
        return userClassService.getMyWish(userId);
    }

    @PostMapping("/updatewish")
    public ResponseEntity<String> updateWish(@RequestBody MyPageVO vo) {
        userClassService.updateWish(vo);
        return ResponseEntity.ok("");
    }


}
