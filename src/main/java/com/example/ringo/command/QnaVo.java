package com.example.ringo.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QnaVo {

    private Integer qnaPostId;
    private String qnaPostTitle;
    private String qnaPostContent;
    private String qnaPostDate;
    private String qnaPostAnswerDate;
    private String userPrimaryId;
    private String qnaPostAnswerContent;



}
