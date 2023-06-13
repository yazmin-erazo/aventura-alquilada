package com.digitalbooking.digitalbooking.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.common.exception.ExceptionMandatoryValue;
import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.ImageProduct;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import com.digitalbooking.digitalbooking.domain.product.service.ServiceProduct;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.repository.RepositoryUser;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ServiceProductTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private RepositoryProduct repositoryProduct;

    @Mock
    private RepositoryUser repositoryUser;

    @InjectMocks
    private ServiceProduct serviceProduct;

    @Test
    void testCreateProductSuccess() throws Exception {
        Product product = Product.create("Carpa", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901");
        CategoryDTO category = new CategoryDTO(1L, "Camping", "", "","");
        when(categoryRepository.findById(anyLong())).thenReturn(Optional.of(category));
        when(repositoryProduct.findByNameAndIsDelete(anyString())).thenReturn(Optional.empty());
        when(repositoryProduct.saveImage(anyString(), anyString())).thenReturn("Test URL");
        when(repositoryProduct.save(any(Product.class), anyString(), any())).thenReturn(1L);

        Long productId = serviceProduct.createProduct(product);

        assertEquals(1L, productId);
        verify(categoryRepository, times(1)).findById(anyLong());
        verify(repositoryProduct, times(1)).findByNameAndIsDelete(anyString());
        verify(repositoryProduct, times(1)).saveImage(anyString(), anyString());
        verify(repositoryProduct, times(1)).save(any(Product.class), anyString(),any());
    }

    @Test
    void testCreateProductErrorWhenDuplicateName() throws Exception {
        Product product = Product.create("Carpa Nemo", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901");
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName("Carpa Nemo");
        CategoryDTO category = new CategoryDTO(1L, "Camping", "", "", "");
        when(categoryRepository.findById(anyLong())).thenReturn(Optional.of(category));
        when(repositoryProduct.findByNameAndIsDelete(anyString())).thenReturn(Optional.of(productDTO));

        assertThrows(ExceptionInvalidValue.class, () -> serviceProduct.createProduct(product));

        verify(categoryRepository, times(1)).findById(anyLong());
        verify(repositoryProduct, times(1)).findByNameAndIsDelete(anyString());
        verify(repositoryProduct, times(0)).saveImage(anyString(), anyString());
        verify(repositoryProduct, times(0)).save(any(Product.class), anyString(),any());
    }

    @Test
    void testCreateProductErrorWhenCategoryDoesntExist() throws Exception {
        Product product = Product.create("Carpa Nemo", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster" ,List.of(), "36.1430638", "-115.1617901");

        when(categoryRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(ExceptionInvalidValue.class, () -> serviceProduct.createProduct(product));

        verify(categoryRepository, times(1)).findById(anyLong());
        verify(repositoryProduct, times(0)).findByNameAndIsDelete(anyString());
        verify(repositoryProduct, times(0)).saveImage(anyString(), anyString());
        verify(repositoryProduct, times(0)).save(any(Product.class), anyString(),any());
    }

    @Test
    void testCreateProductErrorWhenNameIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Product.create("", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901"));
        assertEquals("El nombre es requerido para crear un producto", exception.getMessage());
    }

    @Test
    void testCreateProductErrorWhenBrandIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Product.create("Carpa", "", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901"));
        assertEquals("La marca es requerida para crear un producto", exception.getMessage());
    }

    @Test
    void testCreateProductErrorWhenStateIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Product.create("Carpa", "Nemo Wagontop", "", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901"));
        assertEquals("El estado es requerido para crear un producto", exception.getMessage());
    }

    @Test
    void testCreateProductErrorWhenPriceIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Product.create("Carpa", "Nemo Wagontop", "Nueva", null,"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901"));
        assertEquals("El precio es requerido para crear un producto", exception.getMessage());
    }

    @Test
    void testCreateProductErrorWhenPriceIsZero() throws Exception {
        Exception exception = assertThrows(ExceptionInvalidValue.class, () -> Product.create("Carpa", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(0),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901"));
        assertEquals("El precio debe ser mayor que cero", exception.getMessage());
    }

    @Test
    void testCreateProductErrorWhenDescriptionIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Product.create("Carpa", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(0),"", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901"));
        assertEquals("La descripción es requerida para crear un producto", exception.getMessage());
    }

    @Test
    void testCreateProductErrorWhenSizeIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Product.create("Carpa", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(0),"Descripción test", "", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901"));
        assertEquals("La talla es requerida para crear un producto", exception.getMessage());
    }

    @Test
    void testCreateProductErrorWhenImageIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Product.create("Carpa", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901"));
        assertEquals("La imagen es requerida para crear un producto", exception.getMessage());
    }

    @Test
    void testCreateProductErrorWhenFileNameIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Product.create("Carpa", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901"));
        assertEquals("El nombre del archivo es requerido para crear un producto", exception.getMessage());
    }

    @Test
    void testCreateProductErrorWhenColorIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Product.create("Carpa", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "", "Poliéster", List.of(), "36.1430638", "-115.1617901"));
        assertEquals("El color es requerido para crear un producto", exception.getMessage());
    }

    @Test
    void testCreateProductErrorWhenMaterialIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Product.create("Carpa", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "", List.of(), "36.1430638", "-115.1617901"));
        assertEquals("El material es requerido para crear un producto", exception.getMessage());
    }

    @Test
    void testUpdateProductSuccess() throws Exception {
        Product product = Product.create("Carpa Nemo", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901");
        CategoryDTO category = new CategoryDTO(1L, "Camping", "", "", "");
        when(categoryRepository.findById(anyLong())).thenReturn(Optional.of(category));

        String message = serviceProduct.updateProduct(product);

        assertEquals("Producto actualizado correctamente", message);
        verify(categoryRepository, times(1)).findById(anyLong());
        verify(repositoryProduct, times(1)).updateProduct(any(Product.class));
    }

    @Test
    void testUpdateProductErrorWhenCategoryDoesntExist() throws Exception {
        Product product = Product.create("Carpa Nemo", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster" ,List.of(), "36.1430638", "-115.1617901");

        when(categoryRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(ExceptionInvalidValue.class, () -> serviceProduct.updateProduct(product));

        verify(categoryRepository, times(1)).findById(anyLong());
        verify(repositoryProduct, times(0)).updateProduct(any(Product.class));
    }

    @Test
    void testDeleteProductSuccess() throws Exception {
        Product product = Product.create("Carpa Nemo", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901");

        String message = serviceProduct.deleteProduct(product);

        assertEquals("Producto eliminado correctamente", message);
        verify(repositoryProduct, times(1)).deleteProduct(anyLong());
    }

    @Test
    void testCreateProduct() throws Exception {
        Long id = 0L;
        String name = "Test Product";
        String brand = "Test Brand";
        String state = "Test State";
        BigDecimal price = BigDecimal.valueOf(10.99);
        String description = "Test Description";
        String size = "Test Size";
        String gender = "Test Gender";
        BigDecimal deposit = BigDecimal.valueOf(5.0);
        Long idCategory = 1L;
        String image = "Test Image";
        String fileName = "Test FileName";
        String color = "Test Color";
        String material = "Test Material";
        List<ImageProduct> imageProducts = new ArrayList<>();

        Product product = Product.create(name, brand, state, price, description, size, gender,
                deposit, idCategory, image, fileName, color, material, imageProducts, "36.1430638", "-115.1617901");

        assertNotNull(product);
        assertEquals(id, product.getId());
        assertEquals(name, product.getName());
        assertEquals(brand, product.getBrand());
        assertEquals(state, product.getState());
        assertEquals(price, product.getPrice());
        assertEquals(description, product.getDescription());
        assertEquals(size, product.getSize());
        assertEquals(gender, product.getGender());
        assertEquals(deposit, product.getDeposit());
        assertEquals(idCategory, product.getCategory().getId());
        assertEquals(image, product.getImage());
        assertEquals(fileName, product.getFileName());
        assertEquals(color, product.getColor());
        assertEquals(material, product.getMaterial());
        assertEquals(imageProducts, product.getImageProducts());
    }

    @Test
    void testUpdateProduct() throws Exception {
        Long id = 1L;
        Long idCategory = 2L;

        Product product = Product.update(id, idCategory);

        assertNotNull(product);
        assertEquals(id, product.getId());
        assertNull(product.getName());
        assertNull(product.getBrand());
        assertNull(product.getState());
        assertNull(product.getPrice());
        assertNull(product.getDescription());
        assertNull(product.getSize());
        assertNull(product.getGender());
        assertNull(product.getDeposit());
        assertEquals(idCategory, product.getCategory().getId());
        assertNull(product.getImage());
        assertNull(product.getFileName());
        assertNull(product.getColor());
        assertNull(product.getMaterial());
        assertNull(product.getImageProducts());
    }

    @Test
    void testCreateById() {
        Long id = 1L;

        Product product = Product.createById(id);

        assertNotNull(product);
        assertEquals(id, product.getId());
        assertNull(product.getName());
        assertNull(product.getBrand());
        assertNull(product.getState());
        assertNull(product.getPrice());
        assertNull(product.getDescription());
        assertNull(product.getSize());
        assertNull(product.getGender());
        assertNull(product.getDeposit());
        assertNull(product.getCategory());
        assertNull(product.getImage());
        assertNull(product.getFileName());
        assertNull(product.getColor());
        assertNull(product.getMaterial());
        assertNull(product.getImageProducts());
    }

    @Test
    void testGetProducts() {
        ProductDTO product1 = new ProductDTO();
        ProductDTO product2 = new ProductDTO();
        product1.setRents(List.of());
        product2.setRents(List.of());
        List<ProductDTO> mockedList = Arrays.asList(product1, product2);

        when(repositoryProduct.getAll(any(), any(), any(), any(), any(), any(), any(), any(), any()))
                .thenReturn(mockedList);

        List<ProductDTO> result = serviceProduct.getProducts("Nike", "Shoes", "Male", new BigDecimal(100), new BigDecimal(50), "XL", "New", "Red", "Leather");

        assertEquals(2, result.size());
        verify(repositoryProduct, times(1)).getAll(any(), any(), any(), any(), any(), any(), any(), any(), any());
    }

    @Test
    void testGetProduct() {

        ProductDTO product = new ProductDTO();
        product.setRents(List.of());

        when(repositoryProduct.findById(1L)).thenReturn(product);

        ProductDTO result = serviceProduct.getProduct(1L);

        assertNotNull(result);
        verify(repositoryProduct, times(1)).findById(1L);
    }

    @Test
    void testAddProductToFavorite() throws Exception {

        String email = "user@example.com";
        Product product = Product.create("Carpa Nemo", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901");
        ProductDTO productDTO = new ProductDTO();
        UserDTO user = new UserDTO();
        user.setEmail(email);
        user.setFavoriteProducts(new ArrayList<>());

        when(repositoryProduct.findByIdAndIsDelete(anyLong())).thenReturn(Optional.of(productDTO));
        when(repositoryUser.findByEmail(email)).thenReturn(Optional.of(user));

        String message = serviceProduct.addProductToFavorite(product, email);

        assertEquals("Producto Agregado Correctamente a favoritos", message);
        verify(repositoryUser, times(1)).findByEmail(anyString());
    }

    @Test
    void testDeleteProductFromFavorite() throws Exception {

        String email = "user@example.com";
        Product product = Product.create("Carpa Nemo", "Nemo Wagontop", "Nueva", BigDecimal.valueOf(150),"Descripción test", "8 personas", "No aplica", null, 1L, "Test Base64", "Carpa1", "Amarillo", "Poliéster", List.of(), "36.1430638", "-115.1617901");
        ProductDTO productDTO = new ProductDTO();
        UserDTO user = new UserDTO();

        when(repositoryProduct.findByIdAndIsDelete(anyLong())).thenReturn(Optional.of(productDTO));
        when(repositoryUser.findByEmail(email)).thenReturn(Optional.of(user));

        String message = serviceProduct.deleteProductTFromFavorite(product, email);

        assertEquals("Producto Eliminado Correctamente de favoritos", message);
        verify(repositoryUser, times(1)).findByEmail(anyString());
    }

    @Test
    void testCreateImageProduct() {
        String image = "base64ImageString";
        String fileName = "image.png";

        ImageProduct imageProduct = ImageProduct.create(image, fileName);

        assertEquals(image, imageProduct.getImage());
        assertEquals(fileName, imageProduct.getFileName());
    }

    @Test
    void testCreateImageProductShouldThrowExceptionWhenImageIsNull() {
        assertThrows(ExceptionMandatoryValue.class, () -> ImageProduct.create(null, "fileName"));
    }

    @Test
    void testCreateImageProductShouldThrowExceptionWhenFileNameIsNull() {
        assertThrows(ExceptionMandatoryValue.class, () -> ImageProduct.create("image", null));
    }

    @Test
    void testAddProductToFavoriteSuccess() {
        Long productId = 1L;
        Product product = Product.createById(productId);
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(productId);

        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        userDTO.setFavoriteProducts(new ArrayList<>());

        when(repositoryProduct.findByIdAndIsDelete(anyLong())).thenReturn(Optional.of(productDTO));
        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(userDTO));

        String result = serviceProduct.addProductToFavorite(product, "user@example.com");

        assertEquals("Producto Agregado Correctamente a favoritos", result);
    }

    @Test
    void testAddProductToFavoriteProductNotFound() {
        Product product = Product.createById(1L);

        when(repositoryProduct.findByIdAndIsDelete(anyLong())).thenReturn(Optional.empty());

        assertThrows(ExceptionInvalidValue.class, () -> serviceProduct.addProductToFavorite(product, "user@example.com"));
    }

    @Test
    void testAddProductToFavoriteUserNotFound() {
        Long productId = 1L;
        Product product = Product.createById(productId);
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(productId);

        when(repositoryProduct.findByIdAndIsDelete(anyLong())).thenReturn(Optional.of(productDTO));
        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.empty());

        assertThrows(ExceptionNullValue.class, () -> serviceProduct.addProductToFavorite(product, "user@example.com"));
    }

    @Test
    void testAddProductToFavoriteProductAlreadyInFavorites() {
        Long productId = 1L;
        Product product = Product.createById(productId);
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(productId);

        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L);
        userDTO.setFavoriteProducts(Arrays.asList(productId));

        when(repositoryProduct.findByIdAndIsDelete(anyLong())).thenReturn(Optional.of(productDTO));
        when(repositoryUser.findByEmail(anyString())).thenReturn(Optional.of(userDTO));

        assertThrows(ExceptionInvalidValue.class, () -> serviceProduct.addProductToFavorite(product, "user@example.com"));
    }
}