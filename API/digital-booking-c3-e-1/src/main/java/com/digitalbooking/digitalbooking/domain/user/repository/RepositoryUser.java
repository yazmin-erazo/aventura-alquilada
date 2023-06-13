package com.digitalbooking.digitalbooking.domain.user.repository;

import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.entity.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface RepositoryUser {

    Long save(User user , String token, LocalDateTime generatingDate);

    UserDTO findById(Long id);

    Optional<UserDTO> findByEmail(String email);

    Optional<UserDTO> findByToken(String token);

    List<UserDTO> getAll();

    void activateUser(Long id);

    void deleteUserByTokenExp(Long id);

    void addProductToFavorite(Long userId, Long productId);

    void deleteProductFromFavorite(Long userId, Long productId);
}
