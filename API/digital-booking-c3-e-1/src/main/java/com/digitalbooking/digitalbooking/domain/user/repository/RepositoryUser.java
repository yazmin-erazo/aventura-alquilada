package com.digitalbooking.digitalbooking.domain.user.repository;

import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.entity.User;

import java.util.Optional;

public interface RepositoryUser {

    Long save(User user , String token);

    UserDTO findById(Long id);

    Optional<UserDTO> findByEmail(String email);

    Optional<UserDTO> findByToken(String token);

    void activateUser(Long id);
}
