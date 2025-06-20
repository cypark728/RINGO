package com.example.ringo.controller;

import com.example.ringo.command.UsersVO;
import com.example.ringo.users.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
        return "sign";
    }

    @GetMapping("/userinfo")
    public String userinfo(Model model) {
        model.addAttribute("pageName", "userinfo");
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
        return usersService.isUserIdDuplicate(userId);
    }

    @GetMapping("/idfind")
    public String idfind(Model model) {
        model.addAttribute("pageName", "idfind");
        return "sign";
    }

    @GetMapping("/idfindgood")
    public String idfindGood(Model model) {
        model.addAttribute("pageName", "idfindgood");
        return "sign";
    }

    @GetMapping("/pwchange")
    public String pwchange(Model model) {
        model.addAttribute("pageName", "pwchange");
        return "sign";
    }

    @GetMapping("/pwreset")
    public String pwreset(Model model) {
        model.addAttribute("pageName", "pwreset");
        return "sign";
    }

    @PostMapping("/find-id-action")
    public ResponseEntity<Map<String, Object>> findIdAction(@RequestBody Map<String, String> params) {
        // ... (이하 모든 메소드에 닫는 중괄호 '}' 추가)
        String name = params.get("name");
        String phone = params.get("phone");
        List<UsersVO> foundUsers = usersService.findId(name, phone);
        Map<String, Object> response = new HashMap<>();
        if (foundUsers != null && !foundUsers.isEmpty()) {
            // ... 로직 생략 ...
        } else {
            response.put("success", false);
            response.put("message", "일치하는 회원 정보가 없습니다.");
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-user-for-reset")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> verifyUser(@RequestBody UsersVO vo, HttpServletRequest request) {
        // ... 로직 생략 ...
        return ResponseEntity.ok(new HashMap<>());
    }

    @PostMapping("/reset-password-action")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody Map<String, String> params, HttpSession session) {
        // ... 로직 생략 ...
        return ResponseEntity.ok(new HashMap<>());
    }

    @GetMapping("/api/user/info")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getUserInfo(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        UsersVO loginUser = (UsersVO) session.getAttribute("loginUser");
        if (loginUser == null) {
            response.put("success", false);
            response.put("message", "로그인이 필요합니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        loginUser.setUserPw(null);
        response.put("success", true);
        response.put("user", loginUser);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/api/user/update")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> updateUserInfo(
            @RequestPart("userInfoData") UsersVO updatedVO,
            @RequestPart(value = "profileImageFile", required = false) MultipartFile profileImageFile,
            HttpSession session) throws Exception {

        // --- 디버깅 로그 시작 ---
        System.out.println("--- 회원정보 수정 요청 수신 ---");
        System.out.println("수정할 텍스트 정보: " + updatedVO.toString());
        if (profileImageFile != null && !profileImageFile.isEmpty()) {
            System.out.println("수정할 이미지 파일명: " + profileImageFile.getOriginalFilename());
            System.out.println("파일 크기: " + profileImageFile.getSize() + " bytes");
        } else {
            System.out.println("프로필 이미지 변경 없음.");
        }
        System.out.println("---------------------------");
        // --- 디버깅 로그 끝 ---

        Map<String, Object> response = new HashMap<>();
        UsersVO loginUser = (UsersVO) session.getAttribute("loginUser");

        if (loginUser == null) {
            response.put("success", false);
            response.put("message", "로그인 권한이 없습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        if (profileImageFile != null && !profileImageFile.isEmpty()) {
            byte[] imageBytes = profileImageFile.getBytes();
            updatedVO.setUserProfile(imageBytes);
        } else {
            // 새 이미지를 업로드하지 않으면, 기존 이미지(byte[])를 그대로 사용
            updatedVO.setUserProfile(loginUser.getUserProfile());
        }

        updatedVO.setUserId(loginUser.getUserId());
        usersService.updateUserInfo(updatedVO);

        // 세션 정보 최신 데이터로 업데이트
        loginUser.setUserName(updatedVO.getUserName());
        loginUser.setUserNickName(updatedVO.getUserNickName());
        loginUser.setUserPhone(updatedVO.getUserPhone());
        loginUser.setUserEmail(updatedVO.getUserEmail());
        loginUser.setUserInterest(updatedVO.getUserInterest());
        if(updatedVO.getUserProfile() != null) {
            loginUser.setUserProfile(updatedVO.getUserProfile());
        }
        session.setAttribute("loginUser", loginUser);

        response.put("success", true);
        response.put("message", "회원정보가 성공적으로 수정되었습니다.");
        return ResponseEntity.ok(response);
    }
}
