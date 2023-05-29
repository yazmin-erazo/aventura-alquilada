package com.digitalbooking.digitalbooking.application.user.handler;

import com.digitalbooking.digitalbooking.application.user.request.CommandCreateUser;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.entity.User;
import com.digitalbooking.digitalbooking.domain.user.service.ServiceUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserHandler {
    @Autowired
    ServiceUser serviceUser;

    @Autowired
    PasswordEncoder encoder;

    public Long createUser(CommandCreateUser createUser) throws Exception {
        return serviceUser.createUser(User.create(createUser.getName(),
                createUser.getLastName(),
                createUser.getEmail(),
                encoder.encode(createUser.getPassword())
        ));
    }

    public UserDTO findById(Long id) {
        return serviceUser.getUser(id);
    }

    public UserDTO findByEmail(String email) {
        return serviceUser.getUser(email);
    }

    public void validateUser(String token){
        serviceUser.validateUser(token);
    }

    public List<UserDTO> getUsers() {
        return serviceUser.getUsers();
    }
}
