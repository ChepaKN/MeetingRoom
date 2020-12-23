package com.project.server.repository;

import com.project.server.controller.dto.MeetingDTO;
import com.project.server.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Integer> {
    List<Meeting> findByDateBetween(Long start, Long stop);

    @Query(value = "SELECT * FROM meetings.public.meetingstable m WHERE (m.date + m.estimatedtime*1000) > :start" +
            " AND :stop < m.date", nativeQuery = true)
    List<Meeting> customQuery(@Param("start") Long startMeeting,
                              @Param("stop") Long stopMeeting);

}
