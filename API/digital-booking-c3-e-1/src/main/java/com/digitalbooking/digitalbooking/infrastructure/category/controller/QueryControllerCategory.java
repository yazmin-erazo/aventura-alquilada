package com.digitalbooking.digitalbooking.infrastructure.category.controller;

import com.digitalbooking.digitalbooking.application.category.handler.CategoryHandler;
import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("{id-category}")
    @Operation(summary = "find category", description = "Method to find category by Id")
    public ResponseEntity<Optional<CategoryDTO>> getCategory(@PathVariable("id-category") Long id) {
        return ResponseEntity.ok(categoryHandler.findById(id));
    }

    @GetMapping("{id-category}/hasProducts")
    @Operation(summary = "know if a category has products", description = "Method to find if a category by Id has products")
    public boolean hasProducts(@PathVariable("id-category") Long id) {
        //return ResponseEntity.ok(categoryHandler.hasProducts(id));
        return true;
    }

}
