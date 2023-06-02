package com.digitalbooking.digitalbooking.infrastructure.user.adapter;

import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.entity.User;
import com.digitalbooking.digitalbooking.domain.user.repository.RepositoryUser;
import com.digitalbooking.digitalbooking.infrastructure.role.adapter.RepositoryRoleMySql;
import com.digitalbooking.digitalbooking.infrastructure.role.adapter.RoleEntity;
import com.digitalbooking.digitalbooking.infrastructure.user.MapToUser;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class RepositoryUserImpl implements RepositoryUser {
    @Autowired
    RepositoryUserMySql repositoryUserMySql;

    @Autowired
    RepositoryRoleMySql repositoryRoleMySql;
    @Override
    public Long save(User user, String token, LocalDateTime generatingDate) {
        Optional<RoleEntity> roleEntity = repositoryRoleMySql.findById(user.getRole().getId());
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user,userEntity);
        userEntity.setToken(token);
        userEntity.setGeneratingDate(generatingDate);
        userEntity.setRoleEntity(roleEntity.get());
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
    public List<UserDTO> getAll() {
        return repositoryUserMySql.findAll().stream().map(MapToUser::mapToUser).collect(Collectors.toList());
    }

    @Override
    public void activateUser(Long id) {
        var user = repositoryUserMySql.findById(id).get();
        user.setIsActive(true);
        repositoryUserMySql.save(user);
    }

    @Override
    public void deleteUserByTokenExp(Long id) {
        repositoryUserMySql.deleteById(id);
    }
}
