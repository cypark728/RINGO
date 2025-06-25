package com.example.ringo.controller;

import com.example.ringo.command.ClassManageVO;
import com.example.ringo.command.MyPageVO;
import com.example.ringo.command.ScheduleVO;
import com.example.ringo.mypage.mapperJava.UserClassMapper;
import com.example.ringo.mypage.service.UserClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mypage")
public class MyPageRestController {

    @Autowired
    private UserClassService userClassService;

//    @GetMapping("/mystudyclass")
//    public List<MyPageVO> getMyApplyClass(@RequestParam int userPrimaryId) {
//        return userClassService.getMyApplyClass(userPrimaryId);
//    }

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

    @GetMapping("/mystudyclass")
    public List<ClassManageVO> getMyStudyClass(@RequestParam Integer userPrimaryId) {
        return userClassService.getMyStudyClass(userPrimaryId);
    }

    @GetMapping("/myfinishedclass")
    public List<ClassManageVO> getMyFinishedClass(@RequestParam Integer userPrimaryId) {
        return userClassService.getMyFinishedClass(userPrimaryId);
    }

    @GetMapping("/mystudyclass/latest3")
    public List<ClassManageVO> getMyStudyClassLatest3(@RequestParam Integer userPrimaryId) {
        return userClassService.getMyStudyClassLatest3(userPrimaryId);
    }

    @GetMapping("/myfinishedclass/latest3")
    public List<ClassManageVO> getMyFinishedClasslatest3(@RequestParam Integer userPrimaryId) {
        return userClassService.getMyFinishedClass(userPrimaryId);
    }

    @GetMapping("/mystudyclass/count")
    public Map<String, Integer> getMyStudyClassCount(@RequestParam Integer userPrimaryId) {
        int count = userClassService.getMyStudyClassCount(userPrimaryId);
        return Map.of("count", count); // {"count": 4} 형태로 반환
    }

    @GetMapping("/myfinishedclass/count")
    public Map<String, Integer> getMyFinishedClassCount(@RequestParam Integer userPrimaryId) {
        int count = userClassService.getMyFinishedClassCount(userPrimaryId);
        return Map.of("count", count);
    }


}
