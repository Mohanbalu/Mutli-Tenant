package com.projectmanagement.dto;

import lombok.*;
import com.projectmanagement.entity.UserRole;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateUserRequest {
    private String firstName;
    private String lastName;
    private UserRole role;
    private Boolean isActive;
}