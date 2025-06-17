package com.example.ringo.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruitmentPostVO {
    private int recruitmentPostId;
    private String recruitmentPostTitle;
    private String recruitmentPostContent;
    private Timestamp recruitmentPostSystime;
    private String recruitmentPostCategory;
    private Integer recruitmentPostViewcount;
    private Integer userPrimaryId;
}
