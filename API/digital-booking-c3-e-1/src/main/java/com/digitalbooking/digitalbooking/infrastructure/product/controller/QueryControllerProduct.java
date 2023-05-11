package com.digitalbooking.digitalbooking.infrastructure.product.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/product")
@Tag(name = "Controller to fetch products")
public class QueryControllerProduct {
}
