package com.digitalbooking.digitalbooking.domain.rent.entity;

import com.digitalbooking.digitalbooking.common.validations.Validator;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

import static lombok.AccessLevel.PRIVATE;

@Getter
@AllArgsConstructor(access = PRIVATE)
@NoArgsConstructor(access = PRIVATE)
public class Rent {

    private Long id;
    private Product product;
    private User user;
    private String state;
    private Date starDate;
    private Date endDate;
    private String comment;
    private Double score;

    public Rent(Long id) {
        this.id = id;
    }


    public static Rent create(Long productId, Long userId, Date starDate, Date endDate) {

        Product product = Product.createById(productId);
        User user = User.createById(userId);
        Validator.validateMandatory(starDate, "La fecha de inicio es requerida para crear una reserva");
        Validator.validateMandatory(endDate, "La fecha de finalización es requerida para crear una reserva");
        return new Rent(0L, product, user, "CREADO", starDate, endDate, null,null);
    }

    public static Rent update(Long id,
                              Long productId,
                              Long userId,
                              Date starDate,
                              Date endDate,
                              String comment) {

        Product product = Product.createById(productId);
        User user = User.createById(userId);
        Validator.validateMandatory(starDate, "La fecha de inicio es requerida para actualizar una reserva");
        Validator.validateMandatory(endDate, "La fecha de finalización es requerida para actualizar una reserva");
        Validator.validateMandatory(comment, "El comentario es requerido para actualizar una reserva");
        return new Rent(id, product, user, "ACTUALIZADO", starDate, endDate, comment, null);
    }

    public static Rent createById(Long id) {
        Validator.validateMandatory(id, "El Id de la reserva es requerido");
        return new Rent(id);
    }
}
