package com.digitalbooking.digitalbooking.infrastructure.role.controller;


import com.digitalbooking.digitalbooking.application.role.handler.RoleHandler;
import com.digitalbooking.digitalbooking.application.role.request.CommandCreateRole;
import com.digitalbooking.digitalbooking.common.response.CommandResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/role")
@Tag(name = "Controller to create or modify roles")
public class CommandControllerRole {

    @Autowired
    RoleHandler roleHandler;


    @PostMapping
    @Operation(summary = "Create Role", description = "Method to create a new role")
    public ResponseEntity<CommandResponse<Long>> createRole(@RequestBody CommandCreateRole commandCreateRole) throws Exception {
        return new ResponseEntity<>(new CommandResponse<>(roleHandler.createRole(commandCreateRole)), HttpStatus.CREATED);
    }
}
