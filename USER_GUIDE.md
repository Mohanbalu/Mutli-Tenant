# Project Management SaaS - User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Registration](#registration)
3. [Login](#login)
4. [Dashboard Overview](#dashboard-overview)
5. [Managing Projects](#managing-projects)
6. [Managing Tasks](#managing-tasks)
7. [User Roles & Permissions](#user-roles--permissions)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- Valid email address for registration

### Accessing the Application
1. Open your web browser
2. Navigate to the application URL (typically `http://localhost:5173` for local development)
3. You'll be directed to the login page

---

## Registration

### Creating a New Account

1. **Click "Create one"** on the login page or navigate to `/register`

2. **Fill in Organization Details:**
   - **Organization Name**: Your company or team name (e.g., "Acme Corp")
   - **Work Email**: Your professional email address
   - **Password**: Create a strong password (must include):
     - 8+ characters
     - One uppercase letter (A-Z)
     - One lowercase letter (a-z)
     - One number (0-9)
     - One special character (@#$%^&+=!)
   - **Confirm Password**: Re-enter your password

3. **Enter Personal Information:**
   - **First Name**: Your given name
   - **Last Name**: Your family name

4. **Select Your Role:**
   - **Owner**: Full administrative access to all features
   - **Manager**: Can manage projects and team members
   - **Member**: Can view and complete assigned tasks

5. **Accept Terms:**
   - Check the box to agree to Terms of Service and Privacy Policy

6. **Click "Create account"**

### After Registration
- You'll be automatically logged in
- You'll see the Dashboard with your organization's overview
- You can start creating projects immediately

---

## Login

### Signing In

1. **Navigate to the login page** (`/login`)

2. **Enter your credentials:**
   - **Email**: The email you used during registration
   - **Password**: Your account password

3. **Click "Sign In"**

### If You Forget Your Password
- Currently, password reset is not available
- Contact your organization's Owner or Manager to reset your password
- Or create a new account with a different email

---

## Dashboard Overview

The Dashboard is your central hub for monitoring project progress and team activity.

### Key Components

#### 1. **Statistics Cards** (Top Row)
- **Total Projects**: Number of projects in your organization
- **Total Tasks**: Total number of tasks across all projects
- **In Progress**: Tasks currently being worked on
- **Completed**: Tasks that have been finished

#### 2. **Progress Indicators**
- **Task Progress**: Shows percentage of completed tasks
- **Project Status**: Shows percentage of completed projects

#### 3. **Task Overview**
- **To Do**: Tasks not yet started
- **In Progress**: Tasks currently being worked on
- **Done**: Completed tasks
- **High Priority**: Urgent or high-priority tasks

#### 4. **Notifications Panel**
- Recent notifications and updates
- Click "Mark all read" to clear unread notifications
- Unread notifications are highlighted in blue

#### 5. **Recent Projects Table**
- Lists your 5 most recent projects
- Shows project name, status, and progress bar
- Click project name to view details
- Click "View all" to see all projects

#### 6. **Recent Tasks Table**
- Lists your 5 most recent tasks
- Shows task name, project, priority, and status
- Click "View all" to see all tasks

### Header Actions
- **Notification Bell**: Shows unread notification count
- **New Project Button**: Quick access to create a new project

---

## Managing Projects

### Creating a New Project

1. **Click "+ New Project"** from the Dashboard header or navigate to Projects page

2. **Fill in Project Details:**
   - **Project Name**: Clear, descriptive name
   - **Description**: Brief overview of the project goals
   - **Status**: Select initial status (Active, Completed, Archived)
   - **Start Date**: When the project begins
   - **End Date**: Target completion date (optional)

3. **Click "Create Project"**

### Viewing Projects

1. **Navigate to Projects page** from the sidebar

2. **Browse Projects:**
   - Projects are displayed in a grid layout
   - Each card shows:
     - Project name
     - Status badge (Active, Completed, Archived)
     - Description (first 2 lines)
     - Last updated date

3. **Filter Projects:**
   - Use filter buttons to show All, Active, Completed, or Archived projects

### Editing a Project

1. **Click on a project card** to open project details

2. **Make your changes** to any field

3. **Click "Save Changes"** to update

### Deleting a Project

1. **Open the project** you want to delete

2. **Click "Delete Project"** button

3. **Confirm deletion** in the popup dialog

⚠️ **Warning**: Deleting a project will also delete all associated tasks

---

## Managing Tasks

### Creating a New Task

1. **Navigate to Tasks page** from the sidebar

2. **Click "+ New Task"** button

3. **Fill in Task Details:**
   - **Task Title**: Clear, actionable title
   - **Description**: Detailed explanation of what needs to be done
   - **Project**: Select which project this task belongs to
   - **Status**: Initial status (To Do, In Progress, Done)
   - **Priority**: 
     - **Low**: Not urgent, can wait
     - **Medium**: Normal priority
     - **High**: Important, should be done soon
     - **Urgent**: Critical, needs immediate attention
   - **Due Date**: When the task should be completed (optional)

4. **Click "Create Task"**

### Viewing Tasks

#### List View
- Tasks displayed in a list with full details
- Shows: title, project, priority, status, due date
- Sort by different columns by clicking headers

#### Kanban Board View
- Visual board with columns: To Do, In Progress, Done
- Drag and drop tasks between columns
- Quick view of task status distribution

### Updating Task Status

#### From List View:
1. **Click the status dropdown** on any task
2. **Select new status** from the menu

#### From Kanban Board:
1. **Drag the task card** to the desired column
2. **Release** to update status

### Filtering Tasks

Use the filter bar to show:
- **All Tasks**: Every task in your organization
- **My Tasks**: Tasks assigned to you
- **High Priority**: Only high and urgent priority tasks
- **Overdue**: Tasks past their due date

### Deleting a Task

1. **Find the task** you want to delete

2. **Click the delete button** (trash icon)

3. **Confirm deletion**

---

## User Roles & Permissions

### Owner
**Full access to all features:**
- ✅ Create, edit, and delete projects
- ✅ Create, edit, and delete tasks
- ✅ Manage organization settings
- ✅ Add/remove team members
- ✅ View all organization data
- ✅ Assign roles to other users

### Manager
**Project and team management:**
- ✅ Create and edit projects
- ✅ Create and edit tasks
- ✅ View team member activities
- ✅ Manage project assignments
- ❌ Cannot delete projects (Owner only)
- ❌ Cannot manage organization settings

### Member
**Task execution and collaboration:**
- ✅ View assigned projects
- ✅ Create and edit own tasks
- ✅ Update task status
- ✅ View team progress
- ❌ Cannot create projects
- ❌ Cannot delete tasks (except own)
- ❌ Cannot manage other users

---

## Best Practices

### Project Management

1. **Clear Naming Conventions**
   - Use descriptive project names
   - Include project type or client in name (e.g., "Website Redesign - Client X")

2. **Set Realistic Deadlines**
   - Consider team capacity
   - Build in buffer time for unexpected delays

3. **Regular Updates**
   - Update project status weekly
   - Keep descriptions current

### Task Management

1. **Actionable Task Titles**
   - Start with verbs: "Design homepage mockup" not "Homepage"
   - Be specific about what needs to be done

2. **Appropriate Priority Levels**
   - Don't mark everything as "High" or "Urgent"
   - Use priority to indicate true importance

3. **Detailed Descriptions**
   - Include acceptance criteria
   - Add relevant links or resources
   - Mention dependencies on other tasks

4. **Regular Status Updates**
   - Update task status as you work
   - Move tasks to "Done" only when fully complete

### Team Collaboration

1. **Communication**
   - Use task descriptions to provide context
   - Update statuses to keep team informed
   - Use notifications to stay aware of changes

2. **Workflow**
   - Establish team conventions for status transitions
   - Define what "Done" means for your team
   - Regular review of task boards

---

## Troubleshooting

### Common Issues

#### "Email already exists" during registration
- **Cause**: An account with that email is already registered
- **Solution**: Use a different email or try logging in

#### "Organization name already taken"
- **Cause**: Another organization has the same name
- **Solution**: Choose a more unique name (add location, industry, etc.)

#### Cannot see projects or tasks
- **Cause**: You may not have permission to view them
- **Solution**: Contact your Organization Owner or Manager

#### Tasks not updating
- **Cause**: Browser cache or connection issue
- **Solution**: Refresh the page or clear browser cache

#### Password requirements not met
- **Cause**: Password doesn't meet all criteria
- **Solution**: Ensure password includes:
  - 8+ characters
  - Uppercase letter
  - Lowercase letter
  - Number
  - Special character

### Getting Help

1. **Check this guide** for common questions
2. **Contact your Organization Owner** for account issues
3. **Review error messages** - they often indicate the solution
4. **Try a different browser** if experiencing display issues

---

## Keyboard Shortcuts

- `Ctrl + K` - Quick search (coming soon)
- `Ctrl + N` - New task (when on Tasks page)
- `Ctrl + /` - Show keyboard shortcuts

---

## Updates & New Features

This application is regularly updated with new features and improvements. Check the Dashboard for announcements about new functionality.

### Recent Updates
- ✅ Professional UI/UX redesign
- ✅ Improved task filtering
- ✅ Enhanced notification system
- ✅ Better mobile responsiveness

### Coming Soon
- 🔜 Team chat integration
- 🔜 File attachments on tasks
- 🔜 Calendar view for deadlines
- 🔜 Email notifications
- 🔜 Password reset functionality

---

## Security Tips

1. **Use a strong, unique password**
2. **Don't share your login credentials**
3. **Log out when using shared computers**
4. **Keep your email secure** (used for account recovery)
5. **Report any suspicious activity** to your Organization Owner

---

**Need more help?** Contact your organization's administrator or check for in-app help tooltips (look for the `?` icon).