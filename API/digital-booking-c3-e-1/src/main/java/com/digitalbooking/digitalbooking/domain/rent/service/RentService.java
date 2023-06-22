package com.digitalbooking.digitalbooking.domain.rent.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import com.digitalbooking.digitalbooking.domain.rent.dto.RentDTO;
import com.digitalbooking.digitalbooking.domain.rent.entity.Rent;
import com.digitalbooking.digitalbooking.domain.rent.repository.RentRepository;
import com.digitalbooking.digitalbooking.domain.role.dto.RoleDTO;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.repository.RepositoryUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
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

    public String deleteRent(Rent rent, String userEmail) throws NoSuchFieldException, IllegalAccessException {
        RentDTO rentDTO = rentRepository.findByIdAndState(rent.getId()).orElseThrow(()->new ExceptionNullValue("El alquiler que intenta actualizar no se encontró"));
        validateRentOwnership(rentDTO.getUser().getId(), userEmail, "rentDelete");
        rentRepository.deleteRent(rent.getId());
        return "Alquiler cancelado correctamente";
    }

    public Long createRent(Rent rent, String userEmail) throws NoSuchFieldException, IllegalAccessException {
        repositoryProduct.findByIdAndIsDelete(rent.getProduct().getId()).orElseThrow(()->new ExceptionNullValue("Producto no encontrado"));
        repositoryProduct.findByIdAndDatesRents(rent.getProduct().getId(), rent.getStarDate(), rent.getEndDate()).orElseThrow( () -> new ExceptionInvalidValue("No se puede realizar una reserva en la fecha indicada porque el producto ya tiene una reserva que se cruza"));
        validateRentOwnership(rent.getUser().getId(), userEmail, "rentCreate");
        return rentRepository.createRent(rent);
    }

    public String updateRent(Rent rent, String userEmail) throws Exception {
        RentDTO rentDto = rentRepository.findByIdAndState(rent.getId()).orElseThrow(()->new ExceptionNullValue("Alquiler no encontrado"));
        validateRentOwnership(rentDto.getUser().getId(), userEmail, "rentUpdate");
        rentRepository.updateRent(rent);
        return "Alquiler actualizado correctamente";
    }

    public List<RentDTO> getRents(String userEmail){
        UserDTO user = repositoryUser.findByEmail(userEmail).orElseThrow(()->new ExceptionNullValue("Usuario no encontrado"));
        if(user.getRoleDTO().getRentList())
            return rentRepository.getAll();
        else
            return rentRepository.getAllByUserId(user.getId());
    }

    public RentDTO getRent(Long id, String userEmail) throws NoSuchFieldException, IllegalAccessException {
        RentDTO rentDto = rentRepository.findByIdAndState(id).orElseThrow(()->new ExceptionNullValue("Alquiler no encontrado"));
        validateRentOwnership(rentDto.getUser().getId(), userEmail,"rentList");
        return rentDto;
    }

    private void validateRentOwnership(Long idOwner, String userEmail, String methodName) throws NoSuchFieldException, IllegalAccessException {
        UserDTO user = repositoryUser.findByEmail(userEmail).orElseThrow(()->new ExceptionNullValue("Usuario no encontrado"));
        Field field = RoleDTO.class.getDeclaredField(methodName);
        field.setAccessible(true);
        Boolean permission = (Boolean) field.get(user.getRoleDTO());
        if(!(Objects.equals(user.getId(), idOwner) || !permission)){
            throw new ExceptionInvalidValue("El id del usuario no te pertenece, no puedes crear o acceder a alquileres de otros usuarios");
        }
    }
}
