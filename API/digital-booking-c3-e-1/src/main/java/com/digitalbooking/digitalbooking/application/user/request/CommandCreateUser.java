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
    @Schema(allowableValues = {"Carpa"})
    private String name;
    @JsonProperty
    @Schema(allowableValues = {"Mountain Hardware"})
    private String lastName;
    @JsonProperty
    @Schema(allowableValues = {"Nueva"})
    private String email;
    @JsonProperty
    @Schema(allowableValues = {"100"})
    private String password;

}
