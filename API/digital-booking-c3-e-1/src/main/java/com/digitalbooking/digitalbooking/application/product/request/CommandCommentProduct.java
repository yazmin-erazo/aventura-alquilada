package com.digitalbooking.digitalbooking.application.product.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommandCommentProduct {
    @JsonProperty
    @Schema(allowableValues = {"35"})
    private Long productId;
    @JsonProperty
    @Schema(allowableValues = {"Magnífico producto"})
    private String comment;
    @JsonProperty
    @Schema(allowableValues = {"4.5"})
    private Double score;
}
