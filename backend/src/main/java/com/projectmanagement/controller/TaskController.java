package com.projectmanagement.controller;

import com.projectmanagement.dto.*;
import com.projectmanagement.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @Valid @RequestBody CreateTaskRequest request,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(taskService.createTask(request, userId, organizationId));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<TaskResponse>> getTasksByProject(
            @PathVariable Long projectId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(taskService.getTasksByProject(projectId, organizationId));
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getTasks(
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(taskService.getTasksByOrganization(organizationId));
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskResponse> getTask(
            @PathVariable Long taskId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(taskService.getTaskById(taskId, organizationId));
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long taskId,
            @RequestBody UpdateTaskRequest request,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(taskService.updateTask(taskId, request, organizationId));
    }

    @DeleteMapping("/{taskId}")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long taskId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        taskService.deleteTask(taskId, organizationId);
        return ResponseEntity.noContent().build();
    }
}