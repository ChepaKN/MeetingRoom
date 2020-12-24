package com.project.server.repository;
import com.project.server.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Integer> {
    List<Meeting> findByDateBetween(Long start, Long stop);
    Meeting findByDate(Long date);
    boolean existsByDate(Long date);

    @Query(value = " SELECT max(date) FROM meetingstable WHERE date < :stop", nativeQuery = true)
    Long findNearestBelow(@Param("stop") Long startMeeting);

    @Query(value = " SELECT min(date) FROM meetingstable WHERE date > :start", nativeQuery = true)
    Long findNearestTop(@Param("start") Long stopMeeting);

    @Query(value = " SELECT count(*) FROM meetingstable WHERE date > :start", nativeQuery = true)
    Long findTopCounter(@Param("start") Long stopMeeting);

    @Query(value = " SELECT count(*) FROM meetingstable WHERE date < :stop", nativeQuery = true)
    Long findBelowCounter(@Param("stop") Long stopMeeting);

}
