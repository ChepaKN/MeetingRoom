package com.project.server.controller;

import com.project.server.controller.dto.DbQueryDTO;
import com.project.server.controller.dto.MeetingDTO;
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
    public ResponseEntity<?> create(@RequestBody MeetingDTO meetingDTO){
        meetingService.create(meetingDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping(value = "/meetings/findByWeek")
    public ResponseEntity<?> readByWeek(@RequestBody DbQueryDTO dbQueryDTO){
        final List<MeetingDTO> meetingDTOs = meetingService.findByWeek(dbQueryDTO);
        return meetingDTOs != null && !meetingDTOs.isEmpty()
                ? new ResponseEntity<>(meetingDTOs, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/meetings/")
    public ResponseEntity<List<MeetingDTO>>read(){
        final List<MeetingDTO> meetingDTOs = meetingService.readAll();

        return meetingDTOs != null && !meetingDTOs.isEmpty()
                ? new ResponseEntity<>(meetingDTOs, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/meetings/{id}")
    public ResponseEntity<MeetingDTO> read(@PathVariable(name = "id") int id) {
        final MeetingDTO meetingDTO = meetingService.read(id);

        return meetingDTO != null
                ? new ResponseEntity<>(meetingDTO, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping(value = "/meetings/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") int id, @RequestBody MeetingDTO meetingDTO) {
        final boolean updated = meetingService.update(meetingDTO, id);

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
