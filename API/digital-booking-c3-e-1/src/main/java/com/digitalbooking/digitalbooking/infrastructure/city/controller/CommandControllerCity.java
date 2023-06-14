package com.digitalbooking.digitalbooking.infrastructure.city.controller;

import com.digitalbooking.digitalbooking.application.city.handler.CityHandler;
import com.digitalbooking.digitalbooking.application.city.request.CommandCreateCity;
import com.digitalbooking.digitalbooking.application.city.request.CommandUpdateCity;
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
@RequestMapping("/city")
@Tag(name = "Controller to create or modify cities")
public class CommandControllerCity {

    @Autowired
    CityHandler cityHandler;

    @PostMapping
    @PreAuthorize("@authorizationFilter.hasPermission('cityCreate')")
    @Operation(summary = "Create City", description = "Method to create a new city")
    public ResponseEntity<CommandResponse<Long>> createCity(@RequestBody CommandCreateCity commandCreateCity) throws Exception {
        return new ResponseEntity<>(new CommandResponse<>(cityHandler.createCity(commandCreateCity)), HttpStatus.CREATED);
    }

    @PutMapping("{id-city}")
    @PreAuthorize("@authorizationFilter.hasPermission('cityUpdate')")
    @Operation(summary = "Update City", description = "Method to update a city")
    public ResponseEntity<CommandResponse<String>> updateCity(@PathVariable("id-city") Long id, @RequestBody CommandUpdateCity commandUpdateCity) throws Exception {
        return new ResponseEntity<>(new CommandResponse<>(cityHandler.updateCity(id, commandUpdateCity)), HttpStatus.OK);
    }

    @DeleteMapping("{id-city}")
    @PreAuthorize("@authorizationFilter.hasPermission('cityDelete')")
    @Operation(summary = "Delete City", description = "Method to delete a city")
    public ResponseEntity<CommandResponse<String>> deleteCity(@PathVariable("id-city") Long id) {
        return new ResponseEntity<>(new CommandResponse<>(cityHandler.deleteCity(id)), HttpStatus.OK);
    }
}
