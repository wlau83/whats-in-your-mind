# What's on Your Mind

What's on Your Mind is a full-stack private thought journal web application that allows users to securely capture, organize, search, and revisit their thoughts over time.

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

### Auth Page UI/UX
- Watercolor cloud-inspired login and registration pages
- Click-to-open cloud animation on the login page
- Soft journal-style form design for a calm and private user experience
- Consistent visual styling between login and register pages
- Minimal navbar layout for easy access to login and registration

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
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── public
│   │
│   ├── src
│   │   ├── api
│   │   │   └── axiosInstance.js
│   │   │
│   │   ├── assets
│   │   │   ├── cloud_center.png
│   │   │   ├── cloud_left.png
│   │   │   ├── cloud_right.png
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SearchThoughts.jsx
│   │   │   ├── ThoughtCalendar.jsx
│   │   │   ├── ThoughtCard.jsx
│   │   │   ├── ThoughtForm.jsx
│   │   │   └── ThoughtList.jsx
│   │   │
│   │   ├── context
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── styles
│   │   │   └── Auth.css
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB Atlas account

### Backend Setup

Navigate to the backend folder:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file inside the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```


Start the backend server:
```bash
npm run dev
```

The backend will run on:
```text
http://localhost:5000
```

### Frontend Setup

Navigate to the frontend folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on:
```text
http://localhost:5173
```

### Auth Routes

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/api/auth/register` | Register a new user            |
| POST   | `/api/auth/login`    | Login user                     |
| POST   | `/api/auth/logout`   | Logout user                    |
| GET    | `/api/auth/me`       | Get current authenticated user |

### Thought Routes
| Method | Endpoint                         | Description                              |
| ------ | -------------------------------- | ---------------------------------------- |
| GET    | `/api/thoughts`                  | Get current user's original thoughts     |
| POST   | `/api/thoughts`                  | Create a new thought                     |
| GET    | `/api/thoughts/:id`              | Get a single thought                     |
| PUT    | `/api/thoughts/:id`              | Update a thought                         |
| DELETE | `/api/thoughts/:id`              | Delete a thought and its follow-ups      |
| PATCH  | `/api/thoughts/:id/pin`          | Pin or unpin a thought                   |
| POST   | `/api/thoughts/:id/follow-ups`   | Add a follow-up thought                  |
| GET    | `/api/thoughts/:id/thread`       | Get original thought with its follow-ups |
| GET    | `/api/thoughts/calendar/dates`   | Get dates that contain thought records   |
| GET    | `/api/thoughts/date/:date`       | Get thoughts grouped by date             |
| GET    | `/api/thoughts/search?q=keyword` | Search thoughts                          |

## Security Considerations
This project handles private personal thoughts, so security and privacy are important parts of the design.

Implemented security measures include:
- Password hashing with bcryptjs
- JWT stored in HttpOnly cookies
- Protected backend routes
- User ownership checks for thought records
- Input validation for thought content, mood, and tags
- Login rate limiting

## Testing / QA Documentation

Manual QA testing was performed for the main user flows of the application, including authentication, protected routes, thought CRUD operations, pin/unpin functionality, follow-up threads, search, calendar highlighting, logout, and post-deployment smoke testing.

QA documentation is available in the `testing` folder:

- [QA Test Report](./testing/QA_Test_Report_Whats_On_Your_Mind.md)
- [Bug Report](./testing/Bug_Report_Whats_On_Your_Mind.md)

### QA Summary

- Total Test Cases: 14
- Passed: 14
- Failed: 0
- Bugs Found: 5
- Bugs Fixed: 5
- Open Critical Bugs: 0

Testing included functional testing, regression testing, and deployment smoke testing.

## Future Improvements
Planned improvements include:

- Dark mode
- Better mobile UI polish
- Search result navigation to related threads
- More advanced calendar filtering
- Mood statistics
- Tag filtering
- Deployment to Vercel and Render
- Unit and integration testing

## Purpose
This project was built as a portfolio full-stack web application to demonstrate:

- React frontend development
- Node.js and Express backend development
- MongoDB data modeling
- Authentication and protected routes
- CRUD operations
- Parent-child data relationships
- Calendar-based data visualization
- Search functionality
- Responsive UI design

## Author 
Wan Yee LAU
