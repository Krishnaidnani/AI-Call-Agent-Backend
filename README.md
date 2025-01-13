# AI Call Agent Backend

## Overview

The **AI Call Agent Backend** is a Node.js application designed to facilitate real-time communication for managing customer interactions through voice calls. This backend service integrates with a MongoDB database, utilizes Socket.IO for real-time communication, and provides a RESTful API for managing call data and customer metrics.

## Features

- **Real-Time Communication**: Uses Socket.IO to handle live voice calls and messaging.
- **MongoDB Integration**: Stores call logs, customer data, and metrics for analysis.
- **CORS Support**: Configured to allow cross-origin requests for seamless integration with frontend applications.
- **RESTful API**: Provides endpoints for managing calls, retrieving metrics, and handling customer data.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing application data.
- **Socket.IO**: Library for enabling real-time bidirectional communication between clients and servers.
- **Cors**: Middleware for enabling CORS (Cross-Origin Resource Sharing).
- **dotenv**: Module for loading environment variables from a `.env` file.
- **Gemini API**: For AI Responses

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or higher)
- MongoDB (either locally or via a cloud service like MongoDB Atlas)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

git clone https://github.com/Krishnaidnani/AI-Call-Agent-Backend.git


2. Navigate to the project directory:

cd AI-Call-Agent-Backend


3. Install the required dependencies:

npm install


4. Create a `.env` file in the root directory and add following:

MONGODB_URI=
PORT=3001
GEMINI_API_KEY=


### Running the Application

To start the server, run:

npm start


The server will start on `http://localhost:3001`.

## Folder Structure
```
AI-Call-Agent-Backend/
├── .env.example
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── vercel.json
└── src/
    ├── config/
    │   └── connectionDB.js
    ├── models/
    │   ├── Call.js
    │   └── Customer.js
    ├── routes/
    │   └── index.js
    ├── socket/
    │   └── index.js
    ├── callManager.js
    └── index.js
```
### API Endpoints

The following endpoints are available:

- `POST /api/start-call`: Initiates a new call session.
- `POST /api/end-call`: Ends an active call session.
- `GET /api/active-calls`: Retrieves the current number of active calls.
- `GET /api/customer-metrics`: Fetches customer-related metrics.

### Socket.IO Events

The following events can be emitted or listened to through Socket.IO:

- `callStarted`: Triggered when a new call session starts.
- `callEnded`: Triggered when a call session ends.
- `messageProcessed`: Triggered when a message is processed during a call.

## Deployment

This application can be deployed on platforms like Heroku, Vercel, or any other cloud service that supports Node.js applications. Ensure that your environment variables are correctly set in your deployment environment.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please create an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.


## Acknowledgments

Thanks to all contributors and libraries that made this project possible!

---



