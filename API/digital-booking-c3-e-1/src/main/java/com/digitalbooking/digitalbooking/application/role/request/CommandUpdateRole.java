package com.digitalbooking.digitalbooking.application.role.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommandUpdateRole {

    @JsonProperty
    @Schema(allowableValues = {"1"})
    private Long idRole;
    @JsonProperty
    @Schema(allowableValues = {"Admin"})
    private String name;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean categoryList;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean categoryCreate;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean categoryUpdate;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean categoryDelete;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean productList;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean productCreate;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean productUpdate;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean productDelete;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean userList;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean userCreate;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean userUpdate;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean userDelete;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean roleList;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean roleCreate;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean roleUpdate;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean roleDelete;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean rentList;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean rentCreate;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean rentUpdate;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean rentDelete;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean cityList;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean cityCreate;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean cityUpdate;
    @JsonProperty
    @Schema(allowableValues = {"true"})
    private Boolean cityDelete;}
