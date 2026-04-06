-- =====================================================
-- SAMPLE DATA FOR TESTING
-- Database: project_management
-- =====================================================

-- Insert Sample Organization
INSERT INTO organizations (name, slug, is_active) 
VALUES ('Acme Corp', 'acme-corp', true)
RETURNING id;

-- Assume Organization ID = 1

-- Insert Sample Users
INSERT INTO users (organization_id, email, password_hash, first_name, last_name, role, is_active)
VALUES 
(1, 'john@acme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye/U.N4.5QVZVJ3K5p5h5z5p5h5z5p5h5', 'John', 'Smith', 'OWNER', true),
(1, 'sarah@acme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye/U.N4.5QVZVJ3K5p5h5z5p5h5z5p5h5', 'Sarah', 'Johnson', 'MANAGER', true),
(1, 'mike@acme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye/U.N4.5QVZVJ3K5p5h5z5p5h5z5p5h5', 'Mike', 'Davis', 'EMPLOYEE', true),
(1, 'emma@acme.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye/U.N4.5QVZVJ3K5p5h5z5p5h5z5p5h5', 'Emma', 'Wilson', 'EMPLOYEE', true)
RETURNING id;

-- Insert Sample Projects
INSERT INTO projects (organization_id, name, description, status, start_date, end_date, owner_id)
VALUES 
(1, 'Website Redesign', 'Complete redesign of company website', 'ACTIVE', '2026-01-01', '2026-03-31', 1),
(1, 'Mobile App Development', 'Build new mobile application', 'ACTIVE', '2026-02-01', '2026-06-30', 1),
(1, 'Internal Tools', 'Develop internal productivity tools', 'ACTIVE', '2026-01-15', '2026-04-15', 2)
RETURNING id;

-- Insert Project Members
INSERT INTO project_members (project_id, user_id, role)
VALUES 
(1, 1, 'LEADER'),
(1, 2, 'MEMBER'),
(1, 3, 'MEMBER'),
(2, 1, 'LEADER'),
(2, 2, 'LEADER'),
(2, 4, 'MEMBER'),
(3, 2, 'LEADER'),
(3, 3, 'MEMBER');

-- Insert Sample Tasks
INSERT INTO tasks (project_id, title, description, status, priority, assigned_to, created_by, due_date)
VALUES 
(1, 'Design homepage mockup', 'Create initial homepage design', 'DONE', 'HIGH', 2, 1, '2026-01-15'),
(1, 'Implement responsive layout', 'Make website responsive', 'IN_PROGRESS', 'HIGH', 3, 1, '2026-02-01'),
(1, 'Add contact form', 'Implement contact form functionality', 'TODO', 'MEDIUM', 3, 1, '2026-02-15'),
(1, 'Setup SEO', 'Configure basic SEO settings', 'TODO', 'LOW', 2, 1, '2026-02-28'),
(2, 'Design app wireframes', 'Create app navigation and wireframes', 'DONE', 'HIGH', 2, 1, '2026-02-10'),
(2, 'Setup project structure', 'Initialize React Native project', 'IN_PROGRESS', 'HIGH', 4, 1, '2026-02-15'),
(2, 'Implement authentication', 'User login and registration', 'TODO', 'URGENT', 4, 1, '2026-03-01'),
(2, 'Create dashboard screen', 'Main dashboard UI', 'TODO', 'MEDIUM', NULL, 1, '2026-03-15'),
(3, 'Setup development environment', 'Configure dev tools and CI/CD', 'DONE', 'HIGH', 2, 2, '2026-01-20'),
(3, 'Build time tracking module', 'Employee time tracking feature', 'IN_PROGRESS', 'MEDIUM', 3, 2, '2026-02-15'),
(3, 'Create reporting dashboard', 'Generate reports and analytics', 'TODO', 'LOW', NULL, 2, '2026-03-30');

-- Insert Sample Comments
INSERT INTO comments (task_id, user_id, content)
VALUES 
(1, 1, 'Great progress on the design!'),
(1, 2, 'Thanks! Ready for review.'),
(2, 1, 'Please ensure mobile-first approach'),
(2, 3, 'Will do!'),
(5, 1, 'Wireframes approved. Moving to next phase.'),
(9, 2, 'CI/CD pipeline is ready for testing.');

-- Insert Sample Notifications
INSERT INTO notifications (user_id, title, message, type, is_read)
VALUES 
(2, 'Task Assigned', 'You have been assigned to: Design homepage mockup', 'TASK_ASSIGNED', false),
(2, 'Task Updated', 'Task "Design app wireframes" status changed to DONE', 'TASK_UPDATED', true),
(3, 'Task Assigned', 'You have been assigned to: Implement responsive layout', 'TASK_ASSIGNED', false),
(4, 'New Comment', 'Sarah commented on: Design app wireframes', 'COMMENT', false),
(2, 'Task Assigned', 'You have been assigned to: Setup project structure', 'TASK_ASSIGNED', true);

-- =====================================================
-- QUERY EXAMPLES
-- =====================================================

-- Get all projects for organization
SELECT * FROM projects WHERE organization_id = 1;

-- Get all tasks for a project
SELECT * FROM tasks WHERE project_id = 1;

-- Get tasks by status
SELECT status, COUNT(*) FROM tasks WHERE project_id = 1 GROUP BY status;

-- Get user tasks
SELECT t.*, p.name as project_name 
FROM tasks t 
JOIN projects p ON t.project_id = p.id 
WHERE t.assigned_to = 3;

-- Get notification count for user
SELECT COUNT(*) FROM notifications WHERE user_id = 2 AND is_read = false;

-- Verify data
SELECT 'Organizations' as table_name, COUNT(*) as count FROM organizations
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Projects', COUNT(*) FROM projects
UNION ALL
SELECT 'Tasks', COUNT(*) FROM tasks
UNION ALL
SELECT 'Comments', COUNT(*) FROM comments
UNION ALL
SELECT 'Notifications', COUNT(*) FROM notifications;