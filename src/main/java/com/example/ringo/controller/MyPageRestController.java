package com.example.ringo.controller;

import com.example.ringo.command.MyPageVO;
import com.example.ringo.command.ScheduleVO;
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
    public List<MyPageVO> getMyApplyClass(@RequestParam int userPrimaryId) {
        return userClassService.getMyApplyClass(userPrimaryId);
    }

    @GetMapping("/mywish")
    public List<MyPageVO> getMyWish(@RequestParam int userPrimaryId) {
        return userClassService.getMyWish(userPrimaryId);
    }

    @PostMapping("/updatewish")
    public ResponseEntity<String> updateWish(@RequestBody MyPageVO vo) {
        userClassService.updateWish(vo);
        return ResponseEntity.ok("");
    }

    @GetMapping("/myreview")
    public List<MyPageVO> getMyReview(@RequestParam int userPrimaryId) {
        return userClassService.getMyReview(userPrimaryId);
    }

    @GetMapping("/timetable")
    public List<ScheduleVO> getTimetable(@RequestParam int userPrimaryId) {
        return userClassService.getTimetable(userPrimaryId);
    }

    @PostMapping("/timetablesave")
    public ResponseEntity<?> saveTimetable(@RequestBody MyPageVO vo) {
        userClassService.saveTimetable(vo);
        return ResponseEntity.ok("");
    }



}
