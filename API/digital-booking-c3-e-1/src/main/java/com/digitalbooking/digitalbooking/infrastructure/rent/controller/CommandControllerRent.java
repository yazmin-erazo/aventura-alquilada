package com.digitalbooking.digitalbooking.infrastructure.rent.controller;

import com.digitalbooking.digitalbooking.application.rent.handler.RentHandler;
import com.digitalbooking.digitalbooking.application.rent.request.CommandCreateRent;
import com.digitalbooking.digitalbooking.application.rent.request.CommandUpdateRent;
import com.digitalbooking.digitalbooking.common.response.CommandResponse;
import com.digitalbooking.digitalbooking.domain.auth.entity.UserDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rent")
@Tag(name = "Controller to create or modify rents")
public class CommandControllerRent {

    @Autowired
    RentHandler rentHandler;

    @PostMapping
    @PreAuthorize("@authorizationFilter.hasPermission('rentCreate')")
    @Operation(summary = "Create Rent", description = "Method to create a new rent")
    public ResponseEntity<CommandResponse<Long>> createRent(@RequestBody CommandCreateRent commandCreateRent, Authentication authentication) throws Exception {
        return new ResponseEntity<>(new CommandResponse<>(rentHandler.createRent(commandCreateRent, ((UserDetailsImpl)authentication.getPrincipal()).getEmail())), HttpStatus.CREATED);
    }

    @PutMapping
    @PreAuthorize("@authorizationFilter.hasPermission('rentUpdate')")
    @Operation(summary = "Update Rent", description = "Method to update a rent")
    public ResponseEntity<CommandResponse<String>> updateRent(@RequestBody CommandUpdateRent commandUpdateRent) throws Exception {
        return new ResponseEntity<>(new CommandResponse<>(rentHandler.updateRent(commandUpdateRent)), HttpStatus.OK);
    }

    @DeleteMapping("{id-rent}")
    @PreAuthorize("@authorizationFilter.hasPermission('rentDelete')")
    @Operation(summary = "Delete rent", description = "Method to delete a rent")
    public ResponseEntity<CommandResponse<String>> deleteRent(@PathVariable("id-rent") Long id) {
        return new ResponseEntity<>(new CommandResponse<>(rentHandler.deleteRent(id)), HttpStatus.OK);
    }
}
