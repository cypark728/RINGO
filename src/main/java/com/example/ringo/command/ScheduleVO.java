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
public class ScheduleVO {
    private int scheduleId;
    private String scheduleDay;
    private Timestamp scheduleStartTime;
    private Timestamp scheduleFinishTime;
    private Integer userPrimaryId;
}

