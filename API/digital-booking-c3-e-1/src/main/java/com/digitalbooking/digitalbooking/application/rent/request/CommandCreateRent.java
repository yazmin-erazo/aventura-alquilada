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
public class CommandCreateRent {

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
    @Schema(allowableValues = {"Great Product"})
    private String comment;
    @JsonProperty
    @Schema(allowableValues = {"At home"})
    private String delivery;
}
