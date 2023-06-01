package com.digitalbooking.digitalbooking.common.config.security;

import com.digitalbooking.digitalbooking.domain.role.dto.RoleDTO;
import com.digitalbooking.digitalbooking.domain.role.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;

@Component("authorizationFilter")
public class AuthorizationFilter {

    @Autowired
    RoleService roleService;

    @Autowired
    private JwtUtils jwtUtils;

    public Boolean hasPermission(String methodName) {
        try {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            String bearerToken = request.getHeader("Authorization");
            if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
                String token = bearerToken.substring(7);
                String roleName = jwtUtils.getRoleFromJWT(token);
                RoleDTO role = roleService.getRoleByName(roleName);
                Field field = RoleDTO.class.getDeclaredField(methodName);
                field.setAccessible(true);
                return (Boolean) field.get(role);
            }else {
                return false;
            }
        } catch (NoSuchFieldException | IllegalAccessException e) {
            return false;
        }
    }

}
