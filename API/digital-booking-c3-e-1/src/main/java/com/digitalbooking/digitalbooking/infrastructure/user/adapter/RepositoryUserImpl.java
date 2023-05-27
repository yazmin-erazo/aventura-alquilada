package com.digitalbooking.digitalbooking.infrastructure.user.adapter;

import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.entity.User;
import com.digitalbooking.digitalbooking.domain.user.repository.RepositoryUser;
import com.digitalbooking.digitalbooking.infrastructure.user.MapToUser;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class RepositoryUserImpl implements RepositoryUser {
    @Autowired
    RepositoryUserMySql repositoryUserMySql;
    @Override
    public Long save(User user, String token) {
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user,userEntity);
        userEntity.setToken(token);
        return repositoryUserMySql.save(userEntity).getId();
    }

    @Override
    public UserDTO findById(Long id) {
        return repositoryUserMySql.findById(id).map(MapToUser::mapToUser).orElseThrow(()->new ExceptionNullValue("Usuario no encontrado"));
    }

    @Override
    public Optional<UserDTO> findByEmail(String email) {
        return repositoryUserMySql.findByEmail(email).map(MapToUser::mapToUser);
    }

    @Override
    public Optional<UserDTO> findByToken(String token) {
        return repositoryUserMySql.findByToken(token).map(MapToUser::mapToUser);
    }

    @Override
    public void activateUser(Long id) {
        var user = repositoryUserMySql.findById(id).get();
        user.setIsActive(true);
        repositoryUserMySql.save(user);
    }
}
