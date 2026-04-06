import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { notificationsAPI, projectsAPI, tasksAPI } from '../services/api'

export default function Dashboard() {
  const { user, logout, userId } = useAuth()
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [stats, setStats] = useState({ 
    totalProjects: 0, 
    totalTasks: 0, 
    completedTasks: 0, 
    inProgressTasks: 0,
    todoTasks: 0,
    highPriorityTasks: 0
  })
  const navigate = useNavigate()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [projectsRes, tasksRes, notificationsRes, unreadRes] = await Promise.all([
        projectsAPI.getAll(),
        tasksAPI.getAll(),
        notificationsAPI.getAll(),
        notificationsAPI.getUnreadCount()
      ])
      setProjects(projectsRes.data)
      setTasks(tasksRes.data)
      setNotifications(notificationsRes.data)
      setUnreadCount(unreadRes.data)

      const tasksData = tasksRes.data
      setStats({
        totalProjects: projectsRes.data.length,
        totalTasks: tasksData.length,
        completedTasks: tasksData.filter(t => t.status === 'DONE').length,
        inProgressTasks: tasksData.filter(t => t.status === 'IN_PROGRESS').length,
        todoTasks: tasksData.filter(t => t.status === 'TODO').length,
        highPriorityTasks: tasksData.filter(t => t.priority === 'HIGH' || t.priority === 'URGENT').length
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleMarkAllRead = async () => {
    try {
      await notificationsAPI.markAllAsRead()
      loadData()
    } catch (err) {
      console.error(err)
    }
  }

  const progress = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0
  const projectProgress = stats.totalProjects > 0 
    ? Math.round((projects.filter(p => p.status === 'COMPLETED').length / stats.totalProjects) * 100) 
    : 0

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="dashboard-layout-v2">
      <aside className="sidebar-v2">
        <div className="sidebar-logo">
          <div className="logo-mark">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="logo-text">PMS</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className="nav-item active">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
            </svg>
            <span>Dashboard</span>
          </Link>
          <Link to="/projects" className="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span>Projects</span>
          </Link>
          <Link to="/tasks" className="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>Tasks</span>
          </Link>
        </nav>

        <div className="sidebar-footer-v2">
          <div className="user-info">
            <div className="user-avatar">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.firstName} {user?.lastName}</span>
              <span className="user-role">{user?.role?.toLowerCase()}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content-v2">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Dashboard</h1>
            <p className="greeting">{getGreeting()}, {user?.firstName}</p>
          </div>
          <div className="header-right">
            <button className="icon-btn notification-btn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </button>
            <Link to="/projects" className="btn-primary-v2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </Link>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="stats-row">
            <div className="stat-card-v2">
              <div className="stat-content">
                <span className="stat-label">Total Projects</span>
                <span className="stat-value">{stats.totalProjects}</span>
              </div>
              <div className="stat-icon-v2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
            </div>
            <div className="stat-card-v2">
              <div className="stat-content">
                <span className="stat-label">Total Tasks</span>
                <span className="stat-value">{stats.totalTasks}</span>
              </div>
              <div className="stat-icon-v2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
            <div className="stat-card-v2">
              <div className="stat-content">
                <span className="stat-label">In Progress</span>
                <span className="stat-value">{stats.inProgressTasks}</span>
              </div>
              <div className="stat-icon-v2 warning">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="stat-card-v2">
              <div className="stat-content">
                <span className="stat-label">Completed</span>
                <span className="stat-value">{stats.completedTasks}</span>
              </div>
              <div className="stat-icon-v2 success">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="dashboard-grid-v2">
            <div className="card">
              <div className="card-header">
                <h3>Task Progress</h3>
              </div>
              <div className="card-body">
                <div className="progress-track">
                  <div className="progress-bar-v2" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="progress-stats">
                  <span className="progress-percent">{progress}%</span>
                  <span className="progress-detail">{stats.completedTasks} of {stats.totalTasks} tasks completed</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Project Status</h3>
              </div>
              <div className="card-body">
                <div className="progress-track">
                  <div className="progress-bar-v2 secondary" style={{ width: `${projectProgress}%` }}></div>
                </div>
                <div className="progress-stats">
                  <span className="progress-percent">{projectProgress}%</span>
                  <span className="progress-detail">Projects completed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-grid-v2">
            <div className="card">
              <div className="card-header">
                <h3>Task Overview</h3>
              </div>
              <div className="card-body">
                <div className="overview-grid">
                  <div className="overview-item">
                    <span className="overview-value">{stats.todoTasks}</span>
                    <span className="overview-label">To Do</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-value">{stats.inProgressTasks}</span>
                    <span className="overview-label">In Progress</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-value">{stats.completedTasks}</span>
                    <span className="overview-label">Done</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-value">{stats.highPriorityTasks}</span>
                    <span className="overview-label">High Priority</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Notifications</h3>
                {notifications.length > 0 && (
                  <button className="text-btn" onClick={handleMarkAllRead}>Mark all read</button>
                )}
              </div>
              <div className="card-body">
                <div className="notification-list-v2">
                  {notifications.slice(0, 4).map(notif => (
                    <div key={notif.id} className={`notification-item-v2 ${!notif.isRead ? 'unread' : ''}`}>
                      <div className="notification-dot"></div>
                      <div className="notification-content">
                        <span className="notification-title">{notif.title}</span>
                        <span className="notification-message">{notif.message}</span>
                      </div>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <div className="empty-state-v2">
                      <p>No new notifications</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="card full-width">
            <div className="card-header">
              <h3>Recent Projects</h3>
              <Link to="/projects" className="text-btn">View all</Link>
            </div>
            <div className="card-body">
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Status</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.slice(0, 5).map(project => (
                      <tr key={project.id}>
                        <td>
                          <Link to={`/projects/${project.id}`} className="project-link">
                            {project.name}
                          </Link>
                        </td>
                        <td>
                          <span className={`status-badge ${project.status.toLowerCase()}`}>
                            {project.status}
                          </span>
                        </td>
                        <td>
                          <div className="mini-progress">
                            <div className="mini-progress-bar" style={{ width: `${project.progress || 0}%` }}></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {projects.length === 0 && (
                      <tr>
                        <td colSpan="3">
                          <div className="empty-state-v2">
                            <p>No projects yet</p>
                            <Link to="/projects" className="text-btn">Create your first project</Link>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="card full-width">
            <div className="card-header">
              <h3>Recent Tasks</h3>
              <Link to="/tasks" className="text-btn">View all</Link>
            </div>
            <div className="card-body">
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Project</th>
                      <th>Priority</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.slice(0, 5).map(task => (
                      <tr key={task.id}>
                        <td>
                          <span className="task-title">{task.title}</span>
                        </td>
                        <td>
                          <span className="project-name">{task.projectName}</span>
                        </td>
                        <td>
                          <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                            {task.priority}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${task.status.toLowerCase()}`}>
                            {task.status.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {tasks.length === 0 && (
                      <tr>
                        <td colSpan="4">
                          <div className="empty-state-v2">
                            <p>No tasks yet</p>
                            <Link to="/tasks" className="text-btn">Create your first task</Link>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}