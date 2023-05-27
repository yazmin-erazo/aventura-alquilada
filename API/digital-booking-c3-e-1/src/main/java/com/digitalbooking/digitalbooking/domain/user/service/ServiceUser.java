package com.digitalbooking.digitalbooking.domain.user.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.mail.MailRepository;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.entity.User;
import com.digitalbooking.digitalbooking.domain.user.repository.RepositoryUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ServiceUser {
    @Autowired
    RepositoryUser repositoryUser;

    @Autowired
    MailRepository mailRepository;

    @Value("${email.subject}")
    private String subject;

    @Value("${email.urlvalidation}")
    private String urlValidation;

    @Value("${email.subjectlogin}")
    private String subjectLogin;

    @Value("${email.urllogin}")
    private String urlLogin;

    public Long createUser(User user) {
        repositoryUser.findByEmail(user.getEmail()).ifPresent(userDTO -> {throw new ExceptionInvalidValue("Un usuario asociado al correo electrónico "+userDTO.getEmail()+", ya existe");});
        String uniqueID = UUID.randomUUID().toString();
        var userId = repositoryUser.save(user, uniqueID);
        String token = String.format(urlValidation,uniqueID);
        mailRepository.sendEmailValidateAccount(user.getEmail(), subject, user.getName(),token);
        return userId;
    }

    public UserDTO getUser(Long id) {
        return repositoryUser.findById(id);
    }

    public UserDTO getUser(String email) {
        return repositoryUser.findByEmail(email).orElseThrow(() -> new ExceptionInvalidValue("El usuario con el correo suministrado no existe"));
    }

    public void validateUser(String token) {
        UserDTO user = repositoryUser.findByToken(token).orElseThrow(() -> new ExceptionNullValue("El token no pertenece a ningún usuario"));
        repositoryUser.activateUser(user.getId());
        mailRepository.sendEmailAccountActivate(user.getEmail(), subjectLogin, user.getName(), urlLogin);
    }
}
