# TaskMaster – Full-Stack Task Manager

## Project Overview
A clean, responsive task management app where users can register/login and manage personal tasks with full CRUD, status tracking, priority, and due dates.

## Features Implemented
- User registration & login (JWT authentication)
- Create, read, update, delete tasks (user-specific)
- Task fields: title, description, status (todo/in-progress/done), priority, due date
- Beautiful, modern, fully responsive UI (mobile + desktop)
- Clean code, proper error handling, and separation of concerns

## Technologies Used
**Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, cors, dotenv  
**Frontend**: React (Vite), Tailwind CSS, Axios, React Router DOM  
**Database**: MongoDB

## Database Schema
**User**  
- name (String)  
- email (String, unique)  
- password (String – hashed)

**Task**  
- user (ObjectId → User)  
- title (String)  
- description (String)  
- status (Enum: todo, in-progress, done)  
- priority (Enum: low, medium, high)  
- dueDate (Date)  
- createdAt / updatedAt (timestamps)

## API Endpoints
**Auth** (public)  
- `POST /api/auth/register`  
- `POST /api/auth/login`

**Tasks** (protected – requires Bearer token)  
- `GET /api/tasks`  
- `POST /api/tasks`  
- `PUT /api/tasks/:id`  
- `DELETE /api/tasks/:id`

## Setup & Run Instructions

### Backend
```bash
cd backend
npm install
# Create .env file:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=supersecretkey123456
# PORT=5000
npm run dev