# What's in Your Mind

What's in Your Mind is a full-stack private thought journal web application that allows users to securely capture, organize, search, and revisit their thoughts over time.

Unlike a traditional notes app, this project focuses on thought continuity. Users can create follow-up thoughts linked to previous entries, helping them track how their ideas, reflections, and opinions evolve over time.

## Features

### Authentication and Privacy

- User registration and login
- JWT authentication using HttpOnly cookies
- Protected routes for private thought data
- Ownership checks to ensure users can only access their own thoughts
- Logout functionality

### Thought Management

- Create new thoughts
- View recent thoughts
- Edit existing thoughts
- Delete thoughts
- Pin and unpin important thoughts
- Separate pinned thoughts from recent thoughts

### Follow-up Thought Threads

- Add follow-up thoughts to an existing thought
- View thought threads with the original thought and related follow-ups
- Track how a thought changes or develops over time

### Calendar View

- Calendar highlights dates with thought records
- Click a date to view thoughts created on that day
- Original thoughts and follow-ups are grouped together for better readability

### Search

- Search thoughts by content
- Search by tags
- Search by mood
- Search results include both original thoughts and follow-up thoughts

### Responsive UI

- Dashboard layout with thought management on the left and calendar on the right
- Responsive layout for smaller screens
- Clean card-based interface

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- React Calendar
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- JWT
- bcryptjs
- cookie-parser
- cors
- express-rate-limit

### Database

- MongoDB Atlas

## Project Structure

```text
whats-in-your-mind
│
├── backend
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   └── thoughtController.js
│   │
│   ├── middleware
│   │   ├── authenticateUser.js
│   │   ├── checkThoughtOwnership.js
│   │   └── validateThoughtInput.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── thoughtRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
└── frontend
    ├── src
    │   ├── api
    │   │   └── axiosInstance.js
    │   │
    │   ├── components
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── SearchThoughts.jsx
    │   │   ├── ThoughtCalendar.jsx
    │   │   ├── ThoughtCard.jsx
    │   │   ├── ThoughtForm.jsx
    │   │   └── ThoughtList.jsx
    │   │
    │   ├── context
    │   │   └── AuthContext.jsx
    │   │
    │   ├── pages
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
	
## Getting Started

###Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB Atlas account

### Backend Setup

Navigate to the backend folder:
