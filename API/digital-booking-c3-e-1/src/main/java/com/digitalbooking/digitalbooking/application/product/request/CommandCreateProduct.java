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
    @Schema(allowableValues = {"Carpa"})
    private String name;
    @JsonProperty
    @Schema(allowableValues = {"Mountain Hardware"})
    private String brand;
    @JsonProperty
    @Schema(allowableValues = {"Nueva"})
    private String state;
    @JsonProperty
    @Schema(allowableValues = {"100"})
    private BigDecimal price;
    @JsonProperty
    @Schema(allowableValues = {"Esta es la descripción"})
    private String description;
    @JsonProperty
    @Schema(allowableValues = {"8 personas"})
    private String size;
    @JsonProperty
    @Schema(allowableValues = {"No tiene"})
    private String gender;
    @JsonProperty
    @Schema(allowableValues = {"10"})
    private BigDecimal deposit;
    @JsonProperty
    @Schema(allowableValues = {"1"})
    private Long idCategory;
}
