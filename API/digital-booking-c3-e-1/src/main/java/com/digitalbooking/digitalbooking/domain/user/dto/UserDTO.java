package com.digitalbooking.digitalbooking.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String lastName;
    private String email;
    @JsonIgnore
    private String password;
    private LocalDateTime GeneratingDate;
    @JsonIgnore
    private Boolean isActive;
    private String role;
    @JsonIgnore
    private String token;
    private String initialsColor;
    private List<Long> favoriteProducts;
}
