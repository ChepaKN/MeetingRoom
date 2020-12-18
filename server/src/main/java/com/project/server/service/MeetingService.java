package com.project.server.service;

import com.project.server.controller.dto.MeetingDTO;

import java.util.List;

public interface MeetingService {
    void create(MeetingDTO meetingDTO);
    MeetingDTO read(int id);
    List<MeetingDTO> readAll();
    boolean update(MeetingDTO meetingDTO, int id);
    boolean delete(int id);
    void deleteAll();
}
