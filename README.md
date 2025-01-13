# 📞 AI Call Agent Backend

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/Krishnaidnani/AI-Call-Agent-Backend)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)

*A powerful Node.js backend service for managing AI-powered customer voice interactions*

[Frontend Repository](https://github.com/Krishnaidnani/AI-Call-Agent-Frontend)

</div>

## 🌟 Overview

The **AI Call Agent Backend** is a sophisticated Node.js application engineered to power real-time voice communication systems. Built with scalability in mind, it seamlessly integrates MongoDB for data persistence, Socket.IO for real-time communication, and leverages the Gemini API for AI-powered responses. This repository serves as the backend component of the system - for the frontend implementation, please visit our [Frontend Repository](https://github.com/Krishnaidnani/AI-Call-Agent-Frontend).

## ✨ Key Features

* **📱 Real-Time Communication**
  - Powered by Socket.IO
  - Instant voice call handling
  - Live messaging capabilities

* **🗄️ Data Management**
  - MongoDB integration for robust data storage
  - Comprehensive call logging
  - Customer data tracking
  - Advanced metrics analysis

* **🔌 API Integration**
  - RESTful API architecture
  - CORS-enabled for cross-origin requests
  - Seamless frontend integration
  - Gemini API integration for AI responses

## 🛠️ Technology Stack

* **Core Technologies**
  - Node.js
  - Express.js
  - MongoDB
  - Socket.IO
  - Gemini API

* **Additional Libraries**
  - CORS middleware
  - dotenv configuration
  - Various npm utilities

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

```bash
Node.js (≥ 14.0.0)
MongoDB
npm (Node Package Manager)
```

### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/Krishnaidnani/AI-Call-Agent-Backend.git
cd AI-Call-Agent-Backend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3001
GEMINI_API_KEY=your_gemini_api_key
```

4. **Launch the Server**
```bash
npm start
```

Your server will be running at `http://localhost:3001` 🎉

## 📁 Project Structure

```
AI-Call-Agent-Backend/
├── src/
│   ├── config/
│   │   └── connectionDB.js
│   ├── models/
│   │   ├── Call.js
│   │   └── Customer.js
│   ├── routes/
│   │   └── index.js
│   ├── socket/
│   │   └── index.js
│   ├── callManager.js
│   └── index.js
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── vercel.json
```

## 🔌 API Endpoints

### Call Management
* `POST /api/start-call` - Initialize new call session
* `POST /api/end-call` - Terminate active call
* `GET /api/active-calls` - Retrieve active call count
* `GET /api/customer-metrics` - Fetch customer analytics

### Socket.IO Events
* `callStarted` - New call session initiation
* `callEnded` - Call session termination
* `messageProcessed` - Message processing completion

## 🚀 Deployment

The application is compatible with various cloud platforms:
* Heroku
* Vercel
* Any Node.js-supporting cloud service

Ensure proper environment variable configuration in your deployment environment.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request


---

<div align="center">
  
### Star ⭐ this repository if you find it helpful!

[Report Bug](https://github.com/Krishnaidnani/AI-Call-Agent-Backend/issues) · [Request Feature](https://github.com/Krishnaidnani/AI-Call-Agent-Backend/issues)

</div>