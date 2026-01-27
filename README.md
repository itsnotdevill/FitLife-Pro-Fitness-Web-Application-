# FitLife Pro – Personal Fitness & Healthcare Management System

FitLife Pro is a comprehensive web application designed to help users manage their gym activities, workout routines, health data, and schedules. It features a modern, responsive UI and a robust backend.

## 🚀 Key Features

*   **User Module**: Profile management, fitness tracking, and dashboard overview.
*   **Role-Based Access**: Secure login/signup for Users, Trainers, and Admins.
*   **Modern UI**: Built with Next.js 14, Tailwind CSS, and Framer Motion.
*   **Secure Backend**: Node.js/Express with MongoDB Atlas and JWT Authentication.

## 🛠️ Technology Stack

*   **Frontend**: Next.js (App Router), Tailwind CSS, Lucide React
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB Atlas
*   **Authentication**: JWT (JSON Web Tokens)

## 📦 Project Structure

```text
FitLife Pro/
├── client/          # Next.js Frontend
├── server/          # Express Backend
└── README.md
```

## 🏁 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm (v9 or higher)
*   MongoDB Atlas Connection String

### Installation

1.  **Clone the repository** (or download source):
    ```bash
    git clone <repository-url>
    cd "FitLife Pro"
    ```

2.  **Setup Backend**:
    ```bash
    cd server
    npm install
    ```
    *   Create a `.env` file in the `server` directory and add your MongoDB URI:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_secret_key
        ```

3.  **Setup Frontend**:
    ```bash
    cd ../client
    npm install
    ```
    *   Create a `.env.local` file in the `client` directory:
        ```env
        NEXT_PUBLIC_API_URL=http://localhost:5000/api
        ```

## 🏃‍♂️ Running the Application

You need to run both the backend and frontend servers.

1.  **Start Backend**:
    ```bash
    cd server
    npm run dev
    ```
    *   Runs on `http://localhost:5000`

2.  **Start Frontend** (in a new terminal):
    ```bash
    cd client
    npm run dev
    ```
    *   Runs on `http://localhost:3000`

3.  Open your browser and navigate to `http://localhost:3000`.

## 🧪 Testing

*   **Register**: Create a new account.
*   **Login**: Access your dashboard.
*   **Profile**: Update your stats in the dashboard settings.

## 👥 Contributors

*   **Developer**: [Your Name]
