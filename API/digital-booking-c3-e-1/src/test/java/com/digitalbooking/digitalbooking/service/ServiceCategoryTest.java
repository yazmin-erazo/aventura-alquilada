package com.digitalbooking.digitalbooking.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionMandatoryValue;
import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.entity.Category;
import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import com.digitalbooking.digitalbooking.domain.category.service.ServiceCategory;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ServiceCategoryTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private ServiceCategory serviceCategory;

    @Test
    void testCreateCategorySuccess() throws Exception {
        Category category = Category.create("Camping", "Imagen test", "Descripción test", "Archivo test", "Icono");
        when(categoryRepository.saveImage(anyString(), anyString())).thenReturn("Test URL");
        when(categoryRepository.save(any(Category.class), anyString())).thenReturn(1L);

        Long categoryId = serviceCategory.createCategory(category);

        assertEquals(1L, categoryId);
        verify(categoryRepository, times(1)).saveImage(anyString(), anyString());
        verify(categoryRepository, times(1)).save(any(Category.class), anyString());
    }

    @Test
    void testCreateCategoryErrorWhenNameIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Category.create("", "Imagen test", "Descripción test", "Archivo test","Icono" ));
        assertEquals("El nombre es requerido para crear una categoría", exception.getMessage());
    }

    @Test
    void testCreateCategoryErrorWhenImageIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Category.create("Camping", "", "Descripción test", "Archivo test", "Icono" ));
        assertEquals("La imagen es requerida para crear una categoría", exception.getMessage());
    }

    @Test
    void testCreateCategoryErrorWhenDescriptionIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Category.create("Camping", "Imagen test", "", "Archivo test", "Icono" ));
        assertEquals("La descripción es requerida para crear una categoría", exception.getMessage());
    }

    @Test
    void testCreateCategoryErrorWhenFileNameIsNull() throws Exception {
        Exception exception = assertThrows(ExceptionMandatoryValue.class, () -> Category.create("Camping", "Imagen test", "Descripción test", "", "Icono" ));
        assertEquals("El nombre del archivo es requerido para crear una categoría", exception.getMessage());
    }

    @Test
    void testGetCategoriesSuccess() {
        CategoryDTO category1 = new CategoryDTO(1L, "Camping", "Imagen test", "Descripción test","Icono");
        CategoryDTO category2 = new CategoryDTO(2L, "Pesca", "Imagen test", "Descripción test", "Icono");
        List<CategoryDTO> expectedCategories = List.of(category1, category2);
        when(categoryRepository.getAll()).thenReturn(expectedCategories);

        List<CategoryDTO> actualCategories = serviceCategory.getCategories();

        assertEquals(expectedCategories, actualCategories);
        verify(categoryRepository, times(1)).getAll();
    }

    @Test
    void testGetCategorySuccess() {
        Long categoryId = 1L;
        CategoryDTO expectedCategory = new CategoryDTO(1L, "Camping", "Imagen test", "Descripción test", "Icono");
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(expectedCategory));

        Optional<CategoryDTO> actualCategory = serviceCategory.getCategory(categoryId);

        assertEquals(Optional.of(expectedCategory), actualCategory);
        verify(categoryRepository, times(1)).findById(categoryId);
    }

    @Test
    void testGetCategoryNotFound() {
        Long categoryId = 1L;
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());

        Optional<CategoryDTO> actualCategory = serviceCategory.getCategory(categoryId);

        assertEquals(Optional.empty(), actualCategory);
        verify(categoryRepository, times(1)).findById(categoryId);
    }

    @Test
    void testCreateWithId() {
        Long id = 1L;

        Category category = Category.create(id);

        assertNotNull(category);
        assertEquals(id, category.getId());
        assertEquals(category.getName(),"");
        assertEquals(category.getDescription(),"");
        assertEquals(category.getImage(),"");
        assertEquals(category.getFileName(),"");
    }

    @Test
    void testCreateWithValues() {
        String name = "Camping";
        String description = "Descripción de prueba";
        String image = "Imagen de prueba";
        String fileName = "Archivo de prueba";
        String icon = "Icono";

        Category category = Category.create(name, image, description, fileName, icon);

        assertNotNull(category);
        assertNull(category.getId());
        assertEquals(name, category.getName());
        assertEquals(description, category.getDescription());
        assertEquals(image, category.getImage());
        assertEquals(fileName, category.getFileName());
    }

    @Test
    void testReBuild() {
        Long id = 1L;
        String name = "Camping";
        String description = "Descripción de prueba";
        String image = "Imagen de prueba";
        String icon = "Icono";

        Category category = Category.reBuild(id, name, image, description, icon);

        assertNotNull(category);
        assertEquals(id, category.getId());
        assertEquals(name, category.getName());
        assertEquals(image, category.getImage());
        assertEquals(description, category.getDescription());
        assertEquals(category.getFileName(),"");
    }

    @Test
    void testCreateById() {
        Long id = 1L;

        Category category = Category.createById(id);

        assertNotNull(category);
        assertEquals(id, category.getId());
        assertNull(category.getName());
        assertNull(category.getDescription());
        assertNull(category.getImage());
        assertNull(category.getFileName());
    }
}
