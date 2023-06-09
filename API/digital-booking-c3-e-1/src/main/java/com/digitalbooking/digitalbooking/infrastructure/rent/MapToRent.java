package com.digitalbooking.digitalbooking.infrastructure.rent;

import com.digitalbooking.digitalbooking.domain.rent.dto.RentDTO;
import com.digitalbooking.digitalbooking.infrastructure.product.MapToProduct;
import com.digitalbooking.digitalbooking.infrastructure.rent.adapter.RentEntity;
import com.digitalbooking.digitalbooking.infrastructure.user.MapToUser;
import org.springframework.beans.BeanUtils;

public class MapToRent {

    public static RentDTO mapToRent(RentEntity rentEntity){
        RentDTO rentDTO = new RentDTO();
        BeanUtils.copyProperties(rentEntity,rentDTO);
        rentDTO.setProduct(MapToProduct.mapToProduct(rentEntity.getProductEntity()));
        rentDTO.setUser(MapToUser.mapToUser(rentEntity.getUserEntity()));
        return rentDTO;
    }

}
