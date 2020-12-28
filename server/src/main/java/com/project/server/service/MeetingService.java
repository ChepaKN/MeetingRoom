package com.project.server.service;

import com.project.server.dto.DbQueryDTO;
import com.project.server.dto.MeetingDTO;
import com.project.server.entity.Meeting;
import com.project.server.repository.MeetingRepository;
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

    public boolean availableToSave(MeetingDTO meetingDTO){
        boolean toReturn;
        int msInMin = 60 * 1000;
        long meetCount = meetingRepository.count();
        long belowCount = meetingRepository.findBelowCounter(meetingDTO.getDate());
        long topCount = meetingRepository.findTopCounter(meetingDTO.getDate() + meetingDTO.getEstimatedTime() * msInMin);

        if(meetingRepository.existsByDate(meetingDTO.getDate())){
            return false;
        }

        if(meetCount == 0){
            //empty table
            toReturn = true;
        }else if(meetCount == 1){
            //one record
            Meeting meeting = meetingRepository.findAll().get(0);
            if(meetingDTO.getDate() > meeting.getDate()){
                toReturn = (meetingDTO.getDate() > (meeting.getDate() + meeting.getEstimatedTime() * msInMin));
            }else{
                toReturn = ((meetingDTO.getDate() + meetingDTO.getEstimatedTime() * msInMin) < meeting.getDate());
            }
        }else{
            if(belowCount > 0 && topCount > 0) {
                //between two dates
                long nearestBelowDate = meetingRepository.findNearestBelow(meetingDTO.getDate());
                long nearestTopDate = meetingRepository.findNearestTop(meetingDTO.getDate());
                Meeting nearestBelowMeeting = meetingRepository.findByDate(nearestBelowDate);
                Meeting nearestTopMeeting = meetingRepository.findByDate(nearestTopDate);
                if (meetingDTO.getDate() > (nearestBelowMeeting.getDate() + nearestBelowMeeting.getEstimatedTime() * msInMin)) {
                    toReturn = (meetingDTO.getDate() + meetingDTO.getEstimatedTime() * msInMin) < nearestTopMeeting.getDate();
                } else {
                    toReturn = false;
                }
            }else if (belowCount == 0){
                //below
                long nearestTopDate = meetingRepository.findNearestTop(meetingDTO.getDate());
                toReturn = ((meetingDTO.getDate() + meetingDTO.getEstimatedTime() * msInMin) < nearestTopDate);
            }else{
                //above
                long nearestBelowDate = meetingRepository.findNearestBelow(meetingDTO.getDate());
                Meeting nearestBelowMeeting = meetingRepository.findByDate(nearestBelowDate);
                toReturn = (meetingDTO.getDate() > (nearestBelowMeeting.getDate() + nearestBelowMeeting.getEstimatedTime() * msInMin));
            }
        }
        return toReturn;
    }

    public void deleteAll() {
        meetingRepository.deleteAll();
    }

}
