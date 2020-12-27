package com.project.server.dto;

public class MeetingDTO {

    private String id;
    private Long date;
    private String initiator;
    private Integer estimatedTime;

    public MeetingDTO(String id, Long date, String initiator, Integer estimatedTime) {
        this.id = id;
        this.date = date;
        this.initiator = initiator;
        this.estimatedTime = estimatedTime;
    }

    public MeetingDTO() {
    }

    public Long getDate() {
        return date;
    }

    public String getInitiator() {
        return initiator;
    }

    public Integer getEstimatedTime() {
        return estimatedTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDate(Long date) {
        this.date = date;
    }

    public void setInitiator(String initiator) {
        this.initiator = initiator;
    }

    public void setEstimatedTime(Integer estimatedTime) {
        this.estimatedTime = estimatedTime;
    }
}
