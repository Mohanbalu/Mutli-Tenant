package com.projectmanagement.dto;

import com.projectmanagement.entity.ProjectMemberRole;
import lombok.*;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddProjectMemberRequest {
    @NotNull(message = "User ID is required")
    private Long userId;

    private ProjectMemberRole role = ProjectMemberRole.MEMBER;
}