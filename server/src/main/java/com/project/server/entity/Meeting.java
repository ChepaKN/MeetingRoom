package com.project.server.entity;

import com.project.server.controller.dto.MeetingDTO;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "meetingstable")
public class Meeting {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "date")
    private Long date;

    @Column(name = "initiator")
    private String initiator;

    @Column(name = "estimatedtime")
    private Integer estimatedTime;

    public Meeting(Long date, String initiator, Integer estimatedTime) {
        this.date = date;
        this.initiator = initiator;
        this.estimatedTime = estimatedTime;
    }

    public Meeting() {

    }
    public MeetingDTO toDTO(){
        return new MeetingDTO(this.id.toString(),
                this.date,
                this.initiator,
                this.estimatedTime);
    }

    public Integer getId() {
        return id;
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

    public void setId(Integer id) {
        this.id = id;
    }
}
