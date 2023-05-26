package com.digitalbooking.digitalbooking.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import com.digitalbooking.digitalbooking.domain.product.service.ServiceProduct;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ServiceProductTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private RepositoryProduct repositoryProduct;

    @InjectMocks
    private ServiceProduct serviceProduct;

    @Test
    void testCreateProductSuccess() throws Exception {
        Product product = Product.create("Carpa Nemo", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of());
        CategoryDTO category = new CategoryDTO(1L, "Camping", "", "");
        when(categoryRepository.findById(anyLong())).thenReturn(Optional.of(category));
        when(repositoryProduct.findByName(anyString())).thenReturn(Optional.empty());
        when(repositoryProduct.saveImage(anyString(), anyString())).thenReturn("Test URL");
        when(repositoryProduct.save(any(Product.class), anyString(), any())).thenReturn(1L);

        Long productId = serviceProduct.createProduct(product);

        assertEquals(1L, productId);
        verify(categoryRepository, times(1)).findById(anyLong());
        verify(repositoryProduct, times(1)).findByName(anyString());
        verify(repositoryProduct, times(1)).saveImage(anyString(), anyString());
        verify(repositoryProduct, times(1)).save(any(Product.class), anyString(),any());
    }

    @Test
    void testCreateProductErrorWhenCategoryDoesntExist() throws Exception {
        Product product = Product.create("Carpa Nemo", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster" ,List.of());

        when(categoryRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(ExceptionInvalidValue.class, () -> serviceProduct.createProduct(product));

        verify(categoryRepository, times(1)).findById(anyLong());
        verify(repositoryProduct, times(0)).findByName(anyString());
        verify(repositoryProduct, times(0)).saveImage(anyString(), anyString());
        verify(repositoryProduct, times(0)).save(any(Product.class), anyString(),any());
    }
}