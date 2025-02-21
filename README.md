# Voting Application

## Overview
This is a **Voting Application** built using **Node.js, Express.js, and MongoDB**, with **JWT-based authentication and authorization**. The system includes two roles:
- **Admin**: Manages candidates (add, update, delete). Cannot vote.
- **Voter**: Can vote only once for a single candidate.

## Features
- **User Authentication & Authorization** using JWT.
- **Role-based access control** (Admin and Voter).
- **Admin can**:
  - Add, update, and delete candidates.
  - View all voters and candidates.
- **Voter can**:
  - Register and login.
  - Cast a single vote for one candidate.
  - View candidates and vote results.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Authorization**: Role-based access control

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps to Run the Project
1. **Clone the Repository**:
   ```sh
   git clone https://github.com/Vikalp1O1/votingApp.git
   cd votingApp
   ```
2. **Install Dependencies**:
   ```sh
   npm install
   ```
3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. **Run the Application**:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
- `POST /api/user/register` → Register a voter
- `POST /api/user/login` → Login and get JWT token

### Admin Routes
- `POST /api/candidates` → Add a candidate
- `GET /api/candidates` → View all candidates
- `PUT /api/candidates/:id` → Update a candidate
- `DELETE /api/candidates/:id` → Remove a candidate


### Voter Routes
- `GET /api/voter/candidates` → View candidates
- `POST /api/candidate/vote/:id` → Vote for a candidate (one-time only)
- `GET /api/votecount` → View voting results

## Project Structure
```
📁 votinApp
├── 📂 database       # Configuration files (database)
├── 📂 controllers  # Route handlers for authentication, voting, admin, etc.
├── 📂 middlewares   # Middleware for authentication and authorization(jwt)
├── 📂 models       # Mongoose models (User, Candidate)
├── 📂 routes       # API routes for authentication, voting, admin
├── server.js       # Main entry point
└── package.json    # Dependencies and scripts
```

## Security Measures
- Passwords are **hashed** before storing in the database.
- JWT tokens are used for **secure authentication**.
- Role-based access control prevents unauthorized actions.
- Users can vote **only once** to prevent duplicate voting.

## Future Enhancements
- Implement **real-time voting results**.
- Add **email verification** during registration.
- Enhance **UI with a frontend (React/Angular/Vue)**.

---
**Contributions are welcome!** Feel free to submit issues or pull requests.

📌 **Author:** Vikalp  
📧 **Contact:** vikalptomar100@gmail.com  
🔗 **GitHub Repo:** [Voting App](https://github.com/Vikalp1O1/votingApp)

