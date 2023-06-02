package com.digitalbooking.digitalbooking.infrastructure.user;

import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.infrastructure.user.adapter.UserEntity;
import org.springframework.beans.BeanUtils;

public class MapToUser {

    public static UserDTO mapToUser(UserEntity userEntity){
        UserDTO user = new UserDTO();
        BeanUtils.copyProperties(userEntity,user);
        user.setRole(userEntity.getRoleEntity().getName());
        return user;
    }

}
