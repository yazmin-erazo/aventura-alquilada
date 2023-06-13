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
    void testCreateRentSuccess() throws Exception {
        Product product = Product.create("Carpa", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901");
        ProductDTO productDTO = new ProductDTO();

        User user =  User.create( "Lore", "Sanchez", "test@test.com", "123");
        List<Long> favorites = new ArrayList<>();
        UserDTO userDTO = new UserDTO(1L, "Lore", "Sanchez", "lorena@l.com", "", LocalDateTime.now(), false, "token","token", "#525252", favorites);

        Rent rent = Rent.create(product.getId(), 1L, Date.from(Instant.now()), Date.from(Instant.now()));
        String userEmail = user.getEmail();

        when(repositoryProduct.findByIdAndIsDelete(anyLong())).thenReturn(Optional.of(productDTO));
        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(userDTO));
        when(rentRepository.createRent(any(Rent.class))).thenReturn(1L);

        Long rentId = rentService.createRent(rent, userEmail);

        assertNotNull(rentId);
        verify(repositoryProduct, times(1)).findByIdAndIsDelete(anyLong());
        verify(repositoryUser, times(1)).findByEmail(anyString());
        verify(rentRepository, times(1)).createRent(any(Rent.class));
    }

    @Test
    void testDeleteRentNotFound() {

        Rent rent = Rent.create(1L, 1L, Date.from(Instant.now()), Date.from(Instant.now()));

        String userEmail = "user@example.com";

        when(rentRepository.findByIdAndState(anyLong())).thenReturn(Optional.empty());

        assertThrows(ExceptionNullValue.class, () -> rentService.deleteRent(rent, userEmail));
    }

    @Test
    void testDeleteRentSuccess() {

        RentDTO rentDTO = new RentDTO();
        rentDTO.setUser(new UserDTO());
        rentDTO.getUser().setId(1L);

        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);

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

        List<RentDTO> rentDTOs = new ArrayList<>();
        RentDTO rentDTO1 = new RentDTO();
        RentDTO rentDTO2 = new RentDTO();
        rentDTOs.add(rentDTO1);
        rentDTOs.add(rentDTO2);

        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(userDTO));
        when(rentRepository.getAll(anyLong())).thenReturn(rentDTOs);

        List<RentDTO> result = rentService.getRents("user@example.com");

        assertEquals(2, result.size());

        verify(repositoryUser, times(1)).findByEmail(anyString());
        verify(rentRepository, times(1)).getAll(anyLong());
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

        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(userDTO));

        Method method = RentService.class.getDeclaredMethod("validateRentOwnership", Long.class, String.class);
        method.setAccessible(true);

        method.invoke(rentService, 1L, "user@example.com");

        verify(repositoryUser, times(1)).findByEmail(anyString());
    }

    @Test
    void testValidateRentOwnershipFailed() throws Exception {

        UserDTO userDTO = new UserDTO();
        userDTO.setId(2L);

        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(userDTO));

        Method method = RentService.class.getDeclaredMethod("validateRentOwnership", Long.class, String.class);
        method.setAccessible(true);

        try {
            method.invoke(rentService, 1L, "user@example.com");
            fail("Expected an InvocationTargetException to be thrown");
        } catch (InvocationTargetException e) {
            assertTrue(e.getCause() instanceof ExceptionInvalidValue);

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
}
