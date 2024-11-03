# Questionnaire Application

A web application that allows users to create, share, and respond to questionnaires. Built with React, Node.js, and MongoDB.

## Installation and Running the App

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (local or Atlas connection)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/questionnaire-app.git
cd questionnaire-app
```

### Step 2: Backend Setup

```bash
# From the root directory
npm install

# Start the backend server
npm run start
```

The backend server will start on `http://localhost:8000`

### Step 3: Frontend Setup

```bash
# From the root directory, navigate to frontend
cd frontend

# Install frontend dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend will be available on `http://localhost:5173`

### Environment Setup

Create two `.env` files:

1. In root directory (for backend):

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
```

2. In frontend directory:
   cd frontend

```env
VITE_SERVER_URL=http://localhost:3000
```

### Running the Application

You'll need two terminal windows:

1. **Terminal 1 (Backend)**:

```bash
# From root directory
npm run start
```

2. **Terminal 2 (Frontend)**:

```bash
# From frontend directory
cd frontend
npm run dev
```

The application should now be running and accessible at `http://localhost:5173`

## Features

- User Authentication (Register/Login)
- Create Custom Questionnaires
- Share Questionnaires via Link
- Submit Responses
- View Results

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT

## API Endpoints

### Auth Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Questionnaire Routes

- `GET /api/questionnaire/list` - Get all questionnaires
- `GET /api/questionnaire/:id` - Get specific questionnaire
- `POST /api/questionnaire/create` - Create new questionnaire
- `POST /api/questionnaire/:id/submit` - Submit answers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
