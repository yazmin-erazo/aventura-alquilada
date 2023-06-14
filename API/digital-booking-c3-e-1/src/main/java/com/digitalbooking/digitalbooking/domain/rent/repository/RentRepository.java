package com.digitalbooking.digitalbooking.domain.rent.repository;


import com.digitalbooking.digitalbooking.domain.rent.dto.RentDTO;
import com.digitalbooking.digitalbooking.domain.rent.entity.Rent;

import java.util.List;
import java.util.Optional;

public interface RentRepository {

    Optional<RentDTO> findByIdAndState(Long id);

   void updateRent(Rent rent);

    void deleteRent(Long id);

    Long createRent(Rent rent);

    List<RentDTO> getAllByUserId(Long userId);
    List<RentDTO> getAll();

}
