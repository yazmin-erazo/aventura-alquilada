package com.digitalbooking.digitalbooking.domain.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageProductDTO {
    private Long id;
    private String imageURL;
}
