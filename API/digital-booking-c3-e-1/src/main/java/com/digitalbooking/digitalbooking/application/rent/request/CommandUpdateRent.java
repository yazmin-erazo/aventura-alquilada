package com.digitalbooking.digitalbooking.application.rent.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommandUpdateRent {
    @JsonProperty
    @Schema(allowableValues = {"1"})
    private Long rentId;
    @JsonProperty
    @Schema(allowableValues = {"35"})
    private Long productId;
    @JsonProperty
    @Schema(allowableValues = {"74"})
    private Long userId;
    @JsonProperty
    //@Schema(allowableValues = {"100"})
    private Date starDate;
    @JsonProperty
    //@Schema(allowableValues = {"100"})
    private Date endDate;
    @JsonProperty
    @Schema(allowableValues = {"Excelente servicio"})
    private String comment;
}
