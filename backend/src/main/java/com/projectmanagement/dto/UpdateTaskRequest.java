package com.projectmanagement.dto;

import com.projectmanagement.entity.TaskPriority;
import com.projectmanagement.entity.TaskStatus;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateTaskRequest {
    private String title;
    private String description;
    private TaskStatus status;
    private TaskPriority priority;
    private Long assignedToId;
    private LocalDate dueDate;
}