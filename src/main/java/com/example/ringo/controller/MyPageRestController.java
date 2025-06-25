package com.example.ringo.controller;

import com.example.ringo.command.*;
import com.example.ringo.lecture.service.LectureService;
import com.example.ringo.mypage.mapperJava.UserClassMapper;
import com.example.ringo.mypage.service.UserClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/mypage")
public class MyPageRestController {

    @Autowired
    private UserClassService userClassService;
    @Autowired
    private LectureService lectureService;

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


    @PostMapping("/lecturereviewwrite")
    @ResponseBody
    public ResponseEntity<?> writeLectureReview(@RequestBody RecruitmentReviewVO vo, HttpSession session) {
        UsersVO loginUser = (UsersVO) session.getAttribute("loginUser");

        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        vo.setUserPrimaryId(Integer.valueOf(loginUser.getUserPrimaryId())); // 세션 기반 작성자 ID
        lectureService.writeLectureReview(vo);

        return ResponseEntity.ok("리뷰 등록 완료");
    }



}
