package com.project.server.entity;

import javax.annotation.Generated;
import java.util.Date;

public class Meeting {

    private Integer id;
    private Date date;
    private String initiator;
    private Long estimatedTime;

    public Meeting(Date date, String initiator, long estimatedTime) {
        this.date = date;
        this.initiator = initiator;
        this.estimatedTime = estimatedTime;
    }

    public Meeting() {
    }

    public Integer getId() {
        return id;
    }

    public Date getDate() {
        return date;
    }

    public String getInitiator() {
        return initiator;
    }

    public Long getEstimatedTime() {
        return estimatedTime;
    }

    public void setId(Integer id) { this.id = id; }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setInitiator(String initiator) {
        this.initiator = initiator;
    }

    public void setEstimatedTime(long estimatedTime) {
        this.estimatedTime = estimatedTime;
    }
}