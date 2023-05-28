package com.digitalbooking.digitalbooking.application.product.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommandUpdateProduct {
    @JsonProperty
    @Schema(allowableValues = {"1"})
    private Long idCategory;
}
