package com.projectmanagement.repository;

import com.projectmanagement.entity.Task;
import com.projectmanagement.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long projectId);
    List<Task> findByProjectIdAndStatus(Long projectId, TaskStatus status);
    List<Task> findByAssignedToId(Long userId);
    List<Task> findByCreatedById(Long userId);
    
    @Query("SELECT t FROM Task t WHERE t.project.organization.id = :organizationId")
    List<Task> findByOrganizationId(Long organizationId);
    
    @Query("SELECT t FROM Task t WHERE t.assignedTo.id = :userId AND t.project.organization.id = :organizationId")
    List<Task> findByUserIdAndOrganizationId(Long userId, Long organizationId);
}