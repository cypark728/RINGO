package com.example.ringo.controller;

import com.example.ringo.command.ClassManageVO;
import com.example.ringo.command.RecruitmentPostVO;
import com.example.ringo.lecture.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/lecture")
public class LectureController {

    @Autowired
    private LectureService lectureService;

    @GetMapping("/lectureinfo")
    public String lectures(Model model) {
        model.addAttribute("pageName", "lectureinfo");
        return "lecture";
    }

    @GetMapping("/lecturedetail")
    public String lectureDetail(@RequestParam String lectureId,
                                Model model) {
        model.addAttribute("pageName", "lecturedetail");
        return "lecture";
    }

    @GetMapping("/lectureregistration")
    public String lectureRegistration(Model model) {
        model.addAttribute("pageName", "lectureregistration");
        return "lecture";
    }

    @PostMapping("/writeRecruitmentPost")
    @ResponseBody
    public ResponseEntity<String> writeRecruitmentPost(@RequestBody RecruitmentPostVO recruitmentPostVO) {
        lectureService.writeRecruitmentPost(recruitmentPostVO);
        return ResponseEntity.ok("success");
    }

    @GetMapping("/getLectures")
    @ResponseBody
    public List<RecruitmentPostVO> getLectures(@RequestParam(required = false) String category,
                                               @RequestParam(required = false) String search) {

        return lectureService.getLectures(category, search);
    }

    @GetMapping("/getOneLecture")
    @ResponseBody
    public RecruitmentPostVO getOneLecture(@RequestParam Integer lectureId) {

        return lectureService.getOneLecture(lectureId);
    }

    @PostMapping("/enroll")
    public ResponseEntity<?> enrollClass(@RequestBody ClassManageVO vo) {
        try {
            lectureService.enrollClass(vo);
            return ResponseEntity.ok().body("신청이 완료되었습니다.");
        } catch (DataIntegrityViolationException e) {
            // 유니크 인덱스 위반 시
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("이미 수강중인 수업입니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류가 발생했습니다.");
        }

    }

}
