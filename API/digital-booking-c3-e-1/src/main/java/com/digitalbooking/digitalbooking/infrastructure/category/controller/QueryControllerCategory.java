package com.digitalbooking.digitalbooking.infrastructure.category.controller;

import com.digitalbooking.digitalbooking.application.category.handler.CategoryHandler;
import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/category")
@Tag(name = "Controller to fetch categories")
public class QueryControllerCategory {

    @Autowired
    private CategoryHandler categoryHandler;

    @GetMapping("categories")
    @Operation(summary = "list categories", description = "Method to fetch the categories")
    public ResponseEntity<List<CategoryDTO>> listCategories(){
        return ResponseEntity.ok(categoryHandler.getCategories());
    }

}
