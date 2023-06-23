package com.digitalbooking.digitalbooking.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.common.exception.ExceptionMandatoryValue;
import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import com.digitalbooking.digitalbooking.domain.rent.dto.RentDTO;
import com.digitalbooking.digitalbooking.domain.rent.entity.Rent;
import com.digitalbooking.digitalbooking.domain.rent.repository.RentRepository;
import com.digitalbooking.digitalbooking.domain.rent.service.RentService;
import com.digitalbooking.digitalbooking.domain.role.dto.RoleDTO;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.entity.User;
import com.digitalbooking.digitalbooking.domain.user.repository.RepositoryUser;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.sql.Date;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class RentServiceTest {

    @Mock
    private RentRepository rentRepository;

    @Mock
    private RepositoryProduct repositoryProduct;

    @Mock
    private RepositoryUser repositoryUser;

    @InjectMocks
    private RentService rentService;

    @Test
    void testDeleteRentNotFound() {

        Rent rent = Rent.create(1L, 1L, Date.from(Instant.now()), Date.from(Instant.now()));

        String userEmail = "user@example.com";

        when(rentRepository.findByIdAndState(anyLong())).thenReturn(Optional.empty());

        assertThrows(ExceptionNullValue.class, () -> rentService.deleteRent(rent, userEmail));
    }

    @Test
    void testDeleteRentSuccess() throws NoSuchFieldException, IllegalAccessException {

        RentDTO rentDTO = new RentDTO();
        rentDTO.setUser(new UserDTO());
        rentDTO.getUser().setId(1L);

        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        RoleDTO roleDTO = new RoleDTO();
        userDTO.setRoleDTO(roleDTO);

        when(rentRepository.findByIdAndState(any())).thenReturn(Optional.of(rentDTO));
        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(userDTO));

        Long rentId = 1L;
        String result = rentService.deleteRent(new Rent(rentId), "user@example.com");

        assertEquals("Alquiler cancelado correctamente", result);

        verify(rentRepository, times(1)).findByIdAndState(anyLong());
        verify(rentRepository, times(1)).deleteRent(anyLong());
    }

    @Test
    void testDeleteRentFailedValidation() {

        RentDTO rentDTO = new RentDTO();
        rentDTO.setUser(new UserDTO());
        rentDTO.getUser().setId(2L);

        when(rentRepository.findByIdAndState(any())).thenReturn(Optional.of(rentDTO));

        Long rentId = 1L;

        assertThrows(ExceptionNullValue.class, () -> rentService.deleteRent(new Rent(rentId), "user@example.com"));
    }

    @Test
    void testUpdateRentSuccess() throws Exception {

        RentDTO rentDTO = new RentDTO();
        rentDTO.setUser(new UserDTO());
        rentDTO.getUser().setId(1L);

        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        RoleDTO roleDTO = new RoleDTO();
        userDTO.setRoleDTO(roleDTO);

        Rent rent = Rent.create(1L, 1L, Date.from(Instant.now()), Date.from(Instant.now()));

        when(rentRepository.findByIdAndState(any())).thenReturn(Optional.of(rentDTO));
        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(userDTO));

        String result = rentService.updateRent(rent, "user@example.com");

        assertEquals("Alquiler actualizado correctamente", result);

        verify(rentRepository, times(1)).findByIdAndState(anyLong());
        verify(rentRepository, times(1)).updateRent(any(Rent.class));
    }

    @Test
    void testGetRentsSuccess() {

        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setRentList(false);
        userDTO.setRoleDTO(roleDTO);

        List<RentDTO> rentDTOs = new ArrayList<>();
        RentDTO rentDTO1 = new RentDTO();
        RentDTO rentDTO2 = new RentDTO();
        rentDTOs.add(rentDTO1);
        rentDTOs.add(rentDTO2);

        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(userDTO));
        when(rentRepository.getAllByUserId(anyLong())).thenReturn(rentDTOs);

        List<RentDTO> result = rentService.getRents("user@example.com");

        assertEquals(2, result.size());

        verify(repositoryUser, times(1)).findByEmail(anyString());
        verify(rentRepository, times(1)).getAllByUserId(anyLong());
    }

    @Test
    void testGetRentNotFound() {

        when(rentRepository.findByIdAndState(anyLong())).thenReturn(Optional.empty());

        Long rentId = 1L;
        assertThrows(ExceptionNullValue.class, () -> rentService.getRent(rentId, "user@example.com"));

        verify(rentRepository, times(1)).findByIdAndState(anyLong());
    }

    @Test
    void testValidateRentOwnershipSuccess() throws Exception {

        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        RoleDTO roleDTO = new RoleDTO();
        userDTO.setRoleDTO(roleDTO);

        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(userDTO));

        Method method = RentService.class.getDeclaredMethod("validateRentOwnership", Long.class, String.class, String.class);
        method.setAccessible(true);

        method.invoke(rentService, 1L, "user@example.com","rentList");

        verify(repositoryUser, times(1)).findByEmail(anyString());
    }

    @Test
    void testValidateRentOwnershipFailed() throws Exception {

        UserDTO userDTO = new UserDTO();
        userDTO.setId(2L);

        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(userDTO));

        Method method = RentService.class.getDeclaredMethod("validateRentOwnership", Long.class, String.class, String.class);
        method.setAccessible(true);

        try {
            method.invoke(rentService, 1L, "user@example.com", "rentList");
            fail("Expected an InvocationTargetException to be thrown");
        } catch (InvocationTargetException e) {

            verify(repositoryUser, times(1)).findByEmail(anyString());
        }
    }

    @Test
    void testCreateById() {
        Long id = 1L;

        Rent rent = Rent.createById(id);

        assertEquals(id, rent.getId());
    }


    @Test
    void testUpdateSuccess() {

        Long id = 1L;
        Long productId = 1L;
        Long userId = 1L;
        java.util.Date utilStartDate = Date.from(Instant.now());
        java.sql.Date startDate = new java.sql.Date(utilStartDate.getTime());
        java.util.Date utilEndDate = Date.from(Instant.now().plusSeconds(86400));
        java.sql.Date endDate = new java.sql.Date(utilEndDate.getTime());
        String comment = "Test comment";

        Rent result = Rent.update(id, productId, userId, startDate, endDate, comment);

        assertNotNull(result);
        assertEquals(id, result.getId());
        assertEquals(productId, result.getProduct().getId());
        assertEquals(userId, result.getUser().getId());
        assertEquals("ACTUALIZADO", result.getState());
        assertEquals(comment, result.getComment());
    }

    @Test
    void testUpdateWithNullStartDate() {

        Long id = 1L;
        Long productId = 1L;
        Long userId = 1L;
        java.sql.Date startDate = null;
        java.util.Date utilEndDate = Date.from(Instant.now().plusSeconds(86400));
        java.sql.Date endDate = new java.sql.Date(utilEndDate.getTime());
        String comment = "Test comment";

        assertThrows(ExceptionMandatoryValue.class, () -> Rent.update(id, productId, userId, startDate, endDate, comment));
    }

    @Test
    void testUpdateWithNullEndDate() {

        Long id = 1L;
        Long productId = 1L;
        Long userId = 1L;
        java.util.Date utilStartDate = Date.from(Instant.now());
        java.sql.Date startDate = new java.sql.Date(utilStartDate.getTime());
        java.sql.Date endDate = null;
        String comment = "Test comment";

        assertThrows(ExceptionMandatoryValue.class, () -> Rent.update(id, productId, userId, startDate, endDate, comment));
    }

    @Test
    void testUpdateWithNullComment() {

        Long id = 1L;
        Long productId = 1L;
        Long userId = 1L;
        java.util.Date utilStartDate = Date.from(Instant.now());
        java.sql.Date startDate = new java.sql.Date(utilStartDate.getTime());
        java.util.Date utilEndDate = Date.from(Instant.now().plusSeconds(86400));
        java.sql.Date endDate = new java.sql.Date(utilEndDate.getTime());
        String comment = "";

        assertThrows(ExceptionMandatoryValue.class, () -> Rent.update(id, productId, userId, startDate, endDate, comment));
    }

    @Test
    void testGetRentSuccess() throws NoSuchFieldException, IllegalAccessException {

        Long rentId = 1L;
        String userEmail = "user@example.com";

        RentDTO rentDTO = new RentDTO();
        rentDTO.setUser(new UserDTO());
        rentDTO.getUser().setId(1L);
        RoleDTO roleDTO = new RoleDTO();
        rentDTO.getUser().setRoleDTO(roleDTO);

        when(rentRepository.findByIdAndState(rentId)).thenReturn(Optional.of(rentDTO));
        when(repositoryUser.findByEmail(userEmail)).thenReturn(Optional.of(rentDTO.getUser()));

        RentDTO result = rentService.getRent(rentId, userEmail);

        assertNotNull(result);
        assertEquals(rentDTO, result);

        verify(rentRepository, times(1)).findByIdAndState(rentId);
        verify(repositoryUser, times(1)).findByEmail(userEmail);
    }

    @Test
    void testGetRentErrorWithNotFoundRent() {
        Long rentId = 1L;
        String userEmail = "user@example.com";

        when(rentRepository.findByIdAndState(rentId)).thenReturn(Optional.empty());

        assertThrows(ExceptionNullValue.class, () -> rentService.getRent(rentId, userEmail));

        verify(rentRepository, times(1)).findByIdAndState(rentId);
        verify(repositoryUser, times(0)).findByEmail(userEmail);
    }
}
