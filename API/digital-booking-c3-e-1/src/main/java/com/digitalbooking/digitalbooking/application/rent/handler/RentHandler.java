package com.digitalbooking.digitalbooking.application.rent.handler;

import com.digitalbooking.digitalbooking.application.rent.request.CommandCreateRent;
import com.digitalbooking.digitalbooking.application.rent.request.CommandUpdateRent;
import com.digitalbooking.digitalbooking.domain.rent.dto.RentDTO;
import com.digitalbooking.digitalbooking.domain.rent.entity.Rent;
import com.digitalbooking.digitalbooking.domain.rent.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RentHandler {

    @Autowired
    RentService rentService;

    public Long createRent(CommandCreateRent createRent, String userEmail) throws Exception {
        return rentService.createRent(Rent.create(
                createRent.getProductId(),
                createRent.getUserId(),
                createRent.getStarDate(),
                createRent.getEndDate(),
                createRent.getComment(),
                createRent.getDelivery()
        ), userEmail);
    }

    public String updateRent(CommandUpdateRent updateRent, String userEmail) throws Exception {
        return rentService.updateRent(Rent.update(updateRent.getRentId(), updateRent.getProductId(), updateRent.getUserId(), updateRent.getStarDate(), updateRent.getEndDate(), updateRent.getComment(), updateRent.getDelivery()), userEmail);
    }

    public List<RentDTO> getRents(String userEmail) {
        return rentService.getRents(userEmail);
    }

    public RentDTO findById(Long id, String userEmail) throws NoSuchFieldException, IllegalAccessException {
        return rentService.getRent(id,userEmail);
    }

    public String deleteRent(Long id, String userEmail) throws NoSuchFieldException, IllegalAccessException {
        return rentService.deleteRent(Rent.createById(id),userEmail);
    }
}
