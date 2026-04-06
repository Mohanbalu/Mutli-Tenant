package com.projectmanagement.repository;

import com.projectmanagement.entity.Project;
import com.projectmanagement.entity.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByOrganizationId(Long organizationId);
    List<Project> findByOrganizationIdAndStatus(Long organizationId, ProjectStatus status);
    List<Project> findByOwnerId(Long ownerId);
    List<Project> findByOrganizationIdAndOwnerId(Long organizationId, Long ownerId);
}