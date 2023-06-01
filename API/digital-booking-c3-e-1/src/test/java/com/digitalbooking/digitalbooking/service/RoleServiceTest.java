package com.digitalbooking.digitalbooking.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.role.dto.RoleDTO;
import com.digitalbooking.digitalbooking.domain.role.entity.Role;
import com.digitalbooking.digitalbooking.domain.role.repository.RoleRepository;
import com.digitalbooking.digitalbooking.domain.role.service.RoleService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RoleServiceTest {

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private RoleService roleService;

    @Test
    void testCreateRoleSuccess() {
        Role role = new Role(19L);
        when(roleRepository.createRole(any(Role.class))).thenReturn(19L);

        Long roleId = roleService.createRole(role);

        assertEquals(19L, roleId);
        verify(roleRepository, times(1)).createRole(any(Role.class));
    }

    @Test
    void testDeleteRoleSuccess() {
        Role role = new Role(1L);

        String result = roleService.deleteRole(role);

        assertEquals("Rol eliminado correctamente", result);
        verify(roleRepository, times(1)).deleteRole(role.getId());
    }


    @Test
    void testUpdateRoleSuccess() throws Exception {
        Role role = new Role(1L);

        when(roleRepository.findByIdAndIsDelete(role.getId()))
                .then(invocation -> {
                    Long roleId = invocation.getArgument(0);
                    if (role.getId().equals(roleId)) {
                        return Optional.of(role);
                    } else {
                        return Optional.empty();
                    }
                });

        String result = roleService.updateRole(role);

        assertEquals("Rol actualizado correctamente", result);
        verify(roleRepository, times(1)).findByIdAndIsDelete(role.getId());
        verify(roleRepository, times(1)).updateRole(role);
    }

    @Test
    void testUpdateRoleNotFound() {
        Role role = new Role(1L);

        when(roleRepository.findByIdAndIsDelete(role.getId())).thenReturn(Optional.empty());

        ExceptionNullValue exception = assertThrows(ExceptionNullValue.class, () -> {
            roleService.updateRole(role);
        });

        assertEquals("Rol no encontrado", exception.getMessage());
        verify(roleRepository, times(1)).findByIdAndIsDelete(role.getId());
        verify(roleRepository, times(0)).updateRole(role);
    }

    @Test
    void testGetRolesSuccess() {
        List<RoleDTO> expectedRoles = Arrays.asList(
                new RoleDTO(1L, "Admin",true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true),
                new RoleDTO(2L, "User",true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true)
        );

        when(roleRepository.getAll()).thenReturn(expectedRoles);

        List<RoleDTO> result = roleService.getRoles();

        assertEquals(expectedRoles, result);
        verify(roleRepository, times(1)).getAll();
    }

    @Test
    void testGetRolesEmpty() {
        List<RoleDTO> emptyRoles = Collections.emptyList();

        when(roleRepository.getAll()).thenReturn(emptyRoles);

        List<RoleDTO> result = roleService.getRoles();

        assertEquals(emptyRoles, result);
        verify(roleRepository, times(1)).getAll();
    }
    @Test
    void testGetRoleSuccess() throws Exception {
        Long roleId = 1L;
        RoleDTO expectedRole = new RoleDTO(1L, "Admin",true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true);

        when(roleRepository.findByIdAndIsDelete(roleId)).thenReturn(Optional.of(expectedRole));

        RoleDTO result = roleService.getRole(roleId);

        assertEquals(expectedRole, result);
        verify(roleRepository, times(1)).findByIdAndIsDelete(roleId);
    }

    @Test
    void testGetRoleNotFound() {
        Long roleId = 1L;

        when(roleRepository.findByIdAndIsDelete(roleId)).thenReturn(Optional.empty());

        ExceptionNullValue exception = assertThrows(ExceptionNullValue.class, () -> {
            roleService.getRole(roleId);
        });

        assertEquals("Rol no encontrado", exception.getMessage());
        verify(roleRepository, times(1)).findByIdAndIsDelete(roleId);
    }

    @Test
    void testGetRoleByNameSuccess() throws Exception {
        String roleName = "Admin";
        RoleDTO expectedRole = new RoleDTO(1L, "Admin",true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true);


        when(roleRepository.findByNameAndIsDelete(roleName)).thenReturn(Optional.of(expectedRole));

        RoleDTO result = roleService.getRoleByName(roleName);

        assertEquals(expectedRole, result);
        verify(roleRepository, times(1)).findByNameAndIsDelete(roleName);
    }
    @Test
    void testGetRoleByNameNotFound() {
        String roleName = "Admin";

        when(roleRepository.findByNameAndIsDelete(roleName)).thenReturn(Optional.empty());

        ExceptionNullValue exception = assertThrows(ExceptionNullValue.class, () -> {
            roleService.getRoleByName(roleName);
        });

        assertEquals("Rol no encontrado", exception.getMessage());
        verify(roleRepository, times(1)).findByNameAndIsDelete(roleName);
    }



    @Test
    void testCreateRole() {
        Long id = 0L;
        String name = "Admin";
        Boolean categoryList = true;
        Boolean categoryCreate = true;
        Boolean categoryUpdate = true;
        Boolean categoryDelete = true;
        Boolean productList = true;
        Boolean productCreate = true;
        Boolean productUpdate = true;
        Boolean productDelete = true;
        Boolean userList = true;
        Boolean userCreate = true;
        Boolean userUpdate = true;
        Boolean userDelete = true;
        Boolean roleList = true;
        Boolean roleCreate = true;
        Boolean roleUpdate = true;
        Boolean roleDelete = true;
        Boolean rentList = true;
        Boolean rentCreate = true;
        Boolean rentUpdate = true;
        Boolean rentDelete = true;
        Boolean isDelete = false;

        Role role = Role.create(name, categoryList, categoryCreate, categoryUpdate, categoryDelete,
                productList, productCreate, productUpdate, productDelete,
                userList, userCreate, userUpdate, userDelete,
                roleList, roleCreate, roleUpdate, roleDelete,
                rentList, rentCreate, rentUpdate, rentDelete);

        assertNotNull(role);
        assertEquals(id, role.getId());
        assertEquals(name, role.getName());
        assertEquals(categoryList, role.getCategoryList());
        assertEquals(categoryCreate, role.getCategoryCreate());
        assertEquals(categoryUpdate, role.getCategoryUpdate());
        assertEquals(categoryDelete, role.getCategoryDelete());
        assertEquals(productList, role.getProductList());
        assertEquals(productCreate, role.getProductCreate());
        assertEquals(productUpdate, role.getProductUpdate());
        assertEquals(productDelete, role.getProductDelete());
        assertEquals(userList, role.getUserList());
        assertEquals(userCreate, role.getUserCreate());
        assertEquals(userUpdate, role.getUserUpdate());
        assertEquals(userDelete, role.getUserDelete());
        assertEquals(roleList, role.getRoleList());
        assertEquals(roleCreate, role.getRoleCreate());
        assertEquals(roleUpdate, role.getRoleUpdate());
        assertEquals(roleDelete, role.getRoleDelete());
        assertEquals(rentList, role.getRentList());
        assertEquals(rentCreate, role.getRentCreate());
        assertEquals(rentUpdate, role.getRentUpdate());
        assertEquals(rentDelete, role.getRentDelete());
        assertEquals(isDelete, role.getIsDelete());
    }

    @Test
    void testUpdateRole() {
        Long id = 1L;
        String name = "Admin";
        Boolean categoryList = true;
        Boolean categoryCreate = true;
        Boolean categoryUpdate = true;
        Boolean categoryDelete = true;
        Boolean productList = true;
        Boolean productCreate = true;
        Boolean productUpdate = true;
        Boolean productDelete = true;
        Boolean userList = true;
        Boolean userCreate = true;
        Boolean userUpdate = true;
        Boolean userDelete = true;
        Boolean roleList = true;
        Boolean roleCreate = true;
        Boolean roleUpdate = true;
        Boolean roleDelete = true;
        Boolean rentList = true;
        Boolean rentCreate = true;
        Boolean rentUpdate = true;
        Boolean rentDelete = true;
        Boolean isDelete = false;

        Role role = Role.update(id, name, categoryList, categoryCreate, categoryUpdate, categoryDelete,
                productList, productCreate, productUpdate, productDelete,
                userList, userCreate, userUpdate, userDelete,
                roleList, roleCreate, roleUpdate, roleDelete,
                rentList, rentCreate, rentUpdate, rentDelete);

        assertNotNull(role);
        assertEquals(id, role.getId());
        assertEquals(name, role.getName());
        assertEquals(categoryList, role.getCategoryList());
        assertEquals(categoryCreate, role.getCategoryCreate());
        assertEquals(categoryUpdate, role.getCategoryUpdate());
        assertEquals(categoryDelete, role.getCategoryDelete());
        assertEquals(productList, role.getProductList());
        assertEquals(productCreate, role.getProductCreate());
        assertEquals(productUpdate, role.getProductUpdate());
        assertEquals(productDelete, role.getProductDelete());
        assertEquals(userList, role.getUserList());
        assertEquals(userCreate, role.getUserCreate());
        assertEquals(userUpdate, role.getUserUpdate());
        assertEquals(userDelete, role.getUserDelete());
        assertEquals(roleList, role.getRoleList());
        assertEquals(roleCreate, role.getRoleCreate());
        assertEquals(roleUpdate, role.getRoleUpdate());
        assertEquals(roleDelete, role.getRoleDelete());
        assertEquals(rentList, role.getRentList());
        assertEquals(rentCreate, role.getRentCreate());
        assertEquals(rentUpdate, role.getRentUpdate());
        assertEquals(rentDelete, role.getRentDelete());
        assertEquals(isDelete, role.getIsDelete());
    }

    @Test
    void testCreateById() {
        Long id = 1L;

        Role role = Role.createById(id);

        assertNotNull(role);
        assertEquals(id, role.getId());
        assertNull(role.getName());
        assertNull(role.getCategoryList());
        assertNull(role.getCategoryCreate());
        assertNull(role.getCategoryUpdate());
        assertNull(role.getCategoryDelete());
        assertNull(role.getProductList());
        assertNull(role.getProductCreate());
        assertNull(role.getProductUpdate());
        assertNull(role.getProductDelete());
        assertNull(role.getUserList());
        assertNull(role.getUserCreate());
        assertNull(role.getUserUpdate());
        assertNull(role.getUserDelete());
        assertNull(role.getRoleList());
        assertNull(role.getRoleCreate());
        assertNull(role.getRoleUpdate());
        assertNull(role.getRoleDelete());
        assertNull(role.getRentList());
        assertNull(role.getRentCreate());
        assertNull(role.getRentUpdate());
        assertNull(role.getRentDelete());
    }
}
