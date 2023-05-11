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
public class CommandCreateProduct {

    @JsonProperty
    @Schema(allowableValues = {"Bicicleta"})
    private String name;
    @JsonProperty
    @Schema(allowableValues = {"GW"})
    private String brand;
    @JsonProperty
    @Schema(allowableValues = {"Reacondicionado"})
    private String state;
    @JsonProperty
    @Schema(allowableValues = {"100"})
    private BigDecimal price;
    @JsonProperty
    @Schema(allowableValues = {"Esta es la descripción"})
    private String description;
    @JsonProperty
    @Schema(allowableValues = {"50"})
    private String size;
    @JsonProperty
    @Schema(allowableValues = {"male"})
    private String gender;
}
