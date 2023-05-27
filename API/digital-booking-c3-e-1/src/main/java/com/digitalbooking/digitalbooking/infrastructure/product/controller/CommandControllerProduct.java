package com.digitalbooking.digitalbooking.infrastructure.product.controller;

import com.digitalbooking.digitalbooking.application.product.handler.ProductHandler;
import com.digitalbooking.digitalbooking.application.product.request.CommandCreateProduct;
import com.digitalbooking.digitalbooking.application.product.request.CommandUpdateProduct;
import com.digitalbooking.digitalbooking.common.response.CommandResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/product")
@Tag(name = "Controller to create or modify products")
public class CommandControllerProduct {

    @Autowired
    ProductHandler productHandler;

    @PostMapping
    @Operation(summary = "Create Product ", description = "Method to create a new product")
    public ResponseEntity<CommandResponse<Long>> createProduct(@RequestBody CommandCreateProduct commandCreateProduct) throws Exception {
        return new ResponseEntity<>(new CommandResponse<>(productHandler.createProduct(commandCreateProduct)), HttpStatus.CREATED);
    }

    @PutMapping("{id-product}")
    @Operation(summary = "Update Product ", description = "Method to update a product")
    public ResponseEntity<CommandResponse<String>> updateProduct(@PathVariable("id-product") Long id, @RequestBody CommandUpdateProduct commandUpdateProduct) throws Exception {
        return new ResponseEntity<>(new CommandResponse<>(productHandler.updateProduct(id, commandUpdateProduct)), HttpStatus.OK);
    }

    @DeleteMapping("{id-product}")
    @Operation(summary = "Delete Product", description = "Method to delete a product")
    public ResponseEntity<CommandResponse<String>> deleteProduct(@PathVariable("id-product") Long id) {
        return new ResponseEntity<>(new CommandResponse<>(productHandler.deleteProduct(id)), HttpStatus.OK);
    }
}
