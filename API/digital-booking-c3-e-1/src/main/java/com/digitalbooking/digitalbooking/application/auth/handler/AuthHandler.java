package com.digitalbooking.digitalbooking.application.auth.handler;

import com.digitalbooking.digitalbooking.application.auth.request.LoginRequest;
import com.digitalbooking.digitalbooking.domain.auth.entity.Auth;
import com.digitalbooking.digitalbooking.domain.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AuthHandler {

    @Autowired
    AuthService authService;

    public String login(LoginRequest loginRequest) {
        return authService.login(new Auth(loginRequest.getEmail(), loginRequest.getPassword()));
    }
}
