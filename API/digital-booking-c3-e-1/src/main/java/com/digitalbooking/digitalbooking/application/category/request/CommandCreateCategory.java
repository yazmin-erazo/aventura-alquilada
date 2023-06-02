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
   @Schema(allowableValues = {"Natación"})
   private String name;

   @JsonProperty
   @Schema(allowableValues = {"/9j/4AAQSkZJRgABAgEASABIAAD/4SyjRXhpZgA"})
   private String image;

   @JsonProperty
   @Schema(allowableValues = {"Alquile con nosotros y haga de cada brazada una victoria"})
   private String description;

   @JsonProperty
   @Schema(allowableValues = {"Natacion.jpg"})
   private String fileName;
}
