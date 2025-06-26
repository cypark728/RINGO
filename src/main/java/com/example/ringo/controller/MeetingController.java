package com.example.ringo.controller;

import com.example.ringo.command.ClassVO;
import com.example.ringo.room.service.ClassService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MeetingController {

    private final ClassService classService;

    public MeetingController(ClassService classService) {
        this.classService = classService;
    }

    @GetMapping("/meeting.do")
    public String meetingPage(@RequestParam("roomId") String roomId,@RequestParam("userId") String userId, @RequestParam("userName") String userName, Model model) {
        ClassVO classInfo = classService.getClassByRoomId(roomId);
        System.out.println("roomId = " + roomId);
        System.out.println("classInfo = " + classInfo);
        System.out.println("userId >>>>>>" + userId);
        System.out.println("userName >>>>> " + userName);
        if (classInfo != null) {
            System.out.println("classInfo.title = " + classInfo.getTitle());
        }
        model.addAttribute("roomId", roomId);
        model.addAttribute("title", classInfo != null ? classInfo.getTitle() : "기본 제목");
        model.addAttribute("userId", userId);
        model.addAttribute("userName", userName);

        return "meeting"; // JSP나 Thymeleaf 템플릿 이름
    }
}
