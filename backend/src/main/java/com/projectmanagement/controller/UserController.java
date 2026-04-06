package com.projectmanagement.controller;

import com.projectmanagement.dto.*;
import com.projectmanagement.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ResponseEntity<UserResponse> createUser(
            @Valid @RequestBody CreateUserRequest request,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(userService.createUser(request, organizationId));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ResponseEntity<List<UserResponse>> getUsers(
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(userService.getUsersByOrganization(organizationId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUser(
            @PathVariable Long userId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(userService.getUserById(userId, organizationId));
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasAnyRole('OWNER', 'MANAGER')")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long userId,
            @RequestBody UpdateUserRequest request,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(userService.updateUser(userId, request, organizationId));
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Long userId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        userService.deleteUser(userId, organizationId);
        return ResponseEntity.noContent().build();
    }
}