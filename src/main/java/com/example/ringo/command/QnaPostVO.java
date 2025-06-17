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
public class QnaPostVO {
    private int qnaPostId;
    private String qnaPostTitle;
    private String qnaPostContent;
    private Timestamp qnaPostDate;
    private Timestamp qnaPostAnswerDate;
    private Integer userPrimaryId;
}

