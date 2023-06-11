package com.digitalbooking.digitalbooking.service;

import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
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

import java.math.BigDecimal;
import java.sql.Date;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
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
        Product product = Product.create("Carpa", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of());
        ProductDTO productDTO = new ProductDTO();

        User user =  User.create( "Lore", "Sanchez", "test@test.com", "123");
        UserDTO userDTO = new UserDTO(1L, "Lore", "Sanchez", "lorena@l.com", "", LocalDateTime.now(), false, "token","token", "#525252");

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
}
