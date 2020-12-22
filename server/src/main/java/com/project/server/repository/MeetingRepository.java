package com.project.server.repository;

import com.project.server.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Integer> {
    List<Meeting> findByDateBetween(Long startOfWeek, Long endOfWeek);
}
