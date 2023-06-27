package com.digitalbooking.digitalbooking.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.domain.city.dto.CityDTO;
import com.digitalbooking.digitalbooking.domain.city.entity.City;
import com.digitalbooking.digitalbooking.domain.city.repository.RepositoryCity;
import com.digitalbooking.digitalbooking.domain.city.service.ServiceCity;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.rent.entity.Rent;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ServiceCityTest {

    @Mock
    private RepositoryCity repositoryCity;

    @InjectMocks
    private ServiceCity serviceCity;

    @Test
    void testCreateCitySuccess() throws Exception {
        City city = City.create("Amsterdam", "AMS", "NLD", BigDecimal.valueOf(52.3675730000), BigDecimal.valueOf(4.9041390000), "Capital de Países Bajos");
        when(repositoryCity.findByName(anyString())).thenReturn(Optional.empty());
        when(repositoryCity.findByCodeAndCountryCode(anyString(), anyString())).thenReturn(Optional.empty());
        when(repositoryCity.save(any(City.class))).thenReturn(1L);

        Long cityId = serviceCity.createCity(city);

        assertEquals(1L, cityId);
    }

    @Test
    void testCreateCityErrorWhenNameExists() throws Exception {
        City city = City.create("Amsterdam", "AMS", "NLD", BigDecimal.valueOf(52.3675730000), BigDecimal.valueOf(4.9041390000), "Capital de Países Bajos");
        CityDTO existingCity = new CityDTO(1L, "Amsterdam", "AMS", "NLD", BigDecimal.valueOf(52.3675730000), BigDecimal.valueOf(4.9041390000), "Capital de Países Bajos");
        when(repositoryCity.findByName(anyString())).thenReturn(Optional.of(existingCity));

        Exception exception = assertThrows(ExceptionInvalidValue.class, () -> serviceCity.createCity(city));
        assertEquals("El nombre de la ciudad: Amsterdam, ya existe", exception.getMessage());
    }

    @Test
    void testCreateCityErrorWhenCodeAndCountryCodeExist() throws Exception {
        City city = City.create("Amsterdam", "AMS", "NLD", BigDecimal.valueOf(52.3675730000), BigDecimal.valueOf(4.9041390000), "Capital de Países Bajos");
        CityDTO existingCity = new CityDTO(1L, "Amsterdam", "AMS", "NLD", BigDecimal.valueOf(52.3675730000), BigDecimal.valueOf(4.9041390000), "Capital de Países Bajos");
        when(repositoryCity.findByName(anyString())).thenReturn(Optional.empty());
        when(repositoryCity.findByCodeAndCountryCode(anyString(), anyString())).thenReturn(Optional.of(existingCity));

        Exception exception = assertThrows(ExceptionInvalidValue.class, () -> serviceCity.createCity(city));
        assertEquals("Ya existe una ciudad asociada al país y al código de ciudad indicado", exception.getMessage());
    }

    @Test
    void testUpdateCitySuccess() throws Exception {
        City city = City.create("Amsterdam", "AMS", "NLD", BigDecimal.valueOf(52.3675730000), BigDecimal.valueOf(4.9041390000), "Capital de Países Bajos");
        when(repositoryCity.findByName(city.getName())).thenReturn(Optional.empty());
        when(repositoryCity.findByCodeAndCountryCode(city.getCode(), city.getCountryCode())).thenReturn(Optional.empty());

        String message = serviceCity.updateCity(city);

        assertEquals("Ciudad actualizada correctamente", message);
    }

    @Test
    void testGetCitiesSuccess() {
        CityDTO city1 = new CityDTO(1L, "Amsterdam", "AMS", "NLD", BigDecimal.valueOf(52.3675730000), BigDecimal.valueOf(4.9041390000), "Capital de Países Bajos");
        CityDTO city2 = new CityDTO(2L, "Rotterdam", "RTD", "NLD", BigDecimal.valueOf(51.9225), BigDecimal.valueOf(4.47917), "Ciudad importante de Países Bajos");
        List<CityDTO> expectedCities = List.of(city1, city2);
        when(repositoryCity.getAll()).thenReturn(expectedCities);

        List<CityDTO> actualCities = serviceCity.getCities();

        assertEquals(expectedCities, actualCities);
    }

    @Test
    void testGetCityByNameSuccess() {
        String cityName = "Amsterdam";
        CityDTO expectedCity = new CityDTO(1L, cityName, "AMS", "NLD", BigDecimal.valueOf(52.3675730000), BigDecimal.valueOf(4.9041390000), "Capital de Países Bajos");
        when(repositoryCity.findByName(cityName)).thenReturn(Optional.of(expectedCity));

        Optional<CityDTO> actualCity = serviceCity.getCity(cityName);

        assertEquals(Optional.of(expectedCity), actualCity);
    }

    @Test
    void testGetCityByCodeAndCountryCodeSuccess() {
        String cityCode = "AMS";
        String countryCode = "NLD";
        CityDTO expectedCity = new CityDTO(1L, "Amsterdam", cityCode, countryCode, BigDecimal.valueOf(52.3675730000), BigDecimal.valueOf(4.9041390000), "Capital de Países Bajos");
        when(repositoryCity.findByCodeAndCountryCode(cityCode, countryCode)).thenReturn(Optional.of(expectedCity));

        Optional<CityDTO> actualCity = serviceCity.getCity(cityCode, countryCode);

        assertEquals(Optional.of(expectedCity), actualCity);
    }

    @Test
    void testDeleteCitySuccess() throws Exception {
        City city = City.create("Amsterdam", "AMS", "NLD", BigDecimal.valueOf(52.3675730000), BigDecimal.valueOf(4.9041390000), "Capital de Países Bajos");
        String message = serviceCity.deleteCity(city);

        assertEquals("Ciudad eliminada correctamente", message);
        verify(repositoryCity, times(1)).deleteCity(city.getId());
    }
}
