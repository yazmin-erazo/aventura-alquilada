package com.digitalbooking.digitalbooking.infrastructure.role;

import com.digitalbooking.digitalbooking.domain.role.dto.RoleDTO;
import com.digitalbooking.digitalbooking.infrastructure.role.adapter.RoleEntity;
import org.springframework.beans.BeanUtils;

public class MapToRole {

    public static RoleDTO mapToRole(RoleEntity roleEntity){
        RoleDTO role = new RoleDTO();
        BeanUtils.copyProperties(roleEntity,role);
        return role;
    }

}
