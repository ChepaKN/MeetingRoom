package com.project.server.service;

import com.project.server.dto.AuthorizationDTO;
import com.project.server.entity.User;
import com.project.server.repository.AuthorizationRepository;
import org.springframework.stereotype.Service;
@Service
public class AuthorizationService {

    private User currentUser;

    private boolean loginStatus = false;

    private final AuthorizationRepository authorizationRepository;

    public AuthorizationService(AuthorizationRepository authorizationRepository) {
        this.authorizationRepository = authorizationRepository;
    }

    public User login(AuthorizationDTO authorizationDTO){
        currentUser = this.authorizationRepository.findByLoginAndAndPassword(authorizationDTO.getLogin(),
                authorizationDTO.getPassword());
        setLoginStatus(currentUser != null);
        return currentUser;
    }

    public void logout(){
        this.currentUser = null;
        setLoginStatus(false);
    }

    public User getCurrentUser() {
        return currentUser;
    }

    public boolean getLoginStatus() {
        return loginStatus;
    }

    public void setLoginStatus(boolean loginStatus) {
        this.loginStatus = loginStatus;
    }
}
