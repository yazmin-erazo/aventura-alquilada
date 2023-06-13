package com.digitalbooking.digitalbooking.application.user.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommandAddToFavoritesProductsRequest {
    @JsonProperty
    @Schema(allowableValues = {"35"})
    private Long productId;
}
