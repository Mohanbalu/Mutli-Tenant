package com.projectmanagement.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectMemberResponse {
    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private String role;
}