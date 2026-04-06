package com.projectmanagement.controller;

import com.projectmanagement.dto.*;
import com.projectmanagement.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ResponseEntity<ProjectResponse> createProject(
            @Valid @RequestBody CreateProjectRequest request,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(projectService.createProject(request, userId, organizationId));
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getProjects(
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(projectService.getProjectsByOrganization(organizationId));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> getProject(
            @PathVariable Long projectId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(projectService.getProjectById(projectId, organizationId));
    }

    @PutMapping("/{projectId}")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ResponseEntity<ProjectResponse> updateProject(
            @PathVariable Long projectId,
            @RequestBody UpdateProjectRequest request,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(projectService.updateProject(projectId, request, organizationId));
    }

    @DeleteMapping("/{projectId}")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long projectId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        projectService.deleteProject(projectId, organizationId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{projectId}/members")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ResponseEntity<ProjectMemberResponse> addMember(
            @PathVariable Long projectId,
            @Valid @RequestBody AddProjectMemberRequest request,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(projectService.addMember(projectId, request, organizationId));
    }

    @GetMapping("/{projectId}/members")
    public ResponseEntity<List<ProjectMemberResponse>> getMembers(
            @PathVariable Long projectId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(projectService.getProjectMembers(projectId, organizationId));
    }

    @DeleteMapping("/{projectId}/members/{userId}")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ResponseEntity<Void> removeMember(
            @PathVariable Long projectId,
            @PathVariable Long userId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        projectService.removeMember(projectId, userId, organizationId);
        return ResponseEntity.noContent().build();
    }
}