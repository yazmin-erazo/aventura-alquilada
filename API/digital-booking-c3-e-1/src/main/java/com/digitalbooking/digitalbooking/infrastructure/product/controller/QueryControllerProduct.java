package com.digitalbooking.digitalbooking.infrastructure.product.controller;

import com.digitalbooking.digitalbooking.application.product.handler.ProductHandler;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
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
    public ResponseEntity<List<ProductDTO>> listProducts(@Parameter(description = "Filter products by brand")
                                                         @RequestParam(required = false) String brandFilter,
                                                         @Parameter(description = "Filter products by gender")
                                                         @RequestParam(required = false) String genderFilter,
                                                         @Parameter(description = "Filter products by name")
                                                         @RequestParam(required = false) String nameFilter,
                                                         @Parameter(description = "Filter products by price less than")
                                                         @RequestParam(required = false) BigDecimal priceLessThan,
                                                         @Parameter(description = "Filter products by price greater than")
                                                         @RequestParam(required = false) BigDecimal priceGreaterThan,
                                                         @Parameter(description = "Filter products by size")
                                                         @RequestParam(required = false) String sizeFilter,
                                                         @Parameter(description = "Filter products by state")
                                                         @RequestParam(required = false) String stateFilter,
                                                         @Parameter(description = "Filter products by color")
                                                         @RequestParam(required = false) String colorFilter,
                                                         @Parameter(description = "Filter products by material")
                                                         @RequestParam(required = false) String materialFilter,
                                                         @Parameter(description = "Filter products by Date")
                                                         @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                                         @Parameter(description = "Filter products by Date")
                                                         @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
                                                         @Parameter(description = "Filter products by cityId")
                                                         @RequestParam(required = false) Long cityId,
                                                         @Parameter(description = "search a product by diferent columns")
                                                         @RequestParam(required = false) String search) {
        return ResponseEntity.ok(productHandler.getProduct(brandFilter, genderFilter, nameFilter, priceLessThan, priceGreaterThan, sizeFilter, stateFilter, colorFilter, materialFilter, cityId, startDate, endDate, search));
    }

    @GetMapping("{id-product}")
    @Operation(summary = "find product", description = "Method to find product by Id")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable("id-product") Long id) {
        return ResponseEntity.ok(productHandler.findById(id));
    }
}
