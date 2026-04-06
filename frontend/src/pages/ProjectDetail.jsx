import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectsAPI, tasksAPI, usersAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function ProjectDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [members, setMembers] = useState([])
  const [users, setUsers] = useState([])
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showMemberForm, setShowMemberForm] = useState(false)
  const [taskForm, setTaskForm] = useState({ title: '', description: '', status: 'TODO', priority: 'MEDIUM', dueDate: '' })
  const [memberForm, setMemberForm] = useState({ userId: null, role: 'MEMBER' })

  useEffect(() => {
    loadData()
  }, [id])

  const loadData = async () => {
    try {
      const [projectRes, tasksRes, membersRes, usersRes] = await Promise.all([
        projectsAPI.getById(id),
        tasksAPI.getByProject(id),
        projectsAPI.getMembers(id),
        usersAPI.getAll()
      ])
      setProject(projectRes.data)
      setTasks(tasksRes.data)
      setMembers(membersRes.data)
      setUsers(usersRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()
    try {
      await tasksAPI.create({ ...taskForm, projectId: parseInt(id) })
      setTaskForm({ title: '', description: '', status: 'TODO', priority: 'MEDIUM', dueDate: '' })
      setShowTaskForm(false)
      loadData()
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddMember = async (e) => {
    e.preventDefault()
    try {
      await projectsAPI.addMember(id, memberForm)
      setMemberForm({ userId: null, role: 'MEMBER' })
      setShowMemberForm(false)
      loadData()
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdateTaskStatus = async (taskId, status) => {
    try {
      await tasksAPI.update(taskId, { status })
      loadData()
    } catch (err) {
      console.error(err)
    }
  }

  const canManage = user?.role === 'OWNER' || user?.role === 'MANAGER'

  const todoTasks = tasks.filter(t => t.status === 'TODO')
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS')
  const doneTasks = tasks.filter(t => t.status === 'DONE')

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header"><h2>PMS</h2></div>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/projects" className="active">Projects</Link>
          <Link to="/tasks">Tasks</Link>
        </nav>
      </aside>

      <main className="main-content">
        <header>
          <Link to="/projects">← Back to Projects</Link>
          <h1>{project?.name}</h1>
          <p>{project?.description}</p>
        </header>

        <div className="project-actions">
          {canManage && (
            <>
              <button onClick={() => setShowTaskForm(!showTaskForm)}>+ Add Task</button>
              <button onClick={() => setShowMemberForm(!showMemberForm)}>+ Add Member</button>
            </>
          )}
        </div>

        {showTaskForm && (
          <div className="form-card">
            <h3>Create Task</h3>
            <form onSubmit={handleCreateTask}>
              <input type="text" placeholder="Task Title" value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} required />
              <textarea placeholder="Description" value={taskForm.description} onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })} />
              <select value={taskForm.status} onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
              <select value={taskForm.priority} onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
              <input type="date" value={taskForm.dueDate} onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })} />
              <button type="submit">Create Task</button>
              <button type="button" onClick={() => setShowTaskForm(false)}>Cancel</button>
            </form>
          </div>
        )}

        {showMemberForm && (
          <div className="form-card">
            <h3>Add Member</h3>
            <form onSubmit={handleAddMember}>
              <select value={memberForm.userId || ''} onChange={(e) => setMemberForm({ ...memberForm, userId: parseInt(e.target.value) })} required>
                <option value="">Select User</option>
                {users.filter(u => !members.find(m => m.userId === u.id)).map(u => (
                  <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>
                ))}
              </select>
              <select value={memberForm.role} onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}>
                <option value="MEMBER">Member</option>
                <option value="LEADER">Leader</option>
              </select>
              <button type="submit">Add</button>
              <button type="button" onClick={() => setShowMemberForm(false)}>Cancel</button>
            </form>
          </div>
        )}

        <div className="board">
          <div className="column">
            <h3>To Do ({todoTasks.length})</h3>
            {todoTasks.map(task => (
              <div key={task.id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                {canManage && <select value={task.status} onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}>
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>}
              </div>
            ))}
          </div>
          <div className="column">
            <h3>In Progress ({inProgressTasks.length})</h3>
            {inProgressTasks.map(task => (
              <div key={task.id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                {canManage && <select value={task.status} onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}>
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>}
              </div>
            ))}
          </div>
          <div className="column">
            <h3>Done ({doneTasks.length})</h3>
            {doneTasks.map(task => (
              <div key={task.id} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                {canManage && <select value={task.status} onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}>
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>}
              </div>
            ))}
          </div>
        </div>

        <div className="members-section">
          <h3>Team Members</h3>
          <div className="members-list">
            {members.map(member => (
              <div key={member.id} className="member-item">
                <span>{member.userName}</span>
                <span className="role">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}