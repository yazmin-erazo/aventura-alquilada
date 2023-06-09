package com.digitalbooking.digitalbooking.domain.rent.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import com.digitalbooking.digitalbooking.domain.rent.dto.RentDTO;
import com.digitalbooking.digitalbooking.domain.rent.entity.Rent;
import com.digitalbooking.digitalbooking.domain.rent.repository.RentRepository;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.repository.RepositoryUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class RentService {

    @Autowired
    RentRepository rentRepository;

    @Autowired
    RepositoryProduct repositoryProduct;

    @Autowired
    RepositoryUser repositoryUser;

    public String deleteRent(Rent rent){
        rentRepository.deleteRent(rent.getId());
        return "Alquiler eliminado correctamente";
    }

    public Long createRent(Rent rent, String userEmail){
        repositoryProduct.findByIdAndIsDelete(rent.getProduct().getId()).orElseThrow(()->new ExceptionNullValue("Producto no encontrado"));
        UserDTO user = repositoryUser.findByEmail(userEmail).orElseThrow(()->new ExceptionNullValue("Usuario no encontrado"));
        if(!Objects.equals(user.getId(), rent.getUser().getId())){
            throw new ExceptionInvalidValue("El id del usuario no pertenece al suyo, no puede crear alquileres para otros usuarios");
        }
        return rentRepository.createRent(rent);
    }

    public String updateRent(Rent rent) throws Exception {
        rentRepository.findByIdAndState(rent.getId()).orElseThrow(()->new ExceptionNullValue("Alquiler no encontrado"));
        rentRepository.updateRent(rent);
        return "Alquiler actualizado correctamente";
    }

    public List<RentDTO> getRents(){
        return rentRepository.getAll();
    }

    public RentDTO getRent(Long id) {
        return rentRepository.findByIdAndState(id).orElseThrow(()->new ExceptionNullValue("Alquiler no encontrado"));
    }

}
