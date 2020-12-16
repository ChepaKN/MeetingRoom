package com.project.server.service;

import com.project.server.entity.Meeting;
import com.sun.org.apache.xpath.internal.operations.Bool;

import java.util.List;

public interface MeetingService {
    void create(Meeting meeting);
    Meeting read(int id);
    List<Meeting> readAll();
    boolean update(Meeting meeting, int id);
    boolean delete(int id);
}
