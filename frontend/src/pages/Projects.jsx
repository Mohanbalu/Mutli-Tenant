import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { projectsAPI } from '../services/api'

export default function Projects() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '', startDate: '', endDate: '' })

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const response = await projectsAPI.getAll()
      setProjects(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await projectsAPI.create(formData)
      setFormData({ name: '', description: '', startDate: '', endDate: '' })
      setShowForm(false)
      loadProjects()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id)
        loadProjects()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const canCreate = user?.role === 'OWNER' || user?.role === 'MANAGER'

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
          <Link to="/projects" className="active">
            <span className="nav-icon">📁</span>
            Projects
          </Link>
          <Link to="/tasks">
            <span className="nav-icon">✅</span>
            Tasks
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <div>
            <h1>Projects</h1>
            <p className="welcome-text">{projects.length} projects total</p>
          </div>
          <div className="header-actions">
            {canCreate && (
              <button onClick={() => setShowForm(!showForm)}>
                <span>➕</span>
                {showForm ? 'Cancel' : 'New Project'}
              </button>
            )}
          </div>
        </header>

        {showForm && (
          <div className="form-card">
            <h2>📁 Create New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label>Project Name</label>
                  <input
                    type="text"
                    placeholder="Enter project name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label>Description</label>
                <textarea
                  placeholder="Describe the project goals and scope..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>
              <div>
                <label>Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button type="submit">Create Project</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {projects.length === 0 ? (
          <div className="recent-section">
            <div className="empty-state">
              <div className="icon">📁</div>
              <h3>No Projects Yet</h3>
              <p>Create your first project to get started with project management</p>
              {canCreate && (
                <button onClick={() => setShowForm(true)}>
                  <span>➕</span>
                  Create Project
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <Link to={`/projects/${project.id}`}>
                  <div className="card-header">
                    <h3>{project.name}</h3>
                  </div>
                  <div className="card-body">
                    <p>{project.description || 'No description provided'}</p>
                    <span className={`status ${project.status.toLowerCase()}`}>
                      {project.status === 'ACTIVE' && '🟢'}
                      {project.status === 'COMPLETED' && '🔵'}
                      {project.status === 'ARCHIVED' && '⚪'}
                      {' '}{project.status}
                    </span>
                  </div>
                  {project.startDate && (
                    <div className="card-footer">
                      <span className="date">
                        📅 {new Date(project.startDate).toLocaleDateString()}
                        {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString()}`}
                      </span>
                    </div>
                  )}
                </Link>
                {canCreate && (
                  <div className="card-footer">
                    <button className="delete-btn" onClick={() => handleDelete(project.id)}>
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}