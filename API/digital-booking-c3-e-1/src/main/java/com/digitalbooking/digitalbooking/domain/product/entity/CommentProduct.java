package com.digitalbooking.digitalbooking.domain.product.entity;


import com.digitalbooking.digitalbooking.common.validations.Validator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

@Getter
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PRIVATE)
public final class CommentProduct {

    private Long productId;
    private String comment;
    private Double score;

    public static CommentProduct create(Long productId,
                                        String comment,
                                        Double score) throws Exception {
        Validator.validateMandatory(productId, "El producto es requerido para realizar un comentario");
        Validator.validateMandatory(comment, "El comentario es requerido para realizar un comentario");
        Validator.validateMandatory(score, "La puntuación es requerida para realizar un comentario");
        Validator.validatePositive(score,"El score no debe ser negativo");
        Validator.validateGreaterThan(score,5.0,"El score no debe ser mayor a 5.0");
        return new CommentProduct(productId, comment, score);
    }

}
