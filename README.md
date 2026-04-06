# Multi-Tenant SaaS Project Management System

A production-ready multi-tenant SaaS platform where multiple organizations can manage projects, tasks, and teams with complete data isolation. Features a modern, professional UI with a clean design system.

![Dashboard Preview](https://via.placeholder.com/800x400/1e293b/ffffff?text=Project+Management+Dashboard)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Documentation](#-documentation)
- [Multi-Tenant Architecture](#-multi-tenant-architecture)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Security](#-security)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Functionality
- **🏢 Multi-Tenant Architecture** - Complete data isolation between organizations
- **👥 User Management** - Three roles: Owner, Manager, Member
- **🔐 Secure Authentication** - JWT-based with BCrypt password hashing
- **📊 Project Management** - Create, edit, delete, and track projects
- **✅ Task Management** - Full task lifecycle with priorities and status tracking
- **📈 Dashboard Analytics** - Real-time statistics and progress tracking
- **🔔 Notifications** - In-app notifications for important updates

### User Experience
- **🎨 Professional UI** - Clean, modern design without flashy effects
- **📱 Responsive Design** - Works on desktop, tablet, and mobile
- **⚡ Fast Performance** - Optimized frontend and backend
- **♿ Accessibility** - Keyboard navigation and screen reader support

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18+ | UI Framework |
| Vite | 5.x | Build Tool |
| React Router | 6.x | Client-side Routing |
| Axios | Latest | HTTP Client |
| CSS3 | - | Styling with CSS Variables |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17+ | Programming Language |
| Spring Boot | 3.x | Application Framework |
| Spring Security | 6.x | Authentication & Authorization |
| Spring Data JPA | - | Data Persistence |
| H2 | - | Development Database |
| PostgreSQL | - | Production Database |
| Maven | 3.8+ | Build Tool |
| JWT | - | Token Authentication |

## 📁 Project Structure

```
Mutli-Tenant/
├── frontend/                    # React.js Frontend Application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Page components
│   │   │   ├── Dashboard.jsx    # Main dashboard
│   │   │   ├── Register.jsx     # Registration page
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Projects.jsx     # Projects management
│   │   │   └── Tasks.jsx        # Tasks management
│   │   ├── context/             # React Context for state
│   │   ├── services/            # API service layer
│   │   ├── index.css            # Global styles & design system
│   │   └── App.jsx              # Main application
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # Spring Boot Backend Application
│   ├── src/main/java/com/projectmanagement/
│   │   ├── controller/          # REST API controllers
│   │   ├── service/             # Business logic
│   │   ├── repository/          # Data access layer
│   │   ├── entity/              # JPA entities
│   │   ├── dto/                 # Data Transfer Objects
│   │   ├── config/              # Configuration classes
│   │   ├── security/            # Security configuration
│   │   └── AuthService.java     # Authentication service
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── database/                    # Database scripts
│   └── sample-data.sql
│
├── USER_GUIDE.md               # User documentation
├── PROJECT_CONCEPT.md          # Project concept explanation
├── TECHNICAL_REQUIREMENTS.md   # Technical specifications
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (for frontend development)
- **Java JDK** 17+ (for backend development)
- **Maven** 3.8+ (for Java builds)
- **No database installation required** - H2 runs in-memory!

### Quick Start

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd Mutli-Tenant
```

#### 2. Start the Backend
```bash
cd backend
mvn spring-boot:run
```
The backend will start on `http://localhost:8081`

#### 3. Start the Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`

#### 4. Access the Application
Open your browser and navigate to `http://localhost:5173`

### H2 Database Console

Access the H2 console at `http://localhost:8081/h2-console`:
- **JDBC URL**: `jdbc:h2:mem:project_management`
- **Username**: `sa`
- **Password**: (leave blank)

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [USER_GUIDE.md](./USER_GUIDE.md) | Complete user manual with step-by-step instructions |
| [PROJECT_CONCEPT.md](./PROJECT_CONCEPT.md) | Overview of multi-tenant architecture and business value |
| [TECHNICAL_REQUIREMENTS.md](./TECHNICAL_REQUIREMENTS.md) | Detailed technical specifications and API documentation |

## 🏗️ Multi-Tenant Architecture

The system uses a **shared database, shared schema** approach with row-level security:

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │           React SPA (Vite)                              ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS (REST API)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Application Layer                          │
│  ┌─────────────────────────────────────────────────────────┐│
│  │           Spring Boot Backend                           ││
│  │  - Multi-tenant Data Isolation                          ││
│  │  - JWT Authentication                                   ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data Layer                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │           H2 / PostgreSQL                               ││
│  │  - All tables filtered by organization_id               ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Key Principles
- Each user belongs to exactly one organization
- Users can only access data from their organization
- All database queries automatically filter by `organization_id`
- Complete data isolation at the application level

## 🗄️ Database Schema

### Core Tables

| Table | Description |
|-------|-------------|
| `organizations` | Tenant information (name, slug, status) |
| `users` | User accounts linked to organizations |
| `projects` | Projects belonging to organizations |
| `tasks` | Tasks within projects |
| `notifications` | User-specific notifications |

### Entity Relationships
```
Organization (1) ─── (Many) User
Organization (1) ─── (Many) Project
Project (1) ─── (Many) Task
User (1) ─── (Many) Notification
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user & organization |
| POST | `/api/auth/login` | User login |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/{id}` | Get project by ID |
| POST | `/api/projects` | Create new project |
| PUT | `/api/projects/{id}` | Update project |
| DELETE | `/api/projects/{id}` | Delete project |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/{id}` | Get task by ID |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |

### Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications` | Get all notifications |
| PUT | `/api/notifications/read-all` | Mark all as read |
| GET | `/api/notifications/unread-count` | Get unread count |

See [TECHNICAL_REQUIREMENTS.md](./TECHNICAL_REQUIREMENTS.md) for complete API documentation.

## 🔐 Security

### Authentication
- **JWT Tokens** for stateless authentication
- **BCrypt** password hashing (strength 10)
- **Token expiration** after 24 hours

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (@#$%^&+=!)

### Authorization
- **Owner**: Full access to all features
- **Manager**: Create/edit projects and tasks
- **Member**: View projects, manage own tasks

## 🚀 Deployment

### Development
```bash
# Backend
cd backend && mvn spring-boot:run

# Frontend
cd frontend && npm run dev
```

### Production

#### Backend (Spring Boot JAR)
```bash
cd backend
mvn clean package
java -jar target/project-management-0.0.1-SNAPSHOT.jar
```

#### Frontend (Static Files)
```bash
cd frontend
npm run build
# Deploy 'dist/' folder to Nginx, Apache, or CDN
```

#### Environment Variables
```properties
# Backend (application-prod.properties)
SPRING_PROFILES_ACTIVE=production
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/project_management
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your-production-secret-key-here
```

### Database Migration
For production, switch from H2 to PostgreSQL by updating `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/project_management
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#111827` | Buttons, headings, accents |
| Success | `#10b981` | Completed status, positive indicators |
| Warning | `#f59e0b` | In-progress status, caution |
| Danger | `#ef4444` | Errors, urgent items |
| Info | `#3b82f6` | Information, notifications |

### Typography
- **Headings**: Bold, tight letter-spacing
- **Body**: Regular weight, comfortable line-height
- **Labels**: Uppercase, small font size

### Spacing Scale
- `--space-1`: 0.25rem (4px)
- `--space-2`: 0.5rem (8px)
- `--space-3`: 0.75rem (12px)
- `--space-4`: 1rem (16px)
- `--space-6`: 1.5rem (24px)
- `--space-8`: 2rem (32px)

## 📱 Responsive Breakpoints

| Viewport | Width | Layout |
|----------|-------|--------|
| Desktop | 1024px+ | Full sidebar + main content |
| Tablet | 768px - 1023px | Collapsed sidebar |
| Mobile | < 768px | Stacked layout |

## 🔧 Troubleshooting

### Common Issues

**Backend won't start:**
- Ensure Java 17+ is installed: `java -version`
- Check if port 8081 is available

**Frontend won't start:**
- Ensure Node.js 18+ is installed: `node -version`
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

**Database connection errors:**
- H2 is in-memory, restart backend to reset
- For PostgreSQL, verify connection string and credentials

**API errors (500):**
- Check backend logs for detailed error messages
- Verify database is running and accessible
- Ensure all required tables exist

## 🤝 Contributing

This is a demonstration project for educational purposes. Feel free to:
- Use it as a reference for your own projects
- Fork and modify for your needs
- Report issues or suggest improvements

## 📄 License

This project is for educational and demonstration purposes.

---

**Built with ❤️ using React, Spring Boot, and modern design principles**

### Key Links
- [User Guide](./USER_GUIDE.md) - How to use the application
- [Project Concept](./PROJECT_CONCEPT.md) - Architecture and business value
- [Technical Requirements](./TECHNICAL_REQUIREMENTS.md) - Detailed specifications