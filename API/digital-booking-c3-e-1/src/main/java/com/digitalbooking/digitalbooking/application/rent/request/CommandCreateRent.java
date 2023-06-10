package com.digitalbooking.digitalbooking.application.rent.request;

import com.digitalbooking.digitalbooking.application.product.request.SecondaryImages;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

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
}
