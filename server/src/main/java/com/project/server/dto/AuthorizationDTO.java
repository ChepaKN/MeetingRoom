package com.project.server.dto;

public class AuthorizationDTO {
    private final String  login;
    private final String  password;

    public AuthorizationDTO(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }
}
