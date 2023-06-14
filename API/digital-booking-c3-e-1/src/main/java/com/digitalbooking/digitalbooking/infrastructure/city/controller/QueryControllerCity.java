package com.digitalbooking.digitalbooking.infrastructure.city.controller;

import com.digitalbooking.digitalbooking.application.city.handler.CityHandler;
import com.digitalbooking.digitalbooking.domain.city.dto.CityDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/city")
@Tag(name = "Controller to fetch cities")
public class QueryControllerCity {

    @Autowired
    private CityHandler cityHandler;

    @GetMapping("cities")
    @Operation(summary = "list cities", description = "Method to fetch the cities")
    public ResponseEntity<List<CityDTO>> listCities(){
        return ResponseEntity.ok(cityHandler.getCity());
    }

    @GetMapping("{id-city}")
    @Operation(summary = "find city", description = "Method to find city by Id")
    public ResponseEntity<CityDTO> getCity(@PathVariable("id-city") Long id) {
        return ResponseEntity.ok(cityHandler.findById(id));
    }
}
