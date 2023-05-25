package com.digitalbooking.digitalbooking.application.category.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CommandCreateCategory {

   @JsonProperty
   @Schema(allowableValues = {"Este es el nombre."})
   private String name;

   @JsonProperty
   @Schema(allowableValues = {"Esta es la imagen."})
   private String image;

   @JsonProperty
   @Schema(allowableValues = {"Esta es la descripción."})
   private String description;

   @JsonProperty
   @Schema(allowableValues = {"Este es el nombre del archivo."})
   private String fileName;
}
