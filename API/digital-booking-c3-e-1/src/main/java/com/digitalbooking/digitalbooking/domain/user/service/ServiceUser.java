package com.digitalbooking.digitalbooking.domain.user.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.auth.entity.UserDetailsImpl;
import com.digitalbooking.digitalbooking.domain.mail.MailRepository;
import com.digitalbooking.digitalbooking.domain.role.repository.RoleRepository;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.entity.User;
import com.digitalbooking.digitalbooking.domain.user.repository.RepositoryUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ServiceUser implements UserDetailsService {
    @Autowired
    RepositoryUser repositoryUser;

    @Autowired
    MailRepository mailRepository;

    @Autowired
    RoleRepository roleRepository;

    @Value("${email.subject}")
    private String subject;

    @Value("${email.urlvalidation}")
    private String urlValidation;

    @Value("${email.subjectlogin}")
    private String subjectLogin;

    @Value("${email.urllogin}")
    private String urlLogin;

    public Long createUser(User user) {
        roleRepository.findByIdAndIsDelete(user.getRole().getId()).orElseThrow(() -> new ExceptionInvalidValue("El rol no existe") );
        repositoryUser.findByEmail(user.getEmail()).ifPresent(userDTO -> {throw new ExceptionInvalidValue("Un usuario asociado al correo electrónico "+userDTO.getEmail()+", ya existe");});
        String token = UUID.randomUUID().toString();
        LocalDateTime generatingDate = LocalDateTime.now();
        var userId = repositoryUser.save(user, token, generatingDate);
        String urlToken = String.format(urlValidation,token);
        mailRepository.sendEmailValidateAccount(user.getEmail(), subject, user.getName(),urlToken);
        return userId;
    }

    public UserDTO getUser(Long id) {
        return repositoryUser.findById(id);
    }

    public UserDTO getUser(String email) {
        return repositoryUser.findByEmail(email).orElseThrow(() -> new ExceptionInvalidValue("El usuario con el correo suministrado no existe"));
    }

    public List<UserDTO> getUsers(){
        return repositoryUser.getAll();
    }

    public void validateUser(String token) {
        UserDTO user = repositoryUser.findByToken(token).orElseThrow(() -> new ExceptionNullValue("El token no pertenece a ningún usuario"));
        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime expirationDate = user.getGeneratingDate().plusHours(48L);
        if (currentDate.isBefore(expirationDate)&&!user.getIsActive()){
            repositoryUser.activateUser(user.getId());
            mailRepository.sendEmailAccountActivate(user.getEmail(), subjectLogin, user.getName(), urlLogin);
        }else {
            if (!user.getIsActive()){
                repositoryUser.deleteUserByTokenExp(user.getId());
                throw new ExceptionInvalidValue("Se superaron las 48 horas, el token ha expirado, debes registrarte nuevamente");
            }else {
                throw new ExceptionInvalidValue("Su cuenta ya ha sido activada");
            }
        }
    }
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) {
        UserDTO user = repositoryUser.findByEmail(email).orElseThrow(() -> new ExceptionInvalidValue("El usuario con el correo suministrado no existe"));
        if (!user.getIsActive()) {
            throw new UsernameNotFoundException("El usuario con email: " + email + " no está activo");
        }
        return UserDetailsImpl.build(user);
    }

    public void sendEmail(String email) {
        UserDTO userDTO = repositoryUser.findByEmail(email).orElseThrow(() -> new ExceptionInvalidValue("El usuario con el correo suministrado no existe"));
        String urlToken = String.format(urlValidation,userDTO.getToken());
        mailRepository.sendEmailValidateAccount(userDTO.getEmail(), subject, userDTO.getName(),urlToken);
    }
}
