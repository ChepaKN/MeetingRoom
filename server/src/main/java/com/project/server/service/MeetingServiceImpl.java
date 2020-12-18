package com.project.server.service;

import com.project.server.controller.dto.MeetingDTO;
import com.project.server.entity.Meeting;
import com.project.server.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MeetingServiceImpl implements MeetingService {

    private final MeetingRepository meetingRepository;

    public MeetingServiceImpl(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    @Override
    public void create(MeetingDTO meetingDTO) {
        meetingRepository.save(meetingDTO.toDbEntity());
    }

    @Override
    public List<MeetingDTO> readAll() {
        List<Meeting> meetings = meetingRepository.findAll();
        return meetings.stream().map(Meeting::toDTO).collect(Collectors.toList());
    }

    @Override
    public MeetingDTO read(int id) {
        return meetingRepository.getOne(id).toDTO();
    }

    @Override
    public boolean update(MeetingDTO meetingDTO, int id) {
        if (meetingRepository.existsById(id)) {
            Meeting meeting = meetingDTO.toDbEntity();
            meeting.setId(id);
            meetingRepository.save(meeting);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) {
        if (meetingRepository.existsById(id)) {
            meetingRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public void deleteAll() {
        meetingRepository.deleteAll();
    }

}
