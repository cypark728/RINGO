package com.example.ringo.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruitmentPostVO {
    private Integer recruitmentPostId;
    private String recruitmentPostTitle;
    private String recruitmentPostContent;
    private Timestamp recruitmentPostSystime;
    private String recruitmentPostCategory;
    private Integer recruitmentPostViewcount;
    private String recruitmentPostWeeklySessions;
    private String recruitmentPostSessionDuration; // 단위: 시간
    private Integer recruitmentPostPrice;
    private String recruitmentPostPriceBasis;
    private LocalTime recruitmentPostContactStartTime;
    private LocalTime recruitmentPostContactEndTime;
    private String recruitmentPostAvgResponseTime;
    private Integer userPrimaryId;

    private String userId;
}
