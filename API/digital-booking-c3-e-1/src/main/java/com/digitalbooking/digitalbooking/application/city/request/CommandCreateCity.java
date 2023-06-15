package com.digitalbooking.digitalbooking.application.city.request;

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
public class CommandCreateCity {

    @JsonProperty
    @Schema(allowableValues = {"Bogota"})
    private String name;
    @JsonProperty
    @Schema(allowableValues = {"DC"})
    private String code;
    @JsonProperty
    @Schema(allowableValues = {"COL"})
    private String countryCode;
    @JsonProperty
    @Schema(allowableValues = {"4.671153"})
    private BigDecimal latitude;
    @JsonProperty
    @Schema(allowableValues = {"-74.100006"})
    private BigDecimal longitude;
    @JsonProperty
    @Schema(allowableValues = {"Bogota D.C."})
    private String genericName;
}
