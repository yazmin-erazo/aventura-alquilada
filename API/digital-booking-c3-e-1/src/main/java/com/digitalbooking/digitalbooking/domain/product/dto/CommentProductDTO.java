package com.digitalbooking.digitalbooking.domain.product.dto;


import com.digitalbooking.digitalbooking.common.validations.Validator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

@Data
@AllArgsConstructor
@NoArgsConstructor
public final class CommentProductDTO {

    private Long userId;
    private String comment;
    private Double score;

}
