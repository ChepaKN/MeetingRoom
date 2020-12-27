package com.project.server.controller;

import com.project.server.dto.AuthorizationDTO;
import com.project.server.entity.User;
import com.project.server.service.AuthorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class AuthorizationController {

    private final AuthorizationService authorizationService;

    @Autowired
    public AuthorizationController(AuthorizationService authorizationService){
        this.authorizationService = authorizationService;
    }

    @PostMapping(value = "/authorization")
    public ResponseEntity<User> login(@RequestBody AuthorizationDTO authorizationDTO){
        User user = this.authorizationService.login(authorizationDTO);
        if(user != null){
            user.setPassword("****");
            return new ResponseEntity<>(user, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping(value = "/authorization")
    public boolean getLoginStatus(){
        return this.authorizationService.getLoginStatus();
    }

    @GetMapping(value = "/authorization/logout")
    public void logout(){
        this.authorizationService.logout();
    }

    @GetMapping(value = "/authorization/getUser")
    public ResponseEntity<User> getCurrentUser(){

        User user = this.authorizationService.getCurrentUser();
        if(user != null){
            user.setPassword("****");
            return new ResponseEntity<>(user, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(new User(), HttpStatus.NO_CONTENT);
        }
    }

}
