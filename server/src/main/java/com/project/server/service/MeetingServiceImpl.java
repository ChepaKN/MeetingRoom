package com.project.server.service;

import com.project.server.entity.Meeting;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class MeetingServiceImpl implements MeetingService {

    //DB
    private static final Map<Integer, Meeting> MEETING_REPOSITORY_MAP = new HashMap<>();
    //ID
    private static final AtomicInteger MEETING_ID_HOLDER = new AtomicInteger();

    @Override
    public void create(Meeting meeting) {
        final int id = MEETING_ID_HOLDER.incrementAndGet();
        meeting.setId(id);
        MEETING_REPOSITORY_MAP.put(id, meeting);
    }

    @Override
    public List<Meeting> readAll() {
        return new ArrayList<>(MEETING_REPOSITORY_MAP.values());
    }

    @Override
    public Meeting read(int id) {
        return MEETING_REPOSITORY_MAP.get(id);
    }

    @Override
    public boolean update(Meeting meeting, int id) {
        if (MEETING_REPOSITORY_MAP.containsKey(id)) {
            meeting.setId(id);
            MEETING_REPOSITORY_MAP.put(id, meeting);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) {
        return MEETING_REPOSITORY_MAP.remove(id) != null;
    }

    @Override
    public void deleteAll() {
        MEETING_REPOSITORY_MAP.clear();
    }

    @PostConstruct
    private void initData(){
        Meeting meeting = new Meeting("2020.12.31 23:00", "Konstantin", 120 );
        this.create(meeting);
    }

}
