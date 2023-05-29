package com.digitalbooking.digitalbooking.infrastructure.auth.controller;

import com.digitalbooking.digitalbooking.application.auth.handler.AuthHandler;
import com.digitalbooking.digitalbooking.application.auth.request.LoginRequest;
import com.digitalbooking.digitalbooking.application.auth.response.LoginResponse;
import com.digitalbooking.digitalbooking.common.response.CommandResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
@Tag(name = "Controller to user authenticate")
public class CommandControllerAuth {

    @Autowired
    AuthHandler authHandler;

    @PostMapping
    @Operation(summary = "Login", description = "Method to loger the user")
    public ResponseEntity<CommandResponse<LoginResponse>> login(@RequestBody LoginRequest loginRequest) {
        return new ResponseEntity<>(new CommandResponse<>(new LoginResponse(authHandler.login(loginRequest))), HttpStatus.OK);
    }
}
