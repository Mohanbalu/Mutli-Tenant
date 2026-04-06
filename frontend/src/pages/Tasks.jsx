import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { projectsAPI, tasksAPI } from '../services/api'

export default function Tasks() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    projectId: '',
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        tasksAPI.getAll(),
        projectsAPI.getAll()
      ])
      setTasks(tasksRes.data)
      setProjects(projectsRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await tasksAPI.create(formData)
      setFormData({
        projectId: '',
        title: '',
        description: '',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: ''
      })
      setShowForm(false)
      loadData()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.delete(id)
        loadData()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const filteredTasks = filter === 'ALL' ? tasks : tasks.filter(t => t.status === filter)
  const canManage = user?.role === 'OWNER' || user?.role === 'MANAGER'

  const getPriorityEmoji = (priority) => {
    switch (priority) {
      case 'URGENT': return '🔴'
      case 'HIGH': return '🟠'
      case 'MEDIUM': return '🟡'
      case 'LOW': return '🟢'
      default: return ''
    }
  }

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'TODO': return '📋'
      case 'IN_PROGRESS': return '⏳'
      case 'DONE': return '✅'
      default: return ''
    }
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>
            <span className="logo-icon">📊</span>
            PMS
          </h2>
        </div>
        <nav>
          <Link to="/">
            <span className="nav-icon">🏠</span>
            Dashboard
          </Link>
          <Link to="/projects">
            <span className="nav-icon">📁</span>
            Projects
          </Link>
          <Link to="/tasks" className="active">
            <span className="nav-icon">✅</span>
            Tasks
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <div>
            <h1>All Tasks</h1>
            <p className="welcome-text">{filteredTasks.length} tasks found</p>
          </div>
          <div className="header-actions">
            <button onClick={() => setShowForm(!showForm)}>
              <span>➕</span>
              {showForm ? 'Cancel' : 'New Task'}
            </button>
          </div>
        </header>

        <div className="filter-bar">
          <button
            className={filter === 'ALL' ? 'active' : ''}
            onClick={() => setFilter('ALL')}
          >
            All ({tasks.length})
          </button>
          <button
            className={filter === 'TODO' ? 'active' : ''}
            onClick={() => setFilter('TODO')}
          >
            📋 To Do ({tasks.filter(t => t.status === 'TODO').length})
          </button>
          <button
            className={filter === 'IN_PROGRESS' ? 'active' : ''}
            onClick={() => setFilter('IN_PROGRESS')}
          >
            ⏳ In Progress ({tasks.filter(t => t.status === 'IN_PROGRESS').length})
          </button>
          <button
            className={filter === 'DONE' ? 'active' : ''}
            onClick={() => setFilter('DONE')}
          >
            ✅ Done ({tasks.filter(t => t.status === 'DONE').length})
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <h2>✅ Create New Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label>Task Title</label>
                  <input
                    type="text"
                    placeholder="Enter task title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Project</label>
                  <select
                    value={formData.projectId}
                    onChange={(e) => setFormData({ ...formData, projectId: parseInt(e.target.value) })}
                    required
                  >
                    <option value="">Select a project</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label>Description</label>
                <textarea
                  placeholder="Describe the task details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-row">
                <div>
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="TODO">📋 To Do</option>
                    <option value="IN_PROGRESS">⏳ In Progress</option>
                    <option value="DONE">✅ Done</option>
                  </select>
                </div>
                <div>
                  <label>Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="LOW">🟢 Low</option>
                    <option value="MEDIUM">🟡 Medium</option>
                    <option value="HIGH">🟠 High</option>
                    <option value="URGENT">🔴 Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button type="submit">Create Task</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {filteredTasks.length === 0 ? (
          <div className="recent-section">
            <div className="empty-state">
              <div className="icon">✅</div>
              <h3>No Tasks Found</h3>
              <p>
                {filter === 'ALL'
                  ? 'Create your first task to get started'
                  : `No tasks with status "${filter.replace('_', ' ')}"`
                }
              </p>
              <button onClick={() => setShowForm(true)}>
                <span>➕</span>
                Create Task
              </button>
            </div>
          </div>
        ) : (
          <div className="tasks-list">
            {filteredTasks.map(task => (
              <div key={task.id} className="task-item-card">
                <div className="task-content">
                  <h3>{task.title}</h3>
                  <p>{task.description || 'No description provided'}</p>
                  <span className="project-name">
                    📁 {task.projectName}
                  </span>
                </div>
                <div className="task-meta">
                  <span className={`priority ${task.priority.toLowerCase()}`}>
                    {getPriorityEmoji(task.priority)} {task.priority}
                  </span>
                  <span className={`status ${task.status.toLowerCase()}`}>
                    {getStatusEmoji(task.status)} {task.status.replace('_', ' ')}
                  </span>
                  {task.dueDate && (
                    <span className="due-date">
                      📅 {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  {canManage && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(task.id)}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}