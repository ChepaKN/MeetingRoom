package com.project.server.controller;

import com.project.server.entity.Meeting;
import com.project.server.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class MeetingController {

    private final MeetingService meetingService;

    @Autowired
    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @PostMapping(value = "/meetings")
    public ResponseEntity<?> create(@RequestBody Meeting meeting){
        meetingService.create(meeting);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "/meetings")
    public ResponseEntity<List<Meeting>>read(){
        final List<Meeting> meetings = meetingService.readAll();

        return meetings != null && !meetings.isEmpty()
                ? new ResponseEntity<>(meetings, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/meetings/{id}")
    public ResponseEntity<Meeting> read(@PathVariable(name = "id") int id) {
        final Meeting meeting = meetingService.read(id);

        return meeting != null
                ? new ResponseEntity<>(meeting, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping(value = "/meetings/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") int id, @RequestBody Meeting meeting) {
        final boolean updated = meetingService.update(meeting, id);

        return updated
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping(value = "/meetings/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") int id) {
        final boolean deleted = meetingService.delete(id);

        return deleted
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping(value = "/meetings")
    public ResponseEntity<?> deleteAll(){
        meetingService.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
