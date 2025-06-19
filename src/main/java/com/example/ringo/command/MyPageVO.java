package com.example.ringo.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyPageVO {

    private Integer classManageId ;
    private String classManageStatus;
    private Timestamp classManageStartDate;
    private Timestamp classManageFinishDate;
    private Integer recruitmentPostId;
    private Integer userPrimaryId;

    private String recruitmentPostTitle;
    private String recruitmentPostContent;
    private Timestamp recruitmentPostSystime;
    private String recruitmentPostCategory;
    private Integer recruitmentPostViewcount;

    private Integer applyWishId;
    private Boolean isWish;
    private Boolean isApply;


}
