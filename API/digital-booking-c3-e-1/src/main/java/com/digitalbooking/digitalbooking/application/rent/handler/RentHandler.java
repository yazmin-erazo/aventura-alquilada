package com.digitalbooking.digitalbooking.application.rent.handler;

import com.digitalbooking.digitalbooking.application.rent.request.CommandCreateRent;
import com.digitalbooking.digitalbooking.application.rent.request.CommandUpdateRent;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.rent.dto.RentDTO;
import com.digitalbooking.digitalbooking.domain.rent.entity.Rent;
import com.digitalbooking.digitalbooking.domain.rent.service.RentService;
import com.digitalbooking.digitalbooking.domain.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class RentHandler {

    @Autowired
    RentService rentService;

    public Long createRent(CommandCreateRent createRent, String userEmail) throws Exception {
        return rentService.createRent(Rent.create(
                createRent.getProductId(),
                createRent.getUserId(),
                createRent.getStarDate(),
                createRent.getEndDate()
        ), userEmail);
    }

    public String updateRent(CommandUpdateRent updateRent, String userEmail) throws Exception {
        return rentService.updateRent(Rent.update(updateRent.getRentId(), updateRent.getProductId(), updateRent.getUserId(), updateRent.getStarDate(), updateRent.getEndDate(), updateRent.getComment()), userEmail);
    }

    public List<RentDTO> getRents(String userEmail) {
        return rentService.getRents(userEmail);
    }

    public RentDTO findById(Long id, String userEmail) {
        return rentService.getRent(id,userEmail);
    }

    public String deleteRent(Long id, String userEmail) {
        return rentService.deleteRent(Rent.createById(id),userEmail);
    }
}
