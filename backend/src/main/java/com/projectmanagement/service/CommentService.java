package com.projectmanagement.service;

import com.projectmanagement.dto.*;
import com.projectmanagement.entity.*;
import com.projectmanagement.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;

    @Transactional
    public CommentResponse createComment(CreateCommentRequest request, Long taskId, Long userId, Long organizationId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getProject().getOrganization().getId().equals(organizationId)) {
            throw new RuntimeException("Task not found in this organization");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = Comment.builder()
                .task(task)
                .user(user)
                .content(request.getContent())
                .build();

        comment = commentRepository.save(comment);

        if (task.getAssignedTo() != null && !task.getAssignedTo().getId().equals(userId)) {
            Notification notification = Notification.builder()
                    .user(task.getAssignedTo())
                    .title("New Comment")
                    .message(user.getFirstName() + " commented on task: " + task.getTitle())
                    .type(NotificationType.COMMENT)
                    .isRead(false)
                    .build();
            notificationRepository.save(notification);
        }

        return mapToResponse(comment);
    }

    public List<CommentResponse> getCommentsByTask(Long taskId, Long organizationId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getProject().getOrganization().getId().equals(organizationId)) {
            throw new RuntimeException("Task not found in this organization");
        }

        return commentRepository.findByTaskId(taskId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteComment(Long commentId, Long userId, Long organizationId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getTask().getProject().getOrganization().getId().equals(organizationId)) {
            throw new RuntimeException("Comment not found in this organization");
        }

        if (!comment.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only delete your own comments");
        }

        commentRepository.delete(comment);
    }

    private CommentResponse mapToResponse(Comment comment) {
        return CommentResponse.builder()
                .id(comment.getId())
                .taskId(comment.getTask().getId())
                .userId(comment.getUser().getId())
                .userName(comment.getUser().getFirstName() + " " + comment.getUser().getLastName())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}