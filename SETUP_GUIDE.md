# Complete Setup Guide for Node.js CRUD API

## 📋 Prerequisites

### 1. Install Node.js
- Download and install Node.js from [nodejs.org](https://nodejs.org/)
- Choose the LTS (Long Term Support) version
- Verify installation:
```bash
node --version
npm --version
```

### 2. Install Microsoft SQL Server

#### Option A: SQL Server Express (Free)
1. Download SQL Server Express from [Microsoft's website](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
2. Install with these settings:
   - Choose "Basic" installation
   - Set a strong password for the 'sa' account
   - Remember this password for later!

#### Option B: SQL Server Developer Edition (Free)
1. Download from [Microsoft's website](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
2. Choose "Developer" edition (free for development)

#### Option C: Docker (Easiest)
If you have Docker installed:
```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong@Passw0rd" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest
```

### 3. Install SQL Server Management Studio (SSMS) - Optional but Recommended
- Download from [Microsoft's website](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)
- This helps you manage your database visually

## 🚀 Project Setup

### Step 1: Navigate to Project Directory
```bash
cd C:\Users\Piyush\nodejs-crud-api
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Database Connection
Edit the `config.env` file with your SQL Server details:

```env
# Database Configuration
DB_SERVER=localhost
DB_DATABASE=crud_api_db
DB_USER=sa
DB_PASSWORD=YourStrong@Passw0rd
DB_PORT=1433
DB_ENCRYPT=true
DB_TRUST_SERVER_CERTIFICATE=true

# Server Configuration
PORT=3000
NODE_ENV=development

# API Configuration
API_VERSION=v1
```

**Important:** Replace `YourStrong@Passw0rd` with your actual SQL Server password!

### Step 4: Create Database (if using SSMS)
1. Open SQL Server Management Studio
2. Connect to your SQL Server instance
3. Right-click on "Databases" → "New Database"
4. Name it: `crud_api_db`
5. Click "OK"

**OR** - The application will create the database and table automatically when you run it!

## 🏃‍♂️ Running the Project

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### What You Should See:
```
Server is running on port 3000
Environment: development
API Documentation: http://localhost:3000
Connected to Microsoft SQL Server
Users table created or already exists
```

## 🧪 Testing the API

### Option 1: Using the Built-in Test File
```bash
node test-api.js
```

### Option 2: Using Postman or Similar Tool

#### Base URL: `http://localhost:3000`

#### 1. Health Check
```
GET http://localhost:3000/health
```

#### 2. Create a User
```
POST http://localhost:3000/api/v1/users
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com"
}
```

#### 3. Get All Users
```
GET http://localhost:3000/api/v1/users
```

#### 4. Get User by ID
```
GET http://localhost:3000/api/v1/users/1
```

#### 5. Update User
```
PUT http://localhost:3000/api/v1/users/1
Content-Type: application/json

{
    "name": "John Smith",
    "email": "johnsmith@example.com"
}
```

#### 6. Delete User
```
DELETE http://localhost:3000/api/v1/users/1
```

### Option 3: Using cURL Commands

#### Create User:
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

#### Get All Users:
```bash
curl http://localhost:3000/api/v1/users
```

#### Get User by ID:
```bash
curl http://localhost:3000/api/v1/users/1
```

#### Update User:
```bash
curl -X PUT http://localhost:3000/api/v1/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith", "email": "johnsmith@example.com"}'
```

#### Delete User:
```bash
curl -X DELETE http://localhost:3000/api/v1/users/1
```

## 🔧 Troubleshooting

### Common Issues:

#### 1. "Cannot connect to SQL Server"
- Check if SQL Server is running
- Verify your password in `config.env`
- Make sure the server name is correct (usually `localhost`)

#### 2. "Port 3000 already in use"
- Change the PORT in `config.env` to another number (like 3001)
- Or kill the process using port 3000

#### 3. "Module not found" errors
- Run `npm install` again
- Make sure you're in the correct directory

#### 4. Database connection issues
- Check Windows Firewall settings
- Ensure SQL Server is configured to accept connections
- Try connecting with SSMS first to verify credentials

### Getting Help:
1. Check the console output for error messages
2. Verify all prerequisites are installed
3. Make sure your `config.env` file has correct database credentials

## 📁 Project Structure Explained

```
nodejs-crud-api/
├── config/
│   └── database.js          # Database connection setup
├── controllers/
│   └── userController.js    # Business logic for user operations
├── middleware/
│   └── validation.js        # Input validation
├── models/
│   └── User.js             # Database operations for users
├── routes/
│   └── userRoutes.js       # API route definitions
├── app.js                  # Main application file
├── config.env              # Environment variables
├── package.json            # Project dependencies
├── test-api.js             # API testing script
└── SETUP_GUIDE.md          # This file
```

## 🎯 What This API Does

This is a complete CRUD (Create, Read, Update, Delete) API for managing users:

- **Create**: Add new users with name and email
- **Read**: Get all users or a specific user by ID
- **Update**: Modify existing user information
- **Delete**: Remove users from the database

The API includes:
- Input validation
- Error handling
- Security features
- Database connection pooling
- Professional code structure

## 🚀 Next Steps

Once everything is running:
1. Test all the API endpoints
2. Try creating, reading, updating, and deleting users
3. Check the database to see your data
4. Explore the code to understand how it works

Happy coding! 🎉
