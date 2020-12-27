package com.project.server.repository;

import com.project.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorizationRepository extends JpaRepository<User, Integer> {
    User findByLoginAndAndPassword(String login, String password);
}
