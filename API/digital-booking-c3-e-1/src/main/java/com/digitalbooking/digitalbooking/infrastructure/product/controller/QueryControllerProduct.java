package com.digitalbooking.digitalbooking.infrastructure.product.controller;

import com.digitalbooking.digitalbooking.application.product.handler.ProductHandler;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/product")
@Tag(name = "Controller to fetch products")
public class QueryControllerProduct {

    @Autowired
    private ProductHandler productHandler;

    @GetMapping("products")
    @Operation(summary = "list products", description = "Method to fetch the products")
    public ResponseEntity<List<ProductDTO>> listProducts(){
        return ResponseEntity.ok(productHandler.getProduct());
    }

    @GetMapping("{id-product}")
    @Operation(summary = "find product", description = "Method to find product by Id")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable("id-product") Long id) {
        return ResponseEntity.ok(productHandler.findById(id));
    }
}
