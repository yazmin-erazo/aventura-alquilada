package com.digitalbooking.digitalbooking.service;

import com.digitalbooking.digitalbooking.common.config.security.JwtUtils;
import com.digitalbooking.digitalbooking.common.exception.ExceptionMandatoryValue;
import com.digitalbooking.digitalbooking.domain.auth.entity.Auth;
import com.digitalbooking.digitalbooking.domain.auth.entity.UserDetailsImpl;
import com.digitalbooking.digitalbooking.domain.auth.service.AuthService;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtils jwtUtils;

    @InjectMocks
    private AuthService authService;

    @Test
    void testLoginSuccess() {
        Auth auth = new Auth("test@example.com", "password123");
        String jwtToken = "jwt.token.example";

        Authentication authentication = new UsernamePasswordAuthenticationToken(auth.getEmail(), auth.getPassword());
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);

        when(jwtUtils.generateJwtToken(authentication))
                .thenReturn(jwtToken);

        String result = authService.login(auth);

        assertEquals(jwtToken, result);
        assertNotNull(SecurityContextHolder.getContext().getAuthentication());
    }

    @Test
    void testLoginFailure() {
        Auth auth = new Auth("test@example.com", "password123");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Invalid credentials"));

        AuthenticationException exception = assertThrows(AuthenticationException.class, () -> {
            authService.login(auth);
        });

        assertEquals("Invalid credentials", exception.getMessage());
    }

    @Test
    void testCreateAuthSuccess() {
        String email = "test@example.com";
        String password = "password123";

        Auth auth = Auth.create(email, password);

        assertNotNull(auth);
        assertEquals(email, auth.getEmail());
        assertEquals(password, auth.getPassword());
    }

    @Test
    void testCreateAuthMissingEmail() {
        String password = "password123";

        ExceptionMandatoryValue exception = assertThrows(ExceptionMandatoryValue.class, () -> {
            Auth.create(null, password);
        });

        assertEquals("El email es requerido para loguearse", exception.getMessage());
    }

    @Test
    void testCreateAuthMissingPassword() {
        String email = "test@example.com";

        ExceptionMandatoryValue exception = assertThrows(ExceptionMandatoryValue.class, () -> {
            Auth.create(email, null);
        });

        assertEquals("El password es requerido para loguearse", exception.getMessage());
    }

    @Test
    void testCreateAuthMissingEmailAndPassword() {
        ExceptionMandatoryValue exception = assertThrows(ExceptionMandatoryValue.class, () -> {
            Auth.create(null, null);
        });

        assertEquals("El email es requerido para loguearse", exception.getMessage());
    }

    @Test
    void testBuildUserDetailsImpl() {
        Long id = 1L;
        String name = "John";
        String lastName = "Doe";
        String email = "john.doe@example.com";
        String password = "password";
        String role = "ROLE_USER";
        LocalDateTime currentDate = LocalDateTime.now();

        UserDTO userDTO = new UserDTO(id, name, lastName, email, password,currentDate,true,role,"");
        UserDetailsImpl userDetails = UserDetailsImpl.build(userDTO);

        assertEquals(id, userDetails.getId());
        assertEquals(name, userDetails.getName());
        assertEquals(lastName, userDetails.getLastName());
        assertEquals(email, userDetails.getEmail());
        assertEquals(password, userDetails.getPassword());
        assertEquals(role, userDetails.getRole());

        assertNull(userDetails.getAuthorities());
        assertEquals(email, userDetails.getUsername());
        assertTrue(userDetails.isAccountNonExpired());
        assertTrue(userDetails.isAccountNonLocked());
        assertTrue(userDetails.isCredentialsNonExpired());
        assertTrue(userDetails.isEnabled());
    }

    @Test
    void testEqualsAndHashCode() {
        Long id1 = 1L;
        Long id2 = 2L;
        String name = "John";
        String lastName = "Doe";
        String email = "john.doe@example.com";
        String password = "password";
        String role = "ROLE_USER";
        LocalDateTime currentDate = LocalDateTime.now();

        UserDTO userDTO1 = new UserDTO(id1, name, lastName, email, password,currentDate,true,role,"");
        UserDTO userDTO2 = new UserDTO(id2, name, lastName, email, password,currentDate,true,role,"");

        UserDetailsImpl userDetails1 = UserDetailsImpl.build(userDTO1);
        UserDetailsImpl userDetails2 = UserDetailsImpl.build(userDTO2);
        UserDetailsImpl userDetails3 = UserDetailsImpl.build(userDTO1);

        assertEquals(userDetails1, userDetails1);
        assertEquals(userDetails1, userDetails3);
        assertTrue(userDetails1.equals(userDetails3));

        assertNotEquals(userDetails1, userDetails2);
        assertFalse(userDetails1.equals(userDetails2));
    }
}
