package com.example.ringo.users.service;

import com.example.ringo.command.UsersVO;
import com.example.ringo.users.mapperJava.UsersMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
//import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    private UsersMapper usersMapper;

//    @Autowired
//    private PasswordEncoder passwordEncoder; // PasswordEncoder 주입

    @Override
    public List<UsersVO> usersVOList() {return usersMapper.usersVOList();}

    @Transactional
    @Override
    public void signup(UsersVO usersVO) {

        if (isUserIdDuplicate(usersVO.getUserId())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

//        String encodedPw = passwordEncoder.encode(usersVO.getUserPw());
//        usersVO.setUserPw(encodedPw);

        // 닉네임 = 아이디
        usersVO.setUserNickName(usersVO.getUserId());

        // 나이 계산
        LocalDate birthDate = usersVO.getUserBirth();
        int age = Period.between(birthDate, LocalDate.now()).getYears();
        usersVO.setUserAge(age + 1);

        usersMapper.signup(usersVO);
    }

    @Override
    public boolean isUserIdDuplicate(String userId) {
        return usersMapper.countByUserId(userId) > 0;
    }

}
