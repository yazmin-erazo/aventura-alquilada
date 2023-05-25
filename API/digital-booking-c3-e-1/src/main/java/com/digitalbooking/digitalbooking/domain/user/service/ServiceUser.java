package com.digitalbooking.digitalbooking.domain.user.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.entity.User;
import com.digitalbooking.digitalbooking.domain.user.repository.RepositoryUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceUser {
    @Autowired
    RepositoryUser repositoryUser;

    public Long createUser(User user) throws Exception {
        repositoryUser.findByEmail(user.getEmail()).ifPresent(userDTO -> {throw new ExceptionInvalidValue("Un usuario asociado al correo electrónico "+userDTO.getEmail()+", ya existe");});
        return repositoryUser.save(user);
    }

    public UserDTO getUser(Long id) {
        return repositoryUser.findById(id);
    }

    public UserDTO getUser(String email) {
        return repositoryUser.findByEmail(email).orElseThrow(() -> new ExceptionInvalidValue("El usuario con el correo suministrado no existe"));
    }

}
