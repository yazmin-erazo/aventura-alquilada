package com.digitalbooking.digitalbooking.application.user.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommandCreateUser {

    @JsonProperty
    @Schema(allowableValues = {"Maria"})
    private String name;
    @JsonProperty
    @Schema(allowableValues = {"Garcia"})
    private String lastName;
    @JsonProperty
    @Schema(allowableValues = {"maria.garcia.123@gmail.com"})
    private String email;
    @JsonProperty
    @Schema(allowableValues = {"12345"})
    private String password;

}
