package com.digitalbooking.digitalbooking.infrastructure.role.controller;


import com.digitalbooking.digitalbooking.application.role.handler.RoleHandler;
import com.digitalbooking.digitalbooking.application.role.request.CommandCreateRole;
import com.digitalbooking.digitalbooking.application.role.request.CommandUpdateRole;
import com.digitalbooking.digitalbooking.common.response.CommandResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/role")
@Tag(name = "Controller to create or modify roles")
public class CommandControllerRole {

    @Autowired
    RoleHandler roleHandler;


    @PostMapping
    @PreAuthorize("@authorizationFilter.hasPermission('roleCreate')")
    @Operation(summary = "Create Role", description = "Method to create a new role")
    public ResponseEntity<CommandResponse<Long>> createRole(@RequestBody CommandCreateRole commandCreateRole) throws Exception {
        return new ResponseEntity<>(new CommandResponse<>(roleHandler.createRole(commandCreateRole)), HttpStatus.CREATED);
    }

    @PutMapping
    @PreAuthorize("@authorizationFilter.hasPermission('roleUpdate')")
    @Operation(summary = "Update Role", description = "Method to update a role")
    public ResponseEntity<CommandResponse<String>> updateRole(@RequestBody CommandUpdateRole commandUpdateRole) throws Exception {
        return new ResponseEntity<>(new CommandResponse<>(roleHandler.updateRole(commandUpdateRole)), HttpStatus.OK);
    }

    @DeleteMapping("{id-role}")
    @PreAuthorize("@authorizationFilter.hasPermission('roleDelete')")
    @Operation(summary = "Delete role", description = "Method to delete a role")
    public ResponseEntity<CommandResponse<String>> deleteRole(@PathVariable("id-role") Long id) {
        return new ResponseEntity<>(new CommandResponse<>(roleHandler.deleteRole(id)), HttpStatus.OK);
    }
}
