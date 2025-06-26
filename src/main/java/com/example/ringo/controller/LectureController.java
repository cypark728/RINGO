package com.example.ringo.controller;

import com.example.ringo.command.ClassManageVO;
import com.example.ringo.command.RecruitmentPostVO;
import com.example.ringo.command.RecruitmentReviewVO;
import com.example.ringo.command.UsersVO;
import com.example.ringo.lecture.service.LectureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.*;

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

//    @GetMapping("/getLectureReviews")
//    @ResponseBody
//    public List<RecruitmentReviewVO> getLectureReviews(@RequestParam("lectureId") Integer lectureId) {
//        return lectureService.getLectureReviews(lectureId);
//    }

    @GetMapping("/getLectureReviews")
    @ResponseBody
    public List<Map<String, Object>> getLectureReviews(@RequestParam("lectureId") Integer lectureId) {
        List<RecruitmentReviewVO> reviews = lectureService.getLectureReviews(lectureId);

        List<Map<String, Object>> result = new ArrayList<>();

        for (RecruitmentReviewVO review : reviews) {
            Map<String, Object> item = new HashMap<>();
            item.put("recruitmentReviewId", review.getRecruitmentReviewId());
            item.put("recruitmentPostId", review.getRecruitmentPostId());
            item.put("recruitmentReviewTitle", review.getRecruitmentReviewTitle());
            item.put("recruitmentReviewContent", review.getRecruitmentReviewContent());
            item.put("recruitmentReviewTime", review.getRecruitmentReviewTime());
            item.put("userNickName", review.getUserNickName());
            item.put("userPrimaryId", review.getUserPrimaryId());

            // Base64 인코딩한 이미지 URL 형태로 전달
            if (review.getUserProfile() != null && review.getUserProfileMimetype() != null) {
                String base64Image = Base64.getEncoder().encodeToString(review.getUserProfile());
                String imageSrc = "data:" + review.getUserProfileMimetype() + ";base64," + base64Image;
                item.put("userProfileImage", imageSrc);
            } else {
                item.put("userProfileImage", null);
            }

            result.add(item);
        }

        return result;
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

    @GetMapping("lecturereview")
    public String lectureReview(Model model) {
        model.addAttribute("pageName", "lecturereviewwrite");
        return "lecture";
    }

    @GetMapping("/api/user/info/{userPrimaryId}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getUserInfo(@PathVariable int userPrimaryId) {
        Map<String, Object> response = new HashMap<>();
        UsersVO user = lectureService.getUserById(userPrimaryId);

        if (user == null) {
            response.put("success", false);
            response.put("message", "유저를 찾을 수 없습니다.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        if (user.getUserProfile() != null && user.getUserProfileMimeType() != null) {
            String base64Image = Base64.getEncoder().encodeToString(user.getUserProfile());
            String imageSrc = "data:" + user.getUserProfileMimeType() + ";base64," + base64Image;
            response.put("userProfileImage", imageSrc);
        } else {
            response.put("userProfileImage", null);
        }

        user.setUserPw(null); // 비밀번호는 프론트로 보내지 않도록 처리
        response.put("success", true);
        response.put("user", user);
        return ResponseEntity.ok(response);
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

    @GetMapping("/api/posts/byCategory")
    @ResponseBody
    public List<RecruitmentPostVO> getPostsByCategory(@RequestParam("category") String category) {
        return lectureService.getPostsByCategory(category);
    }


}
