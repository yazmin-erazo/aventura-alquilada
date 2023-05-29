package com.digitalbooking.digitalbooking.application.auth.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    @JsonProperty
    @Schema(allowableValues = {"digitalhouse.dh123@gmail.com"})
    private String email;

    @JsonProperty
    @Schema(allowableValues = {"digitalDb12"})
    private String password;
}
