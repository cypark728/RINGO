package com.example.ringo.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruitmentReviewVO {
    private int recruitmentReviewId;
    private String recruitmentReviewTitle;
    private String recruitmentReviewContent;
    private String recruitmentReviewScore;
    private Integer recruitmentPostId;
    private Integer userPrimaryId;
}

