package com.digitalbooking.digitalbooking.application.product.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

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
    @Schema(allowableValues = {"El Wagontop™ es un camping completo para 8 personas, duradero, resistente al agua y fácil de montar. Además, tiene un 50% más de espacio que una tienda estándar para 8 personas."})
    private String description;
    @JsonProperty
    @Schema(allowableValues = {"8 personas"})
    private String size;
    @JsonProperty
    @Schema(allowableValues = {"No aplica"})
    private String gender;
    @JsonProperty
    @Schema(allowableValues = {"10"})
    private BigDecimal deposit;
    @JsonProperty
    @Schema(allowableValues = {"1"})
    private Long idCategory;
    @JsonProperty
    @Schema(allowableValues = {"/9j/4AAQ6iwEuaM1Fuo3UWA/9k="})
    private String image;
    @JsonProperty
    @Schema(allowableValues = {"Carpa.jpg"})
    private String fileName;
    @JsonProperty
    @Schema(allowableValues = {"Amarillo"})
    private String color;
    @JsonProperty
    @Schema(allowableValues = {"Poliéster"})
    private String material;
    @JsonProperty
    private List<SecondaryImages> secondaryImages;
    @JsonProperty
    @Schema(allowableValues = {"4"})
    private Long cityId;
}
