package com.digitalbooking.digitalbooking.infrastructure.role.controller;

import com.digitalbooking.digitalbooking.application.role.handler.RoleHandler;
import com.digitalbooking.digitalbooking.domain.role.dto.RoleDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/role")
@Tag(name = "Controller to fetch roles")
public class QueryControllerRole {

    @Autowired
    private RoleHandler roleHandler;

    @GetMapping("{id-role}")
    @PreAuthorize("@authorizationFilter.hasPermission('roleList')")
    @Operation(summary = "find role", description = "Method to find role by Id")
    public ResponseEntity<RoleDTO> getRole(@PathVariable("id-role") Long id) {
        return ResponseEntity.ok(roleHandler.findById(id));
    }

    @GetMapping("roles")
    @PreAuthorize("@authorizationFilter.hasPermission('roleList')")
    @Operation(summary = "list roles", description = "Method to fetch the roles")
    public ResponseEntity<List<RoleDTO>> listRoles(){
        return ResponseEntity.ok(roleHandler.getRoles());
    }
}
