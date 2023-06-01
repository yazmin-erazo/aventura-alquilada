package com.digitalbooking.digitalbooking.application.product.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SecondaryImages {
    @JsonProperty
    @Schema(allowableValues = {"/9j/4AAQ6iwEuaM1Fuo3UWA/9k="})
    private String image;
    @JsonProperty
    @Schema(allowableValues = {"Carpa23.jpg"})
    private String fileName;
}
