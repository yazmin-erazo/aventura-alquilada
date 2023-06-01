package com.digitalbooking.digitalbooking.infrastructure.user.controller;

import com.digitalbooking.digitalbooking.application.user.handler.UserHandler;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
@Tag(name = "Controller to fetch users")
public class QueryControllerUser {

    @Autowired
    private UserHandler userHandler;

    @GetMapping("{id-user}")
    @PreAuthorize("@authorizationFilter.hasPermission('userList')")
    @Operation(summary = "find user", description = "Method to find user by Id")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id-user") Long id) {
        return ResponseEntity.ok(userHandler.findById(id));
    }

    @GetMapping("users")
    @PreAuthorize("@authorizationFilter.hasPermission('userList')")
    @Operation(summary = "list users", description = "Method to fetch the users")
    public ResponseEntity<List<UserDTO>> listUsers(){
        return ResponseEntity.ok(userHandler.getUsers());
    }
}
