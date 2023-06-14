package com.digitalbooking.digitalbooking.infrastructure.product.controller;

import com.digitalbooking.digitalbooking.application.product.handler.ProductHandler;
import com.digitalbooking.digitalbooking.application.product.request.CommandCommentProduct;
import com.digitalbooking.digitalbooking.application.product.request.CommandCreateProduct;
import com.digitalbooking.digitalbooking.application.product.request.CommandUpdateProduct;
import com.digitalbooking.digitalbooking.application.user.request.CommandAddToFavoritesProductsRequest;
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
@RequestMapping("/product")
@Tag(name = "Controller to create or modify products")
public class CommandControllerProduct {

    @Autowired
    ProductHandler productHandler;

    @PostMapping
    @PreAuthorize("@authorizationFilter.hasPermission('productCreate')")
    @Operation(summary = "Create Product", description = "Method to create a new product")
    public ResponseEntity<CommandResponse<Long>> createProduct(@RequestBody CommandCreateProduct commandCreateProduct) throws Exception {
        return new ResponseEntity<>(new CommandResponse<>(productHandler.createProduct(commandCreateProduct)), HttpStatus.CREATED);
    }

    @PutMapping("{id-product}")
    @PreAuthorize("@authorizationFilter.hasPermission('productUpdate')")
    @Operation(summary = "Update Product", description = "Method to update a product")
    public ResponseEntity<CommandResponse<String>> updateProduct(@PathVariable("id-product") Long id, @RequestBody CommandUpdateProduct commandUpdateProduct) throws Exception {
        return new ResponseEntity<>(new CommandResponse<>(productHandler.updateProduct(id, commandUpdateProduct)), HttpStatus.OK);
    }

    @DeleteMapping("{id-product}")
    @PreAuthorize("@authorizationFilter.hasPermission('productDelete')")
    @Operation(summary = "Delete Product", description = "Method to delete a product")
    public ResponseEntity<CommandResponse<String>> deleteProduct(@PathVariable("id-product") Long id) {
        return new ResponseEntity<>(new CommandResponse<>(productHandler.deleteProduct(id)), HttpStatus.OK);
    }

    @DeleteMapping("favorite/{id-product}")
    @Operation(summary = "Delete Product from favorite list ", description = "Method to delete a product from favorite list")
    public ResponseEntity<CommandResponse<String>> deleteProductFromFavorite(@PathVariable("id-product") Long id, Authentication authentication) {
        return new ResponseEntity<>(new CommandResponse<>(productHandler.deleteProductFromFavorite(id,((UserDetailsImpl)authentication.getPrincipal()).getEmail())), HttpStatus.OK);
    }

    @PostMapping("favorite")
    @Operation(summary = "Add Product to favorite list ", description = "Method to add a product to favorite list")
    public ResponseEntity<CommandResponse<String>> addProductToFavorite(@RequestBody CommandAddToFavoritesProductsRequest commandAddToFavoritesProductsRequest, Authentication authentication) {
        return new ResponseEntity<>(new CommandResponse<>(productHandler.addProductToFavorite(commandAddToFavoritesProductsRequest,((UserDetailsImpl)authentication.getPrincipal()).getEmail())), HttpStatus.OK);
    }

    @PostMapping("comment")
    @Operation(summary = "Comment Product", description = "Method to comment a product")
    public ResponseEntity<CommandResponse<String>> commentProduct(@RequestBody CommandCommentProduct commandCommentProduct, Authentication authentication) throws Exception {
        return new ResponseEntity<>(new CommandResponse<>(productHandler.commentProduct(commandCommentProduct,((UserDetailsImpl)authentication.getPrincipal()).getEmail())), HttpStatus.OK);
    }
}
