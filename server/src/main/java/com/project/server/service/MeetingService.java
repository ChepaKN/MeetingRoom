package com.project.server.service;

import com.project.server.controller.dto.DbQueryDTO;
import com.project.server.controller.dto.MeetingDTO;
import com.project.server.entity.Meeting;
import com.project.server.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MeetingService {

    private final MeetingRepository meetingRepository;

    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    public void create(MeetingDTO meetingDTO) {
        Meeting meeting = new Meeting(
                meetingDTO.getDate(),
                meetingDTO.getInitiator(),
                meetingDTO.getEstimatedTime());
        meetingRepository.save(meeting);
    }

    public List<MeetingDTO> findByWeek(DbQueryDTO dbQueryDTO){
        List<Meeting> meetings = meetingRepository.findByDateBetween(dbQueryDTO.getStartOfWeek(),
                dbQueryDTO.getEndOfWeek());
        return meetings.stream()
                .map(m -> new MeetingDTO(   m.getId().toString(),
                        m.getDate(),
                        m.getInitiator(),
                        m.getEstimatedTime()))
                .collect(Collectors.toList());
    }

    public List<MeetingDTO> readAll() {
        List<Meeting> meetings = meetingRepository.findAll();
        return meetings.stream()
                .map(m -> new MeetingDTO(   m.getId().toString(),
                                            m.getDate(),
                                            m.getInitiator(),
                                            m.getEstimatedTime()))
                .collect(Collectors.toList());
    }

    public List<MeetingDTO> readByWeek(DbQueryDTO dbQueryDTO) {
        return null;
    }

    public MeetingDTO read(int id) {
        Meeting meeting = meetingRepository.getOne(id);
        return new MeetingDTO( meeting.getId().toString(),
                                                meeting.getDate(),
                                                meeting.getInitiator(),
                                                meeting.getEstimatedTime());
    }

    public boolean update(MeetingDTO meetingDTO, int id) {
        if (meetingRepository.existsById(id)) {
            Meeting meeting = new Meeting(
                    meetingDTO.getDate(),
                    meetingDTO.getInitiator(),
                    meetingDTO.getEstimatedTime());
            meeting.setId(id);
            meetingRepository.save(meeting);
            return true;
        }
        return false;
    }

    public boolean delete(int id) {
        if (meetingRepository.existsById(id)) {
            meetingRepository.deleteById(id);
            return true;
        }
        return false;
    }

//    public boolean availableToSave(MeetingDTO meetingDTO){
//        long start  = meetingDTO.getDate();
//        long stop   = start + meetingDTO.getEstimatedTime() * 1000;
//        List<Meeting> meetings = meetingRepository.findByDateBetween(start,  stop);
//        return meetings.size() == 0;
//    }

    public void deleteAll() {
        meetingRepository.deleteAll();
    }

}
