package com.digitalbooking.digitalbooking.infrastructure.rent.controller;

import com.digitalbooking.digitalbooking.application.rent.handler.RentHandler;
import com.digitalbooking.digitalbooking.domain.rent.dto.RentDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rent")
@Tag(name = "Controller to fetch rent")
public class QueryControllerRent {

    @Autowired
    private RentHandler rentHandler;

    @GetMapping("{id-rent}")
    @PreAuthorize("@authorizationFilter.hasPermission('rentList')")
    @Operation(summary = "find rent", description = "Method to find rent by Id")
    public ResponseEntity<RentDTO> getRent(@PathVariable("id-rent") Long id) {
        return ResponseEntity.ok(rentHandler.findById(id));
    }

    @GetMapping("rents")
    @PreAuthorize("@authorizationFilter.hasPermission('rentList')")
    @Operation(summary = "list rents", description = "Method to fetch the rents")
    public ResponseEntity<List<RentDTO>> listRents(){
        return ResponseEntity.ok(rentHandler.getRents());
    }
}
