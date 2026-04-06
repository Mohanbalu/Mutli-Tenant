package com.projectmanagement.controller;

import com.projectmanagement.dto.*;
import com.projectmanagement.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/task/{taskId}")
    public ResponseEntity<CommentResponse> createComment(
            @PathVariable Long taskId,
            @Valid @RequestBody CreateCommentRequest request,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(commentService.createComment(request, taskId, userId, organizationId));
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<CommentResponse>> getComments(
            @PathVariable Long taskId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        return ResponseEntity.ok(commentService.getCommentsByTask(taskId, organizationId));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-Organization-Id") Long organizationId) {
        commentService.deleteComment(commentId, userId, organizationId);
        return ResponseEntity.noContent().build();
    }
}