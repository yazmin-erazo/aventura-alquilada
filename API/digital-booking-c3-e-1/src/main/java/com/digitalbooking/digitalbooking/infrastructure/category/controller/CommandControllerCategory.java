package com.digitalbooking.digitalbooking.infrastructure.category.controller;

import com.digitalbooking.digitalbooking.application.category.handler.CategoryHandler;
import com.digitalbooking.digitalbooking.application.category.request.CommandCreateCategory;
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
@RequestMapping("/category")
@Tag(name = "Controller to create or modify categories")
public class CommandControllerCategory {

   @Autowired
   CategoryHandler categoryHandler;

   @PostMapping
   @Operation(summary = "Create Category", description = "Method to create a new category")
   public ResponseEntity<CommandResponse<Long>> createCategory(@RequestBody CommandCreateCategory commandCreateCategory) throws Exception {
      return new ResponseEntity<>(new CommandResponse<>(categoryHandler.createCategory(commandCreateCategory)), HttpStatus.CREATED);
   }
}
